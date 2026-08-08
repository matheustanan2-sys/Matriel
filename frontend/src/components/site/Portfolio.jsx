import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Reveal } from "./motion";
import { PORTFOLIO as DEFAULT_PORTFOLIO } from "../../lib/site";
import { toast } from "sonner";
import { X, Plus, Image as ImageIcon, Edit, Trash2, Loader2 } from "lucide-react";
import { getAuthToken } from "../../lib/firebase";

// API Endpoint configuration
const envApiUrl = typeof process !== "undefined" && process.env ? process.env.REACT_APP_API_URL : undefined;
const API_URL = envApiUrl || (window.location.hostname === "localhost" ? "http://localhost:8000/api" : "/api");

// Predefined high-quality default images for portfolio categories
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=compress&cs=tinysrgb&w=800&q=80", // Agency/Web
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=compress&cs=tinysrgb&w=800&q=80", // Tech
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=compress&cs=tinysrgb&w=800&q=80", // Store
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=compress&cs=tinysrgb&w=800&q=80", // Restaurant
];

// Garante que projetos padrão tenham um id local (não persistido no banco)
const DEFAULT_WITH_IDS = DEFAULT_PORTFOLIO.map((p, i) => ({
  ...p,
  id: p.id || `default-${i}`,
  _isDefault: true,
}));

const CACHE_KEY = "matriel_portfolio_cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

function getCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp < CACHE_TTL_MS) return data;
    sessionStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

function setCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
}

function clearCache() {
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {}
}

