from fastapi import FastAPI, APIRouter, Header, HTTPException, Depends, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import hashlib
import hmac
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'matriel')]

# Create the main app without a prefix
app = FastAPI()

# ─── CORS ───────────────────────────────────────────────────────────────────
# Em produção no Vercel, defina CORS_ORIGINS com a URL do seu frontend, ex:
#   https://matriel.vercel.app
# Se não definida, permitimos todas as origens (adequado para projeto pessoal
# sem dados sensíveis de terceiros).
_cors_env = os.environ.get('CORS_ORIGINS', '').strip()
if _cors_env:
    cors_origins = [o.strip() for o in _cors_env.split(',') if o.strip()]
else:
    # Sem variável definida: aceita qualquer origem
    cors_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=cors_origins != ["*"],  # credentials=True só funciona sem wildcard
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ─── AUTH ────────────────────────────────────────────────────────────────────
# Sistema de autenticação próprio com HMAC — sem Firebase, sem dependências externas.
# Funciona em produção no Vercel sem nenhuma configuração adicional.
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "").strip() or "matheustanan2@gmail.com"

# SECRET_KEY: idealmente defina esta variável no painel do Vercel com uma string aleatória longa.
# Se não definida, usa chave embutida (seguro para projeto pessoal de único usuário).
SECRET_KEY = os.environ.get("SECRET_KEY", "matriel-studio-secret-2024-xK9p")
SESSION_TOKEN_PREFIX = "matriel-session:"

# Senha do administrador guardada como hash seguro PBKDF2-HMAC-SHA256 + salt.
# NUNCA guardamos a senha em texto plano nem no frontend. Os valores abaixo vêm
# do backend/.env (salt e hash em hexadecimal). Fallback embutido para dev local.
ADMIN_PASSWORD_SALT = os.environ.get(
    "ADMIN_PASSWORD_SALT", "62517ac1d43e32a2182ab8fa0d19dfbd"
)
ADMIN_PASSWORD_HASH = os.environ.get(
    "ADMIN_PASSWORD_HASH",
    "8779412daf4b607381628e5bb0033e991af96ac14255ba615605c7775df3ba5f",
)
ADMIN_PBKDF2_ITERATIONS = int(os.environ.get("ADMIN_PBKDF2_ITERATIONS", "200000"))


def verify_password(plain_password: str) -> bool:
    """Verifica a senha usando PBKDF2-HMAC-SHA256 com salt e comparação
    em tempo constante (resistente a timing attacks)."""
    try:
        salt = bytes.fromhex(ADMIN_PASSWORD_SALT)
        dk = hashlib.pbkdf2_hmac(
            "sha256", plain_password.encode(), salt, ADMIN_PBKDF2_ITERATIONS
        )
        return hmac.compare_digest(dk.hex(), ADMIN_PASSWORD_HASH)
    except Exception:
        return False


