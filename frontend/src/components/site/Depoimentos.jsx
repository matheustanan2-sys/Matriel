import { Reveal } from "./motion";
import { TESTIMONIALS } from "../../lib/site";

export default function Depoimentos() {
  return (
    <section className="py-24 md:py-40 bg-surface" data-testid="depoimentos-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-gold mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" /> Depoimentos
          </p>
          <Reveal>
            <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight leading-none text-bone">
              Quem confia na <span className="font-accent italic font-normal text-gold">Matriel</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.1}>
              <figure className="relative h-full rounded-lg border border-white/10 bg-ink p-8 md:p-10 transition-colors duration-500 hover:border-gold/40">
                <span className="font-accent text-7xl text-gold/40 leading-none block h-10">&ldquo;</span>
                <blockquote className="mt-2 text-lg md:text-xl text-bone/90 leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-elevated font-heading text-gold">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-bone font-medium">{t.name}</span>
                    <span className="block text-sm text-ash">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
