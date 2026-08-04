import { Reveal } from "./motion";
import { Check, ArrowUpRight } from "lucide-react";
import { OFFER, waLink } from "../../lib/site";

export default function OfertaEspecial() {
  return (
    <section id="oferta" className="py-16 md:py-28 scroll-mt-20" data-testid="oferta-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-surface p-8 md:p-16">
            <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                  {OFFER.tag}
                </span>
                <h2 className="mt-6 font-heading text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-bone">
                  {OFFER.title}
                </h2>
                <ul className="mt-8 space-y-3">
                  {OFFER.perks.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-bone/90">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-ink">
                        <Check size={14} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-ash">{OFFER.note}</p>
              </div>

              <div className="lg:col-span-5 lg:pl-8 lg:border-l border-white/10">
                <p className="font-heading text-6xl md:text-7xl text-gold leading-none">20%</p>
                <p className="mt-2 text-bone/90">de desconto para os 5 primeiros contratos</p>
                <a
                  href={waLink("Olá! Quero garantir a oferta de lançamento (20% de desconto) com a Matriel Studio.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="oferta-cta"
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-ink transition-all duration-300 hover:bg-gold-hover active:scale-[0.98]"
                >
                  Garantir minha vaga
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
