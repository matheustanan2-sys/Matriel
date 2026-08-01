import { Reveal } from "./motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../../lib/site";

export default function Servicos() {
  return (
    <section id="servicos" className="py-24 md:py-40 bg-surface scroll-mt-20" data-testid="servicos-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" /> O que fazemos
            </p>
            <Reveal>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight leading-none text-bone">
                Serviços
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-ash leading-relaxed">
              Soluções completas para colocar a sua empresa na internet — do
              primeiro esboço ao suporte contínuo.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <div
                className="group relative h-full rounded-lg border border-white/10 bg-ink p-8 md:p-10 transition-all duration-500 hover:border-gold/50 hover:-translate-y-1"
                data-testid={`service-card-${s.num}`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-accent text-4xl text-white/20 group-hover:text-gold transition-colors duration-500">
                    {s.num}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-ash transition-all duration-500 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <h3 className="mt-8 font-heading text-2xl md:text-3xl tracking-tight text-bone">
                  {s.title}
                </h3>
                <p className="mt-4 text-ash leading-relaxed">{s.text}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ash">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
