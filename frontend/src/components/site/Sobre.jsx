import { Reveal } from "./motion";
import { VALUES } from "../../lib/site";

export default function Sobre() {
  return (
    <section id="sobre" className="py-24 md:py-40 scroll-mt-20" data-testid="sobre-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <p className="text-xs uppercase tracking-[0.28em] text-gold mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" /> Sobre nós
            </p>
            <p className="font-accent italic text-2xl text-ash leading-snug">
              Sua empresa merece uma presença digital profissional.
            </p>
          </div>
        </div>

        <div className="md:col-span-8">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-bone">
              A Matriel Studio nasceu para ajudar empresas locais a terem uma
              presença digital <span className="font-accent italic font-normal text-gold">de verdade</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg text-ash leading-relaxed">
              Criamos sites modernos, rápidos e personalizados para empresas,
              lojas, supermercados e comércios de Itaobim e região. Nosso trabalho
              une o cuidado de uma grande agência com a proximidade de quem entende
              o negócio local.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="bg-ink">
                <div className="group p-8 md:p-10 h-full transition-colors duration-500 hover:bg-surface">
                  <span className="font-accent text-gold text-3xl">0{i + 1}</span>
                  <h3 className="mt-4 font-heading text-xl text-bone tracking-tight">{v.title}</h3>
                  <p className="mt-3 text-ash leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
