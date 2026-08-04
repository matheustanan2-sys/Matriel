import { Reveal } from "./motion";
import { ArrowUpRight, Globe, ShoppingBag, Target, Wrench, Sparkles } from "lucide-react";
import { SERVICES, waLink } from "../../lib/site";

const ICONS = { Globe, ShoppingBag, Target, Wrench };

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
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Globe;
            return (
            <Reveal key={s.num} delay={i * 0.08}>
              <div
                className="group relative h-full rounded-lg border border-white/10 bg-ink p-8 md:p-10 transition-all duration-500 hover:border-gold/50 hover:-translate-y-1"
                data-testid={`service-card-${s.num}`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-surface text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                    <Icon size={24} />
                  </span>
                  <span className="font-accent text-4xl text-white/15 group-hover:text-gold/70 transition-colors duration-500">
                    {s.num}
                  </span>
                </div>
                <h3 className="mt-8 font-heading text-2xl md:text-3xl tracking-tight text-bone">
                  {s.title}
                </h3>
                <p className="mt-3 text-ash leading-relaxed">{s.text}</p>
                <p className="mt-4 flex items-start gap-2 text-bone/90">
                  <Sparkles size={16} className="mt-1 shrink-0 text-gold" />
                  <span className="text-sm">{s.benefit}</span>
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ash">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={waLink(`Olá! Tenho interesse no serviço: ${s.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`service-cta-${s.num}`}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:gap-2.5 transition-all duration-300"
                >
                  Quero este serviço <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
          );})}
        </div>
      </div>
    </section>
  );
}
