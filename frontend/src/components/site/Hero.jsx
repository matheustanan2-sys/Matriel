import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { MaskedLines } from "./motion";
import { waLink, HERO_MOCKUP, LOCATION } from "../../lib/site";

export default function Hero({ started, onNav }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16"
      data-testid="hero-section"
    >
      {/* subtle radial glow, no gradient overload */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs md:text-sm uppercase tracking-[0.28em] text-gold mb-8 flex items-center gap-3"
            data-testid="hero-overline"
          >
            <span className="h-px w-10 bg-gold/60" />
            Agência digital · {LOCATION}
          </motion.p>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] text-bone">
            <MaskedLines
              start={started}
              lines={["Transformamos", "negócios locais em"]}
            />
            <span className="reveal-line">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={started ? { y: "0%" } : {}}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
              >
                marcas <span className="font-accent italic font-normal text-gold">digitais</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-8 max-w-xl text-base md:text-lg text-ash leading-relaxed"
            data-testid="hero-subtitle"
          >
            A Matriel Studio cria sites profissionais para empresas de Itaobim que
            querem atrair mais clientes e vender mais pela internet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href={waLink("Olá! Gostaria de solicitar um orçamento com a Matriel Studio.")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-primary-cta"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-ink transition-all duration-300 hover:bg-gold-hover active:scale-[0.98]"
            >
              Solicitar orçamento
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => onNav?.("#servicos")}
              data-testid="hero-secondary-cta"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-medium text-bone transition-all duration-300 hover:border-gold hover:text-gold active:scale-[0.98]"
            >
              Ver nossos serviços
            </button>
          </motion.div>
        </motion.div>

        {/* Mockup with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={started ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" />
            <motion.img
              src={HERO_MOCKUP}
              alt="Mockup de site profissional em notebook e celular"
              style={{ y: imgY, scale: imgScale }}
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden md:flex items-center gap-3 rounded-full bg-surface border border-white/10 px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm text-bone/90">Projetos que vendem 24h por dia</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-16 flex items-center gap-3 text-ash text-sm"
      >
        <ArrowDown size={16} className="text-gold" />
        Role para conhecer a Matriel Studio
      </motion.div>
    </section>
  );
}
