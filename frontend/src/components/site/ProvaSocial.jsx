import { Reveal } from "./motion";
import { Star, Check } from "lucide-react";
import { WHATS_MSGS } from "../../lib/site";

export default function ProvaSocial() {
  return (
    <section id="prova" className="py-24 md:py-40 scroll-mt-20" data-testid="prova-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.28em] text-gold mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" /> Prova social
            </p>
            <Reveal>
              <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-bone">
                Empresas locais que já <span className="font-accent italic font-normal text-gold">confiam</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
                <span className="ml-2 text-ash text-sm">4.9 de 5 · avaliações reais</span>
              </div>
            </Reveal>
          </div>

          {/* WhatsApp style messages */}
          <div className="lg:col-span-8 space-y-4">
            {WHATS_MSGS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="max-w-xl rounded-2xl rounded-tl-sm border border-white/10 bg-surface p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gold">{m.name}</span>
                    <span className="text-xs text-ash">{m.time}</span>
                  </div>
                  <p className="text-bone/90 leading-relaxed">{m.text}</p>
                  <div className="mt-2 flex items-center justify-end gap-1 text-ash text-xs">
                    <Check size={13} className="text-gold" />
                    <Check size={13} className="-ml-2.5 text-gold" /> lida
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