function PortfolioCard({ item, index, isAdmin, onEdit, onDelete }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <Reveal delay={(index % 2) * 0.1}>
      <div
        ref={ref}
        className={`group ${index % 2 === 1 ? "md:mt-24" : ""} relative`}
        data-testid={`portfolio-card-${index}`}
      >
        <div className="relative overflow-hidden rounded-lg border border-white/10">
          <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" />
          <div className="absolute inset-0 z-[5] bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Admin Quick Actions Overlay */}
          {isAdmin && (
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="p-2 rounded-full bg-surface/90 border border-white/10 text-bone hover:text-gold hover:border-gold/50 transition-all shadow-lg backdrop-blur-sm"
                title="Editar Projeto"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(item)}
                className="p-2 rounded-full bg-surface/90 border border-white/10 text-bone hover:text-red-400 hover:border-red-400/50 transition-all shadow-lg backdrop-blur-sm"
                title="Excluir Projeto"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}

          <div className="overflow-hidden">
            <motion.img
              src={item.img || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]}
              alt={`Projeto ${item.title} — ${item.tag}`}
              style={{ y }}
              className="w-full h-[300px] md:h-[420px] object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
              loading="lazy"
            />
          </div>
        </div>
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">{item.tag}</p>
            <h3 className="mt-2 font-heading text-2xl md:text-3xl tracking-tight text-bone">{item.title}</h3>
          </div>
        </div>
        <div className="mt-4 space-y-2 border-t border-white/10 pt-4 max-w-md">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-xs uppercase tracking-wide text-ash">Objetivo</span>
            <span className="text-sm text-bone/90 text-right">{item.objetivo}</span>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-xs uppercase tracking-wide text-ash">Resultado</span>
            <span className="text-sm font-semibold text-gold text-right">{item.resultado}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Portfolio({ user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    objetivo: "",
    resultado: "",
    img: ""
  });

  // Fetch projects from backend com timeout e cache
  const fetchProjects = useCallback(async ({ bustCache = false } = {}) => {
    if (!bustCache) {
      const cached = getCache();
      if (cached) {
        setProjects(cached);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    try {
      const res = await fetch(`${API_URL}/projects`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const finalData = data.length > 0 ? data : DEFAULT_WITH_IDS;
        setProjects(finalData);
        setCache(finalData);
      } else {
        setProjects(DEFAULT_WITH_IDS);
        setCache(DEFAULT_WITH_IDS);
      }
    } catch (e) {
      clearTimeout(timeoutId);
      if (e.name === "AbortError") {
        console.warn("Timeout ao carregar portfólio, usando dados padrão.");
      } else {
        console.error("Erro ao carregar projetos:", e);
      }
      // Usa cache expirado se disponível, senão defaults
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (raw) {
          const { data } = JSON.parse(raw);
          setProjects(data);
          return;
        }
      } catch {}
      setProjects(DEFAULT_WITH_IDS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setFormData({ title: "", tag: "", objetivo: "", resultado: "", img: "" });
    setIsOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      tag: project.tag,
      objetivo: project.objetivo,
      resultado: project.resultado,
      img: project.img || ""
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.tag || !formData.objetivo || !formData.resultado) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setSubmitLoading(true);
    try {
      const token = await getAuthToken();
      const authToken = token || "mock-admin-token";

      const projectData = {
        title: formData.title,
        tag: formData.tag,
        objetivo: formData.objetivo,
        resultado: formData.resultado,
        img: formData.img.trim() || DEFAULT_IMAGES[projects.length % DEFAULT_IMAGES.length]
      };

      let res;
      if (editingProject) {
        // Editar projeto real no backend
        res = await fetch(`${API_URL}/projects/${editingProject.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify(projectData)
        });
      } else {
        // Criar novo projeto
        res = await fetch(`${API_URL}/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify(projectData)
        });
      }

      if (res.ok) {
        toast.success(editingProject ? "Projeto atualizado com sucesso!" : "Projeto cadastrado com sucesso!");
        setIsOpen(false);
        clearCache();
        // Recarrega do servidor para garantir dados atualizados
        await fetchProjects({ bustCache: true });
      } else {
        let errorDetail = "Erro ao salvar o projeto. Verifique suas permissões.";
        try {
          const errorData = await res.json();
          errorDetail = errorData.detail || errorDetail;
        } catch {}
        toast.error(errorDetail);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão ao salvar projeto.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Tem certeza que deseja excluir este projeto do portfólio?")) return;

    // Projeto real — remove no backend
    try {
      const token = await getAuthToken();
      const authToken = token || "mock-admin-token";

      const res = await fetch(`${API_URL}/projects/${item.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      });

      if (res.ok) {
        toast.success("Projeto removido com sucesso!");
        clearCache();
        setProjects((prev) => {
          const updated = prev.filter((p) => p.id !== item.id);
          setCache(updated);
          return updated;
        });
      } else {
        let errorDetail = "Erro ao excluir projeto.";
        try {
          const errorData = await res.json();
          errorDetail = errorData.detail || errorDetail;
        } catch {}
        toast.error(errorDetail);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao conectar ao servidor para exclusão.");
    }
  };


  return (
    <section id="portfolio" className="py-24 md:py-40 scroll-mt-20" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" /> Portfólio
            </p>
            <Reveal>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight leading-none text-bone">
                Projetos que <span className="font-accent italic font-normal text-gold">inspiram</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8">
            <Reveal delay={0.1}>
              <p className="max-w-xs text-ash leading-relaxed">
                Exemplos do tipo de resultado que entregamos para diferentes segmentos do comércio local.
              </p>
            </Reveal>
            {user && (
              <Reveal delay={0.2}>
                <button
                  onClick={handleOpenCreateModal}
                  className="group flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold hover:text-ink transition-all duration-300 active:scale-95"
                  data-testid="add-project-button"
                >
                  <Plus size={16} className="transition-transform group-hover:rotate-90" />
                  Adicionar Projeto
                </button>
              </Reveal>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-ash">
            <Loader2 className="animate-spin text-gold" size={32} />
            <p className="text-sm">Carregando portfólio...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {projects.map((item, i) => (
              <PortfolioCard
                key={item.id || `${item.title}-${i}`}
                item={item}
                index={i}
                isAdmin={!!user}
                onEdit={handleOpenEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modern, Elegant Registration / Edit Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              {/* Header */}
              <div className="px-8 pt-8 pb-4 flex items-center justify-between border-b border-white/5">
                <div>
                  <h3 className="font-heading text-2xl font-semibold tracking-tight text-bone">
                    {editingProject ? "Editar" : "Cadastrar"}{" "}
                    <span className="font-accent italic text-gold">Projeto</span>
                  </h3>
                  <p className="text-xs text-ash mt-1">Preencha as informações para listar o projeto no portfólio.</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-ash hover:text-bone hover:bg-white/5 transition-all"
                  aria-label="Fechar"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ash mb-2 font-semibold">
                    Nome do Projeto <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Mercado Central"
                    className="w-full bg-ink/40 border border-white/10 rounded-lg p-3 text-bone text-sm placeholder:text-ash/40 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ash mb-2 font-semibold">
                      Categoria / Tag <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="tag"
                      required
                      value={formData.tag}
                      onChange={handleInputChange}
                      placeholder="Ex: Supermercado"
                      className="w-full bg-ink/40 border border-white/10 rounded-lg p-3 text-bone text-sm placeholder:text-ash/40 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ash mb-2 font-semibold">
                      Resultado Obtido <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="resultado"
                      required
                      value={formData.resultado}
                      onChange={handleInputChange}
                      placeholder="Ex: +40% de vendas"
                      className="w-full bg-ink/40 border border-white/10 rounded-lg p-3 text-bone text-sm placeholder:text-ash/40 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ash mb-2 font-semibold">
                    Objetivo do Projeto <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    name="objetivo"
                    required
                    value={formData.objetivo}
                    onChange={handleInputChange}
                    placeholder="Ex: Vender e receber pedidos online"
                    className="w-full bg-ink/40 border border-white/10 rounded-lg p-3 text-bone text-sm placeholder:text-ash/40 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ash mb-2 font-semibold">
                    URL da Imagem <span className="text-ash/60">(opcional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="img"
                      value={formData.img}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-ink/40 border border-white/10 rounded-lg p-3 pl-10 text-bone text-sm placeholder:text-ash/40 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                    <ImageIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash/40" />
                  </div>
                  <p className="text-[10px] text-ash/40 mt-1">Se deixado em branco, uma imagem profissional de alta resolução será atribuída automaticamente.</p>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-ash hover:text-bone hover:bg-white/5 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="px-6 py-2.5 rounded-full text-sm font-semibold bg-gold text-ink hover:bg-gold-hover transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {submitLoading && <Loader2 size={14} className="animate-spin" />}
                    {editingProject ? "Salvar Alterações" : "Salvar Projeto"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
