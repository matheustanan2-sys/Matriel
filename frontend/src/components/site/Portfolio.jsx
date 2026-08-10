import { Reveal } from "./motion";

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
      </div>
    </section>
  );
}
