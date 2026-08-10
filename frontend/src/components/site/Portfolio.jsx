import { useRef, useState } from "react";
import { Reveal } from "./motion";
import { Play, Pause } from "lucide-react";

const FEATURES = [
  "Catálogo de produtos",
  "Categorias",
  "Detalhes dos produtos",
  "Carrinho",
  "Formulário de pedido",
  "Integração com WhatsApp",
  "Design responsivo",
];

function ProjectVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative group">
      {/* glow */}
      <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
      <div className="relative rounded-3xl overflow-hidden border border-gold/20 bg-black shadow-2xl">
        <video
          ref={videoRef}
          src="/superlanche.mp4"
          className="w-full h-full object-cover aspect-[9/16] max-h-[640px] mx-auto"
          playsInline
          loop
          preload="metadata"
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          data-testid="portfolio-video"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
          data-testid="portfolio-video-toggle"
        >
          <span className="flex items-center justify-center h-16 w-16 rounded-full bg-gold text-ink shadow-lg transition-transform duration-300 hover:scale-105">
            {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function Portfolio() {
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
          </div>
        </div>

        {/* Featured project: Super Lancheburguer */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <ProjectVideo />
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-gold mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-gold/60" /> Site de Pedidos
              </p>
              <h3 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-bone mb-6">
                Super Lancheburguer
              </h3>

              <div className="space-y-5 text-ash leading-relaxed max-w-xl">
                <p>
                  Layout desenvolvido para uma hamburgueria moderna, com foco em apresentar os
                  produtos de forma visual e facilitar o processo de compra.
                </p>
                <p>
                  O projeto conta com catálogo de hambúrgueres e acompanhamentos, categorias de
                  produtos, detalhes dos itens, carrinho de compras e finalização do pedido
                  diretamente pelo WhatsApp.
                </p>
                <p>
                  O design utiliza uma identidade visual escura com detalhes dourados, criando uma
                  aparência moderna, sofisticada e alinhada ao conceito de uma hamburgueria premium.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.24em] text-bone/70 mb-4">
                  Funcionalidades
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {FEATURES.map((f) => (
                    <span
                      key={f}
                      className="text-sm text-bone/90 border border-gold/25 bg-gold/5 rounded-full px-4 py-1.5"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
