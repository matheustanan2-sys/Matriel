// Central brand + content data for Matriel Studio

export const WHATSAPP_NUMBER = "5533999888211"; // +55 33 99988-8211
export const INSTAGRAM = "matrielstudio";
export const EMAIL = "contato@matrielstudio.com.br";
export const LOCATION = "Itaobim - MG";

export function waLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const NAV = [
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Oferta", href: "#oferta" },
  { label: "Contato", href: "#contato" },
];

export const HOURS = "Seg a Sex · 8h às 18h";

export const STATS = [
  { value: "4.9", label: "Avaliação média" },
  { value: "48h", label: "Primeira entrega" },
];

export const CLIENTS = [
  "Mercado Central", "Ateliê Vitrine", "Sabor & Casa",
  "Clínica Bem Viver", "Auto Peças Vale", "Padaria Trigo Dourado",
];

export const OFFER = {
  tag: "Oferta de lançamento",
  title: "Os primeiros 5 clientes garantem condições exclusivas",
  perks: [
    "20% de desconto no seu projeto",
    "Atendimento prioritário e dedicado",
    "Entrega acelerada em até 7 dias",
  ],
  note: "Vagas limitadas — condição válida apenas para os próximos contratos.",
};

export const WHATS_MSGS = [
  { name: "Rafael · Mercado Central", text: "O site ficou incrível! Já recebemos pedidos pelo WhatsApp no mesmo dia 🙌", time: "09:42" },
  { name: "Juliana · Ateliê Vitrine", text: "Minhas clientes elogiaram muito. Ficou com a nossa cara mesmo ❤️", time: "14:18" },
  { name: "Marcos · Sabor & Casa", text: "O cardápio online facilitou demais as reservas. Recomendo!", time: "20:05" },
];

export const VALUES = [
  { title: "Profissionalismo", text: "Cada projeto tratado com rigor, prazo e cuidado de agência." },
  { title: "Criatividade", text: "Identidade própria — nada de modelos genéricos e repetidos." },
  { title: "Resultado", text: "Sites pensados para atrair clientes e gerar vendas de verdade." },
  { title: "Proximidade", text: "Atendimento próximo, humano e feito para quem é de Itaobim." },
];

export const SERVICES = [
  {
    num: "01",
    icon: "Globe",
    title: "Criação de Sites Profissionais",
    text: "Site moderno que apresenta sua empresa com autoridade.",
    benefit: "Mais credibilidade e confiança logo no primeiro clique.",
    tags: ["Institucional", "Responsivo", "SEO"],
  },
  {
    num: "02",
    icon: "ShoppingBag",
    title: "Sites para Lojas e Mercados",
    text: "Catálogo de produtos, promoções e contato rápido.",
    benefit: "Seus produtos vendendo 24h, direto no WhatsApp.",
    tags: ["Catálogo", "Promoções", "WhatsApp"],
  },
  {
    num: "03",
    icon: "Target",
    title: "Landing Pages de Venda",
    text: "Páginas focadas em transformar visitantes em clientes.",
    benefit: "Mais orçamentos e contatos vindos das suas campanhas.",
    tags: ["Conversão", "Campanhas", "Rápida"],
  },
  {
    num: "04",
    icon: "Wrench",
    title: "Manutenção e Suporte",
    text: "Alterações, melhorias e acompanhamento contínuo.",
    benefit: "Seu site sempre atualizado, seguro e no ar.",
    tags: ["Suporte", "Segurança", "Melhorias"],
  },
];

export const STEPS = [
  { num: "01", title: "Conversamos sobre seu negócio", text: "Entendemos seus objetivos, público e o que torna sua empresa única." },
  { num: "02", title: "Criamos o projeto visual", text: "Desenhamos a identidade e o layout — você aprova antes de tudo." },
  { num: "03", title: "Desenvolvemos o site", text: "Construímos um site rápido, responsivo e otimizado para o Google." },
  { num: "04", title: "Publicamos e acompanhamos", text: "Colocamos no ar e acompanhamos os resultados para seguir evoluindo." },
];

export const BENEFITS = [
  { icon: "Zap", metric: "-90%", title: "Sites rápidos", text: "Carregamento otimizado que não faz o cliente esperar." },
  { icon: "Smartphone", metric: "100%", title: "Responsivo", text: "Perfeito no celular, tablet e computador." },
  { icon: "ShieldCheck", metric: "SSL", title: "Segurança reforçada", text: "Certificado e proteção de dados inclusos." },
  { icon: "MessageCircle", metric: "1-clique", title: "Integração WhatsApp", text: "O cliente fala com você em um toque." },
  { icon: "Search", metric: "Top Google", title: "SEO otimizado", text: "Sua empresa encontrada por quem procura." },
  { icon: "LayoutDashboard", metric: "Fácil", title: "Painel administrativo", text: "Você mesmo atualiza textos e fotos." },
  { icon: "Server", metric: "99.9%", title: "Hospedagem estável", text: "Seu site no ar o tempo todo, sem quedas." },
  { icon: "Gauge", metric: "A+", title: "Performance otimizada", text: "Nota alta em velocidade e experiência." },
];

export const PORTFOLIO = [
  {
    category: "Supermercado",
    title: "Mercado Central",
    description: "Site com catálogo de produtos e pedidos online, focado em aumentar as vendas pelo WhatsApp.",
    link: "https://wa.me/5533999888211",
    image: "https://images.unsplash.com/photo-1760463921642-eef64776c3bf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHByb2R1Y2UlMjBtb2Rlcm4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    category: "Loja de Roupas",
    title: "Ateliê Vitrine",
    description: "Vitrine digital elegante para mostrar coleções e atrair clientes para a loja física.",
    link: "https://wa.me/5533999888211",
    image: "https://images.pexels.com/photos/5531709/pexels-photo-5531709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    category: "Restaurante",
    title: "Sabor & Casa",
    description: "Cardápio digital moderno com sistema de reservas online integrado.",
    link: "https://wa.me/5533999888211",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    category: "Empresa de Serviços",
    title: "Clínica Bem Viver",
    description: "Site institucional com agendamentos online para gerar autoridade e novos pacientes.",
    link: "https://wa.me/5533999888211",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGFwdG9wJTIwc21hcnRwaG9uZSUyMG1vY2t1cCUyMGRhcmt8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85",
  },
];

export const TESTIMONIALS = [
  {
    quote: "O site ajudou nossa empresa a ter uma presença muito mais profissional e facilitou o contato com nossos clientes. As vendas pelo WhatsApp aumentaram bastante.",
    name: "Rafael Andrade",
    role: "Proprietário, Mercado Central",
  },
  {
    quote: "Atendimento próximo do começo ao fim. Eles entenderam exatamente o que a minha loja precisava e o resultado ficou lindo.",
    name: "Juliana Prado",
    role: "Ateliê Vitrine",
  },
  {
    quote: "Nosso restaurante finalmente tem um cardápio online que os clientes adoram. Ficou moderno e muito fácil de usar.",
    name: "Marcos Bittencourt",
    role: "Sabor & Casa",
  },
  {
    quote: "Profissionais de verdade. O site passou a confiança que a nossa clínica precisava e hoje recebemos agendamentos pela internet.",
    name: "Dra. Camila Ferreira",
    role: "Clínica Bem Viver",
  },
];

export const HERO_MOCKUP = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGFwdG9wJTIwc21hcnRwaG9uZSUyMG1vY2t1cCUyMGRhcmt8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85";
