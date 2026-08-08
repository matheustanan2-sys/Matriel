import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, Settings } from "lucide-react";
import { NAV, waLink } from "../../lib/site";

export const Logo = ({ onClick }) => (
  <a
    href="#top"
    onClick={onClick}
    data-testid="site-logo"
    className="group flex items-baseline gap-2 select-none"
    aria-label="Matriel Studio — início"
  >
    <span className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-bone leading-none">
      Matriel
    </span>
    <span className="font-accent italic text-xl md:text-2xl text-gold leading-none">Studio</span>
    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-500 group-hover:scale-150" />
  </a>
);

export default function Header({ onNav, user, onLoginClick, onLogoutClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    onNav?.(href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
      className={`fixed top-0 inset-x-0 z-[100] transition-colors duration-500 ${
        scrolled ? "bg-ink/70 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Logo onClick={(e) => handleClick(e, "#top")} />

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => handleClick(e, n.href)}
              data-testid={`nav-${n.href.replace("#", "")}`}
              className="text-sm text-ash hover:text-bone transition-colors duration-300 tracking-wide"
            >
              {n.label}
            </a>
          ))}

          {user ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <span className="text-xs text-gold font-medium flex items-center gap-1">
                <Settings size={14} className="animate-spin-slow" />
                Painel Admin
              </span>
              <button
                onClick={onLogoutClick}
                className="text-ash hover:text-red-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Sair da conta"
              >
                <LogOut size={14} />
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-ash hover:text-gold transition-colors flex items-center gap-1.5 text-xs font-semibold border-l border-white/10 pl-6"
              title="Acesso Administrador"
            >
              <LogIn size={14} />
              Admin
            </button>
          )}

          <a
            href={waLink("Olá! Gostaria de solicitar um orçamento com a Matriel Studio.")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="header-cta"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gold-hover transition-colors duration-300"
          >
            Orçamento
          </a>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          {user && (
            <span className="text-[10px] text-gold font-medium border border-gold/30 rounded px-2 py-0.5">
              Admin
            </span>
          )}
          <button
            className="text-bone"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            aria-label="Abrir menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-ink/95 backdrop-blur-xl border-b border-white/10"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => handleClick(e, n.href)}
                  className="text-lg text-bone/90 font-heading tracking-tight"
                >
                  {n.label}
                </a>
              ))}
              
              {user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    onLogoutClick();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-red-500/30 py-3 text-center font-semibold text-red-400"
                >
                  <LogOut size={16} />
                  Sair do Painel
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    onLoginClick();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-center font-semibold text-ash hover:text-bone"
                >
                  <LogIn size={16} />
                  Acesso Restrito (Admin)
                </button>
              )}

              <a
                href={waLink("Olá! Gostaria de solicitar um orçamento com a Matriel Studio.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-full bg-gold px-5 py-3 text-center font-semibold text-ink"
              >
                Solicitar orçamento
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
