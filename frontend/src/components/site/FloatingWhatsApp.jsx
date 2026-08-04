import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink } from "../../lib/site";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink("Olá! Vim pelo site da Matriel Studio e quero falar com um especialista.")}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="floating-whatsapp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-6 z-[120] flex items-center gap-3 rounded-full bg-gold pl-4 pr-5 py-3.5 font-semibold text-ink shadow-lg shadow-black/40 hover:bg-gold-hover transition-colors duration-300"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle size={22} />
          <span className="hidden sm:inline text-sm">Falar com especialista</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
