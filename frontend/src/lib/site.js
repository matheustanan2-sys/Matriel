// Central brand + content data for Matriel Studio

export const WHATSAPP_NUMBER = "553399988211"; // 33 99988-211
export const INSTAGRAM = "matriel.studio";
export const EMAIL = "contato@matrielstudio.com.br";
export const LOCATION = "Itaobim - MG";

export function waLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const NAV = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
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
    title: "Criação de Sites Profissionais",
    text: "Sites modernos e rápidos para apresentar sua empresa com autoridade e credibilidade.",
    tags: ["Institucional", "Responsivo", "SEO básico"],
  },
  {
    num: "02",
    title: "Sites para Lojas e Mercados",
    text: "Catálogo de produtos, promoções e contato rápido — tudo pronto para vender.",
    tags: ["Catálogo", "Promoções", "WhatsApp"],
  },
  {
    num: "03",
    title: "Landing Pages de Venda",
    text: "Páginas focadas em conversão, criadas para transformar visitantes em clientes.",
    tags: ["Conversão", "Campanhas", "Alta velocidade"],
  },
  {
    num: "04",
    title: "Manutenção e Atualizações",
    text: "Alterações, melhorias e suporte contínuo para o seu site nunca parar no tempo.",
    tags: ["Suporte", "Melhorias", "Segurança"],
  },
];

export const STEPS = [
  { num: "01", title: "Conversamos sobre seu negócio", text: "Entendemos seus objetivos, público e o que torna sua empresa única." },
  { num: "02", title: "Criamos o projeto visual", text: "Desenhamos a identidade e o layout — você aprova antes de tudo." },
  { num: "03", title: "Desenvolvemos o site", text: "Construímos um site rápido, responsivo e otimizado para o Google." },
  { num: "04", title: "Publicamos e acompanhamos", text: "Colocamos no ar e acompanhamos os resultados para seguir evoluindo." },
];

export const BENEFITS = [
  "Mais confiança para os seus clientes",
  "Aparecer no Google quando procurarem por você",
  "Mostrar produtos e serviços 24 horas por dia",
  "Facilitar pedidos direto pelo WhatsApp",
  "Passar uma imagem profissional e consolidada",
];

export const PORTFOLIO = [
  {
    tag: "Supermercado",
    title: "Mercado Central",
    text: "Catálogo digital com ofertas da semana e pedidos pelo WhatsApp.",
    img: "https://images.unsplash.com/photo-1760463921642-eef64776c3bf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHByb2R1Y2UlMjBtb2Rlcm4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    tag: "Loja de Roupas",
    title: "Ateliê Vitrine",
    text: "Vitrine online elegante com coleções e botão de compra rápida.",
    img: "https://images.pexels.com/photos/5531709/pexels-photo-5531709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    tag: "Restaurante",
    title: "Sabor & Casa",
    text: "Cardápio digital, reservas e localização integrada em um só lugar.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    tag: "Empresa de Serviços",
    title: "Clínica Bem Viver",
    text: "Site institucional com agendamento e apresentação da equipe.",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGFwdG9wJTIwc21hcnRwaG9uZSUyMG1vY2t1cCUyMGRhcmt8ZW58MHx8fHwxNzg1NjE3ODc1fDA&ixlib=rb-4.1.0&q=85",
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
