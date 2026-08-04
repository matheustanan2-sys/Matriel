import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./motion";
import { PORTFOLIO } from "../../lib/site";

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
              src={item.img}
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
          <Reveal delay={0.1}>
            <p className="max-w-md text-ash leading-relaxed">
              Exemplos do tipo de resultado que entregamos para diferentes segmentos
              do comércio local.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {PORTFOLIO.map((item, i) => (
            <PortfolioCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
