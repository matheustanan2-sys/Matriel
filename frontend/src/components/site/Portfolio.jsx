import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Reveal } from "./motion";
import { PORTFOLIO as DEFAULT_PORTFOLIO } from "../../lib/site";
import { toast } from "sonner";
import { X, Plus, Image as ImageIcon } from "lucide-react";

// Predefined high-quality default images for portfolio categories
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=compress&cs=tinysrgb&w=800&q=80", // Agency/Web
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=compress&cs=tinysrgb&w=800&q=80", // Tech
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=compress&cs=tinysrgb&w=800&q=80", // Store
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=compress&cs=tinysrgb&w=800&q=80", // Restaurant
];

function PortfolioCard({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <Reveal delay={(index % 2) * 0.1}>
      <div
        ref={ref}
        className={`group ${index % 2 === 1 ? "md:mt-24" : ""}`}
        data-testid={`portfolio-card-${index}`}
      >
        <div className="relative overflow-hidden rounded-lg border border-white/10">
          <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" />
          <div className="absolute inset-0 z-[5] bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    objetivo: "",
    resultado: "",
    img: ""
  });

  // Load projects from localStorage, fallback to DEFAULT_PORTFOLIO
  useEffect(() => {
    const saved = localStorage.getItem("matriel_portfolio");
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        setProjects(DEFAULT_PORTFOLIO);
      }
    } else {
      setProjects(DEFAULT_PORTFOLIO);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.tag || !formData.objetivo || !formData.resultado) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // fallback to a random high-quality default image if none provided
    const imgUrl = formData.img.trim() || DEFAULT_IMAGES[projects.length % DEFAULT_IMAGES.length];
    
    const newProject = {
      title: formData.title,
      tag: formData.tag,
      objetivo: formData.objetivo,
      resultado: formData.resultado,
      img: imgUrl
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("matriel_portfolio", JSON.stringify(updatedProjects));
    
    // Reset and close
    setFormData({ title: "", tag: "", objetivo: "", resultado: "", img: "" });
    setIsOpen(false);
    toast.success("Projeto cadastrado com sucesso!");
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
            <Reveal delay={0.2}>
              <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold hover:text-ink transition-all duration-300 active:scale-95"
                data-testid="add-project-button"
              >
                <Plus size={16} className="transition-transform group-hover:rotate-90" />
                Adicionar Projeto
              </button>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {projects.map((item, i) => (
            <PortfolioCard key={`${item.title}-${i}`} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Modern, Elegant Registration Modal */}
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
                    Cadastrar <span className="font-accent italic text-gold">Novo Projeto</span>
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
                    className="px-6 py-2.5 rounded-full text-sm font-semibold bg-gold text-ink hover:bg-gold-hover transition-colors"
                  >
                    Salvar Projeto
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
