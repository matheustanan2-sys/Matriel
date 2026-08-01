# Matriel Studio — Site Institucional (Agência Web)

## Problem Statement
Site profissional para "Matriel Studio", agência de criação de sites para empresas, lojas,
supermercados e comércios de Itaobim - MG. Deve transmitir confiança e profissionalismo,
com estética de agência real (não genérica de IA). Público: supermercados, lojas de roupa,
restaurantes, clínicas, pequenos negócios locais.

## User Choices (confirmed)
- Orçamento: enviado via WhatsApp (número 33 99988-211 -> wa.me/553399988211). Sem banco de dados.
- Logo: marca tipográfica "Matriel Studio" criada.
- Paleta: Preto + Branco + dourado/âmbar (#D4AF37). Tema escuro premium ("Editorial Dark").
- Idioma: Português (BR).

## Architecture
- Frontend-only (React 19 + Tailwind). Backend NÃO utilizado (formulário abre WhatsApp).
- Motion: framer-motion (hero masked reveal, scroll reveals, parallax) + Lenis (smooth scroll)
  + react-fast-marquee (marquee editorial).
- Fontes: Clash Display (títulos, Fontshare), Cormorant Garamond (itálico), Manrope (corpo).
- Grain overlay global; tema dark #050505.

## Implemented (2026-08-01)
- Preloader kinético com nome da marca.
- Header fixo glassmorphism + nav + menu mobile.
- Hero: revelação linha-a-linha, mockup com parallax, 2 CTAs (WhatsApp / ver serviços).
- Marquee editorial ("SUA EMPRESA MERECE UMA PRESENÇA DIGITAL PROFISSIONAL").
- Sobre (história + 4 valores), Serviços (4 cards), Como Funciona (4 etapas numeradas),
  Benefícios (5 itens + CTA), Portfólio (4 projetos com fotos), Depoimentos (4), Contato (form -> WhatsApp) + footer.
- SEO básico (title, meta description, og tags, lang pt-BR).
- Verificado: CTAs WhatsApp corretos, form abre WhatsApp com mensagem preenchida, imagens carregam, sem overflow horizontal.

## Files
- src/App.js (Lenis + preloader + composição)
- src/lib/site.js (conteúdo + waLink helper)
- src/components/site/*.jsx (Header, Hero, EditorialMarquee, Sobre, Servicos, ComoFunciona, Beneficios, Portfolio, Depoimentos, Contato, motion)

## Backlog / Next
- P1: Página de Portfólio detalhada por projeto; galeria com estudos de caso reais.
- P2: Blog/SEO de conteúdo local; integração de e-mail (Resend) opcional para leads.
- P2: Painel admin de leads caso queira sair do fluxo 100% WhatsApp.