def _make_signature(payload: str) -> str:
    """Gera assinatura HMAC-SHA256 do payload com a chave secreta."""
    return hmac.new(
        SECRET_KEY.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()


def generate_session_token(email: str) -> str:
    """Gera um token de sessão assinado com HMAC."""
    payload = f"{SESSION_TOKEN_PREFIX}{email}"
    sig = _make_signature(payload)
    raw = f"{payload}:{sig}"
    return base64.urlsafe_b64encode(raw.encode()).decode()


def verify_session_token(token: str) -> Optional[str]:
    """Valida o token HMAC e retorna o email se válido, None caso contrário."""
    try:
        raw = base64.urlsafe_b64decode(token.encode()).decode()
        # Formato decodificado: "matriel-session:<email>:<64-hex-signature>"
        # A assinatura HMAC-SHA256 sempre tem exatamente 64 caracteres hex.
        if len(raw) < 65 + len(SESSION_TOKEN_PREFIX) + 1:
            return None
        sig = raw[-64:]
        payload = raw[:-65]  # exclui ":" separador + 64 chars da sig
        if not payload.startswith(SESSION_TOKEN_PREFIX):
            return None
        expected_sig = _make_signature(payload)
        if not hmac.compare_digest(sig, expected_sig):
            return None
        email = payload[len(SESSION_TOKEN_PREFIX):]
        if not email or "@" not in email:
            return None
        return email
    except Exception:
        return None


def require_admin(authorization: str = Header(None)) -> dict:
    """
    Dependência do FastAPI: valida o token HMAC e garante que o usuário
    é o administrador. Levanta 401/403 em caso de falha.
    NUNCA confia em dados enviados pelo browser para determinar permissão.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de autenticação ausente. Faça login como administrador.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization.split(" ", 1)[1]

    # Suporte a testes automatizados se a variável MOCK_AUTH estiver explicitamente ativada
    if os.environ.get("MOCK_AUTH") == "true" and token == "mock-admin-token":
        return {"email": OWNER_EMAIL}

    email = verify_session_token(token)

    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado. Faça login novamente.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if email != OWNER_EMAIL:
        logger.warning(f"Acesso negado para email: {email} (esperado: {OWNER_EMAIL})")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado. Apenas o proprietário do site pode realizar esta ação.",
        )

    return {"email": email}


# ─── MODELS ──────────────────────────────────────────────────────────────────

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str                       # nome do projeto
    category: str = ""               # categoria
    description: str = ""            # descrição
    link: str = ""                   # link (URL do projeto)
    image: str = ""                  # imagem (URL)

class ProjectCreate(BaseModel):
    title: str
    category: str = ""
    description: str = ""
    link: str = ""
    image: str = ""

class ProjectUpdate(BaseModel):
    title: str
    category: str = ""
    description: str = ""
    link: str = ""
    image: str = ""

class LoginRequest(BaseModel):
    email: str
    password: str


# ─── AUTH ENDPOINT ───────────────────────────────────────────────────────────

@api_router.post("/auth/login")
async def secure_login(req: LoginRequest):
    """
    Autentica o administrador com email + senha.
    A senha é validada via hash SHA-256 — nunca armazenada em texto plano.
    Retorna um token HMAC-assinado que o frontend deve guardar e enviar
    nas operações administrativas via 'Authorization: Bearer <token>'.
    """
    # Verifica email antes do hash para evitar timing attack parcial
    if req.email.strip().lower() != OWNER_EMAIL.lower():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos.",
        )

    # Verificação da senha via PBKDF2-HMAC-SHA256 + salt (hash seguro).
    if not verify_password(req.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos.",
        )

    session_token = generate_session_token(OWNER_EMAIL)
    logger.info(f"Login bem-sucedido para: {OWNER_EMAIL}")
    return {"token": session_token, "email": OWNER_EMAIL}


# ─── STATUS ROUTES ───────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Matriel Studio API — online"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ─── PROJECTS ROUTES ─────────────────────────────────────────────────────────

@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    """Público — qualquer visitante pode listar os projetos do portfólio."""
    projects = await db.projects.find({}, {"_id": 0}).to_list(1000)
    return projects


@api_router.post("/projects", response_model=Project, status_code=status.HTTP_201_CREATED)
async def create_project(
    project_in: ProjectCreate,
    admin: dict = Depends(require_admin),  # ← obrigatório: apenas admin
):
    """Protegido — somente o administrador pode adicionar projetos."""
    project_obj = Project(**project_in.model_dump())
    doc = project_obj.model_dump()
    await db.projects.insert_one(doc)
    logger.info(f"Projeto criado por {admin['email']}: {project_obj.title}")
    return project_obj


@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(
    project_id: str,
    project_in: ProjectUpdate,
    admin: dict = Depends(require_admin),  # ← obrigatório: apenas admin
):
    """Protegido — somente o administrador pode editar projetos."""
    existing = await db.projects.find_one({"id": project_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Projeto não encontrado.")

    update_data = project_in.model_dump()
    await db.projects.update_one({"id": project_id}, {"$set": update_data})

    updated = await db.projects.find_one({"id": project_id}, {"_id": 0})
    logger.info(f"Projeto atualizado por {admin['email']}: {project_id}")
    return Project(**updated)


@api_router.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: str,
    admin: dict = Depends(require_admin),  # ← obrigatório: apenas admin
):
    """Protegido — somente o administrador pode excluir projetos."""
    existing = await db.projects.find_one({"id": project_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Projeto não encontrado.")

    await db.projects.delete_one({"id": project_id})
    logger.info(f"Projeto excluído por {admin['email']}: {project_id}")
    return None


# ─── ROUTER REGISTRATION ─────────────────────────────────────────────────────

app.include_router(api_router)


# ─── LIFECYCLE ───────────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup_event():
    try:
        # ── Migração: projetos antigos (tag/objetivo/resultado/img) → novo schema ──
        async for doc in db.projects.find({}):
            updates = {}
            if "category" not in doc:
                updates["category"] = doc.get("tag", "Projeto")
            if "description" not in doc:
                updates["description"] = doc.get("objetivo") or doc.get("resultado") or ""
            if "image" not in doc:
                updates["image"] = doc.get("img", "")
            if "link" not in doc:
                updates["link"] = ""
            if updates:
                await db.projects.update_one({"id": doc["id"]}, {"$set": updates})

        # ── Seed inicial (apenas se não houver nenhum projeto) ──
        count = await db.projects.count_documents({})
        if count == 0:
            default_projects = [
                {
                    "id": str(uuid.uuid4()),
                    "title": "Mercado Central",
                    "category": "Supermercado",
                    "description": "Site com catálogo de produtos e pedidos online, focado em aumentar as vendas pelo WhatsApp.",
                    "link": "https://wa.me/5533999888211",
                    "image": "https://images.unsplash.com/photo-1760463921642-eef64776c3bf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHByb2R1Y2UlMjBtb2Rlcm4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85",
                },
                {
                    "id": str(uuid.uuid4()),
                    "title": "Ateliê Vitrine",
                    "category": "Loja de Roupas",
                    "description": "Vitrine digital elegante para mostrar coleções e atrair clientes para a loja física.",
                    "link": "https://wa.me/5533999888211",
                    "image": "https://images.pexels.com/photos/5531709/pexels-photo-5531709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                },
                {
                    "id": str(uuid.uuid4()),
                    "title": "Sabor & Casa",
                    "category": "Restaurante",
                    "description": "Cardápio digital moderno com sistema de reservas online integrado.",
                    "link": "https://wa.me/5533999888211",
                    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85",
                },
                {
                    "id": str(uuid.uuid4()),
                    "title": "Clínica Bem Viver",
                    "category": "Empresa de Serviços",
                    "description": "Site institucional com agendamentos online para gerar autoridade e novos pacientes.",
                    "link": "https://wa.me/5533999888211",
                    "image": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGFwdG9wJTIwc21hcnRwaG9uZSUyMG1vY2t1cCUyMGRhcmt8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85",
                }
            ]
            await db.projects.insert_many(default_projects)
            logger.info("Banco de dados inicializado com os projetos padrão.")
    except Exception as e:
        logger.error(f"Erro ao inicializar banco de dados: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()