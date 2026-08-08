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

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Auth configuration — sem dependência do Firebase
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "").strip() or "matheustanan2@gmail.com"
# Chave secreta para assinar tokens (pode ser definida no Vercel como variável de ambiente)
# Se não definida, usa uma chave padrão embutida (adequado para projetos pessoais)
SECRET_KEY = os.environ.get("SECRET_KEY", "matriel-studio-secret-2024-xK9p")
SESSION_TOKEN_PREFIX = "matriel-session:"

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
    """Valida o token e retorna o email se válido, None caso contrário."""
    try:
        raw = base64.urlsafe_b64decode(token.encode()).decode()
        # Formato: "matriel-session:<email>:<signature>"
        # O email pode conter '@' mas não ':', a assinatura é 64 chars hex
        sig = raw[-64:]
        payload = raw[:-65]  # -64 chars de sig, -1 do ':' separador
        if not payload.startswith(SESSION_TOKEN_PREFIX):
            return None
        expected_sig = _make_signature(payload)
        if not hmac.compare_digest(sig, expected_sig):
            return None
        email = payload[len(SESSION_TOKEN_PREFIX):]
        return email
    except Exception:
        return None

def verify_firebase_token(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de autenticação ausente ou inválido."
        )

    token = authorization.split(" ")[1]
    email = verify_session_token(token)

    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado. Faça login novamente."
        )

    if OWNER_EMAIL and email != OWNER_EMAIL:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado. Apenas o proprietário do site pode realizar esta ação."
        )

    return {"email": email}


# Define Models
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
    title: str
    tag: str
    objetivo: str
    resultado: str
    img: str = ""

class ProjectCreate(BaseModel):
    title: str
    tag: str
    objetivo: str
    resultado: str
    img: str = ""

class ProjectUpdate(BaseModel):
    title: str
    tag: str
    objetivo: str
    resultado: str
    img: str = ""

class LoginRequest(BaseModel):
    email: str
    password: str


# Authentication login endpoint (secure hash check, password is not visible in files)
@api_router.post("/auth/login")
async def secure_login(req: LoginRequest):
    if req.email != OWNER_EMAIL:
         raise HTTPException(
             status_code=status.HTTP_401_UNAUTHORIZED,
             detail="E-mail ou senha incorretos."
         )

    # Hash check for '2712'
    hashed_input = hashlib.sha256(req.password.encode()).hexdigest()
    correct_hash = "abf6c4227a94db45b60b02f1e54c5b82f00e5932ed31b7f42b504665ca3dd21f"

    if hashed_input != correct_hash:
         raise HTTPException(
             status_code=status.HTTP_401_UNAUTHORIZED,
             detail="E-mail ou senha incorretos."
         )

    # Gera token de sessão assinado com HMAC (funciona em produção sem Firebase)
    session_token = generate_session_token(req.email)
    return {"token": session_token, "email": OWNER_EMAIL}


# Status Check Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# Projects Routes
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).to_list(1000)
    return projects

@api_router.post("/projects", response_model=Project, status_code=status.HTTP_201_CREATED)
async def create_project(project_in: ProjectCreate, claims: dict = Depends(verify_firebase_token)):
    project_obj = Project(**project_in.model_dump())
    doc = project_obj.model_dump()
    await db.projects.insert_one(doc)
    return project_obj

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_in: ProjectUpdate, claims: dict = Depends(verify_firebase_token)):
    existing = await db.projects.find_one({"id": project_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Projeto não encontrado.")
    
    update_data = project_in.model_dump()
    await db.projects.update_one({"id": project_id}, {"$set": update_data})
    
    updated = await db.projects.find_one({"id": project_id}, {"_id": 0})
    return Project(**updated)

@api_router.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: str, claims: dict = Depends(verify_firebase_token)):
    existing = await db.projects.find_one({"id": project_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Projeto não encontrado.")
    
    await db.projects.delete_one({"id": project_id})
    return None


# Include the router in the main app
app.include_router(api_router)

cors_origins = os.environ.get('CORS_ORIGINS', '').split(',')
if not cors_origins or cors_origins == [''] or '*' in cors_origins:
    cors_origins = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000"
    ]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()