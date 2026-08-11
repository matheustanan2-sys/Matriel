import { useRef, useState } from "react";
import { Reveal } from "./motion";
import { Play, Pause, Maximize2 } from "lucide-react";

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
  const wrapRef = useRef(null);
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

  const goFullscreen = (e) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen(); // iOS
  };

  return (
    <div
      ref={wrapRef}
      className="relative group w-full rounded-3xl overflow-hidden border border-gold/20 bg-black shadow-2xl"
    >
      <video
        ref={videoRef}
        src="/superlanche.mp4"
        className="w-full h-[70vh] md:h-[82vh] max-h-[900px] object-contain bg-black"
        playsInline
        loop
        preload="metadata"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        data-testid="portfolio-video"
      />

      {/* center play/pause overlay */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        data-testid="portfolio-video-toggle"
      >
        <span className="flex items-center justify-center h-20 w-20 rounded-full bg-gold text-ink shadow-lg transition-transform duration-300 hover:scale-105">
          {playing ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
        </span>
      </button>

      {/* fullscreen button */}
      <button
        type="button"
        onClick={goFullscreen}
        aria-label="Tela cheia"
        className="absolute top-4 right-4 flex items-center justify-center h-11 w-11 rounded-full bg-black/60 border border-gold/30 text-bone backdrop-blur hover:bg-gold hover:text-ink transition-colors"
        data-testid="portfolio-video-fullscreen"
      >
        <Maximize2 className="h-5 w-5" />
      </button>
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

        {/* Featured project: Super Lancheburguer — full-width video */}
        <Reveal>
          <ProjectVideo />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-gold mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-gold/60" /> Site de Pedidos
              </p>
              <h3 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-bone mb-6">
                Super Hamburguers
              </h3>
              <div className="space-y-5 text-ash leading-relaxed">
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
            </div>

            <div className="lg:pt-14">
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
    </section>
  );
}
