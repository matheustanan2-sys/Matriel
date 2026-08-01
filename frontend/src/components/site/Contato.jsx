import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Instagram, MapPin, ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { waLink, INSTAGRAM, LOCATION, EMAIL } from "../../lib/site";
import { Logo } from "./Header";

const SEGMENTS = [
  "Supermercado / Mercado",
  "Loja de Roupas",
  "Restaurante / Lanchonete",
  "Clínica / Consultório",
  "Prestador de Serviços",
  "Outro",
];

export default function Contato() {
  const [form, setForm] = useState({ name: "", segment: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Por favor, informe o seu nome.");
      return;
    }
    const msg =
      `Olá, Matriel Studio! Gostaria de solicitar um orçamento.%0A%0A` +
      `Nome: ${form.name}%0A` +
      `Segmento: ${form.segment || "Não informado"}%0A` +
      `Telefone: ${form.phone || "Não informado"}%0A` +
      `Mensagem: ${form.message || "—"}`;
    toast.success("Abrindo o WhatsApp para enviar seu orçamento...");
    window.open(waLink(decodeURIComponent(msg)), "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full bg-transparent border-b border-white/15 py-3 text-bone placeholder:text-ash/60 focus:border-gold focus:outline-none transition-colors duration-300";

  return (
    <section id="contato" className="pt-24 md:pt-40 scroll-mt-20" data-testid="contato-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left — invitation */}
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.28em] text-gold mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" /> Contato
            </p>
            <Reveal>
              <h2 className="font-heading text-5xl md:text-7xl font-semibold tracking-tight leading-[0.9] text-bone">
                Vamos colocar sua empresa na <span className="font-accent italic font-normal text-gold">internet</span>?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg text-ash leading-relaxed max-w-md">
                Conte um pouco sobre o seu negócio. Respondemos rápido pelo WhatsApp
                com um orçamento sem compromisso.
              </p>
            </Reveal>

            <div className="mt-12 space-y-5">
              <a
                href={waLink("Olá! Gostaria de conversar com a Matriel Studio.")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp"
                className="group flex items-center gap-4 text-bone hover:text-gold transition-colors duration-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 group-hover:border-gold transition-colors duration-300">
                  <MessageCircle size={18} />
                </span>
                <span>WhatsApp · (33) 9998-8211</span>
              </a>
              <a
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-instagram"
                className="group flex items-center gap-4 text-bone hover:text-gold transition-colors duration-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 group-hover:border-gold transition-colors duration-300">
                  <Instagram size={18} />
                </span>
                <span>@{INSTAGRAM}</span>
              </a>
              <div className="flex items-center gap-4 text-bone">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
                  <MapPin size={18} />
                </span>
                <span>{LOCATION}</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <form
                onSubmit={handleSubmit}
                className="rounded-lg border border-white/10 bg-surface p-8 md:p-10 space-y-8"
                data-testid="orcamento-form"
              >
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-ash">Seu nome</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Como podemos te chamar?"
                    className={field}
                    data-testid="form-name"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-ash">Segmento do negócio</label>
                  <Select value={form.segment} onValueChange={(v) => setForm({ ...form, segment: v })}>
                    <SelectTrigger
                      className="mt-1 w-full bg-transparent border-0 border-b border-white/15 rounded-none px-0 py-3 text-bone focus:ring-0 focus:border-gold data-[placeholder]:text-ash/60"
                      data-testid="form-segment"
                    >
                      <SelectValue placeholder="Selecione o seu segmento" />
                    </SelectTrigger>
                    <SelectContent className="bg-elevated border-white/10 text-bone">
                      {SEGMENTS.map((s) => (
                        <SelectItem key={s} value={s} className="focus:bg-gold focus:text-ink">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-ash">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className={field}
                    data-testid="form-phone"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-ash">Sobre o seu projeto</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Conte o que a sua empresa precisa..."
                    className={`${field} resize-none`}
                    data-testid="form-message"
                  />
                </div>

                <button
                  type="submit"
                  data-testid="form-submit"
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-ink transition-all duration-300 hover:bg-gold-hover active:scale-[0.98]"
                >
                  Enviar pelo WhatsApp
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 md:mt-40 border-t border-white/10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          <p className="text-sm text-ash text-center">
            © {new Date().getFullYear()} Matriel Studio · Sites profissionais em {LOCATION}
          </p>
          <a href={`mailto:${EMAIL}`} className="text-sm text-ash hover:text-gold transition-colors">
            {EMAIL}
          </a>
        </footer>
      </div>
    </section>
  );
}
