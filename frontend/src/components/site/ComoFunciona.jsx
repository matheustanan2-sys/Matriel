import { Reveal } from "./motion";
import { STEPS } from "../../lib/site";

export default function ComoFunciona() {
  return (
    <section id="processo" className="py-24 md:py-40 scroll-mt-20" data-testid="processo-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.28em] text-gold mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" /> Como funciona
          </p>
          <Reveal>
            <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight leading-none text-bone max-w-3xl">
              Um processo simples, do primeiro <span className="font-accent italic font-normal text-gold">olá</span> ao site no ar.
            </h2>
          </Reveal>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.06}>
              <div className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 md:py-14 items-baseline transition-colors duration-500 hover:bg-surface/60 px-2 md:px-6">
                <span className="md:col-span-3 font-accent text-6xl md:text-8xl text-white/10 group-hover:text-gold transition-colors duration-500 leading-none">
                  {step.num}
                </span>
                <h3 className="md:col-span-5 font-heading text-2xl md:text-3xl tracking-tight text-bone">
                  {step.title}
                </h3>
                <p className="md:col-span-4 text-ash leading-relaxed">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
