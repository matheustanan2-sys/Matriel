import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { loginAdmin } from "../../lib/firebase";
import { toast } from "sonner";

export default function LoginModal({ isOpen, onClose, onMockLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      await loginAdmin(email, password);
      toast.success("Login efetuado com sucesso!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Erro ao fazer login. Verifique as credenciais.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-bone">
                  Acesso <span className="font-accent italic text-gold">Restrito</span>
                </h3>
                <p className="text-xs text-ash mt-1">Área exclusiva para o proprietário do site.</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-ash hover:text-bone hover:bg-white/5 transition-all"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-ash mb-2 font-semibold">
                  E-mail do Administrador
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@exemplo.com"
                    className="w-full bg-ink/40 border border-white/10 rounded-lg p-3 pl-10 text-bone text-sm placeholder:text-ash/40 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash/40" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ash mb-2 font-semibold">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha secreta"
                    className="w-full bg-ink/40 border border-white/10 rounded-lg p-3 pl-10 pr-10 text-bone text-sm placeholder:text-ash/40 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash/40" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-bone"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3 rounded-lg text-sm font-semibold bg-gold text-ink hover:bg-gold-hover transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {loading ? "Verificando..." : "Entrar como Admin"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
