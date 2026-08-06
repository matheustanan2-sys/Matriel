import { useEffect, useRef, useState, useCallback } from "react";
import "@/App.css";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import EditorialMarquee from "@/components/site/EditorialMarquee";
import Sobre from "@/components/site/Sobre";
import Servicos from "@/components/site/Servicos";
import ComoFunciona from "@/components/site/ComoFunciona";
import Beneficios from "@/components/site/Beneficios";
import OfertaEspecial from "@/components/site/OfertaEspecial";
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";
import Contato from "@/components/site/Contato";

function Preloader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          data-testid="preloader"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline gap-2"
            >
              <span className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-bone">
                Matriel
              </span>
              <span className="font-accent italic text-3xl md:text-4xl text-gold">Studio</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const lenisRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Kick off hero reveal right away so content is ready behind the intro.
    setStarted(true);

    // Robustly dismiss the intro: whichever signal comes first.
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setLoaded(true);
    };
    const timers = [];
    timers.push(setTimeout(finish, 1200));
    if (document.readyState === "complete") timers.push(setTimeout(finish, 800));
    window.addEventListener("load", finish);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => timers.push(setTimeout(finish, 400)));
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("load", finish);
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleNav = useCallback((href) => {
    if (href === "#top") {
      lenisRef.current?.scrollTo(0);
      return;
    }
    const el = document.querySelector(href);
    if (el) lenisRef.current?.scrollTo(el, { offset: -60 });
  }, []);

  return (
    <div className="App relative">
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader done={loaded} />
      <Toaster position="top-center" theme="dark" richColors />

      <Header onNav={handleNav} />
      <FloatingWhatsApp />
      <main>
        <Hero started={started} onNav={handleNav} />
        <EditorialMarquee />
        <Sobre />
        <Servicos />
        <Beneficios />
        <OfertaEspecial />
        <ComoFunciona />
        <Contato />
      </main>
    </div>
  );
}
