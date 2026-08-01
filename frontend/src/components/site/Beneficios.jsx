import { Reveal } from "./motion";
import { Check } from "lucide-react";
import { BENEFITS, waLink } from "../../lib/site";

export default function Beneficios() {
  return (
    <section className="py-24 md:py-40 bg-surface" data-testid="beneficios-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.28em] text-gold mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" /> Benefícios
          </p>
          <Reveal>
            <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95] text-bone">
              Por que sua empresa precisa de um <span className="font-accent italic font-normal text-gold">site</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg text-ash leading-relaxed max-w-md">
              Um site profissional trabalha por você o dia inteiro — atraindo,
              informando e convertendo clientes mesmo quando a loja está fechada.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={waLink("Olá! Quero um site profissional para a minha empresa.")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="beneficios-cta"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-ink transition-all duration-300 hover:bg-gold-hover active:scale-[0.98]"
            >
              Quero o meu site
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
            {BENEFITS.map((b, i) => (
              <Reveal key={b} delay={i * 0.07} className="bg-ink">
                <div className="group flex items-center gap-5 p-6 md:p-8 transition-colors duration-500 hover:bg-elevated">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                    <Check size={18} />
                  </span>
                  <span className="text-lg text-bone/90">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
