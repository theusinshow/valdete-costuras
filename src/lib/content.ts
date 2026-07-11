/**
 * Valdete Costuras — content config (single source of copy + placeholders).
 * Edit real values here. Placeholders in [BRACKETS] must be replaced before
 * production launch — see /docs/ai/CONTENT_PENDING.md.
 */

export const site = {
  name: "Valdete Costuras",
  slogan: "Sua roupa no ponto certo.", // CNT-008
  // WhatsApp number in international format, digits only: 55DDNNNNNNNNN — CNT-001
  whatsapp: "5548988106584",
  location: {
    neighborhoodCity: "Palhoça - SC", // CNT-002
    address: "R. Pref. Reinoldo Alves, 1348 - Palhoça/SC", // CNT-002
    hours: "Seg a Sex, 08:00 às 12:00 e 13:30 às 18:00", // CNT-003
    mapsUrl:
      "https://www.google.com/maps/dir/-27.6131762,-48.6698411/Valdete+Costuras,+R.+Pref.+Reinoldo+Alves,+1348+-+Passa+Vinte,+Palho%C3%A7a+-+SC,+88132-001/@-27.6238423,-48.6695407,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x95273523b13e94d3:0x35003fdf7595a042!2m2!1d-48.674661!2d-27.6349936?entry=ttu",
  },
  yearsExperience: "+30", // CNT-004
  // Hero image — CNT-009. Drop a real atelier photo at /public/hero-atelie.jpg and
  // set this to "/hero-atelie.jpg" (a real photo of Valdete / hands / the atelier
  // beats stock). Null = show the stitched monogram fallback panel.
  heroImage: null as string | null,
} as const;

export const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Empresas", href: "#empresas" },
  { label: "Localização", href: "#localizacao" },
] as const;

export const hero = {
  title: "Ajustes e consertos de roupa, rápido e bem feito",
  subtitle:
    "Em Palhoça - SC, +30 anos de experiência em costura, com atendimento próximo e preço justo.",
  ctaLabel: "Falar no WhatsApp",
  reassurance: "Atendimento pessoal · orçamento na hora",
} as const;

// Primary offer — alterations & repairs (CNT-005: confirm real services)
// image: drop the downloaded photo at /public/servicos/<file> — until it exists,
// the Services section shows a graceful placeholder (no broken image). CNT-010.
export const services = [
  {
    title: "Bainhas",
    short: "Calças, saias e vestidos no comprimento certo.",
    image: "/servicos/bainhas.avif",
    alt: "Barra de calça sendo ajustada na máquina de costura",
  },
  {
    title: "Ajuste de peças",
    short: "Apertar, alargar e ajustar ao corpo.",
    image: "/servicos/ajuste-de-pecas.webp",
    alt: "Peça de roupa marcada com alfinetes para ajuste ao corpo",
  },
  {
    title: "Troca de zíper",
    short: "Zíper novo em calças, jaquetas e vestidos.",
    image: "/servicos/troca-de-ziper.webp",
    alt: "Zíper novo sendo costurado em uma peça de roupa",
  },
  {
    title: "Consertos",
    short: "Rasgos, costuras soltas e reparos em geral.",
    image: "/servicos/consertos.webp",
    alt: "Conserto de costura em tecido na máquina",
  },
  {
    title: "Botões e barras",
    short: "Pregar botões, refazer barras e acabamentos.",
    image: "/servicos/botoes-e-barras.webp",
    alt: "Botão sendo pregado à mão em uma camisa",
  },
  {
    title: "Reformas",
    short: "Transformar e renovar peças que você gosta.",
    image: "/servicos/reformas.webp",
    alt: "Peça de roupa sendo reformada no ateliê de costura",
  },
] as const;

// 4 trust pillars (the differentiators — DEC-005)
export const pillars = [
  {
    title: "Experiência",
    short: "+30 anos costurando, com técnica e cuidado em cada peça.",
  },
  {
    title: "Rapidez",
    short: "Prazos curtos. Muitos ajustes ficam prontos no mesmo dia.",
  },
  {
    title: "Atendimento pessoal",
    short: "Você fala direto com a Valdete, sem intermediários.",
  },
  {
    title: "Preço justo",
    short: "Valores honestos para o serviço do dia a dia.",
  },
] as const;

export const howItWorks = [
  {
    step: "1",
    title: "Traga a peça",
    short: "Você traz a roupa e explica o que precisa.",
  },
  {
    step: "2",
    title: "Orçamento na hora",
    short: "Avaliamos juntos e passamos preço e prazo na hora.",
  },
  {
    step: "3",
    title: "Pronto rápido",
    short: "A peça fica pronta no prazo combinado, bem feita.",
  },
] as const;

// Secondary offer — uniforms / companies (B2B)
export const companies = {
  eyebrow: "Trabalho para empresas",
  title: "Uniformes e costura para o seu negócio",
  short:
    "Para empresas: produção, ajuste e conserto de uniformes em volume, com padrão e prazo confiáveis e atendimento recorrente.",
  points: [
    "Uniformes e peças sob demanda",
    "Ajustes e consertos em quantidade",
    "Atendimento recorrente para empresas",
  ],
  ctaLabel: "Orçamento para empresas",
} as const;

export const finalCta = {
  title: "Precisa de um ajuste? Fale agora.",
  short: "Mande uma mensagem no WhatsApp e resolva sua roupa hoje.",
  ctaLabel: "Falar no WhatsApp",
} as const;

// Empty until real content arrives (CNT-007) — while empty, the section shows
// a warm invitation to leave a depoimento via WhatsApp instead of skeletons.
export const testimonials: { quote: string; author: string }[] = [
  {
    quote:
      "Levo minhas roupas pra Valdete há anos. Faz a bainha certinha e sempre no prazo. Nunca me decepcionou.",
    author: "Carma",
  },
  {
    quote:
      "Precisei apertar um vestido em cima da hora e ela resolveu no mesmo dia. Ficou perfeito, como se fosse feito pra mim.",
    author: "Rosilda",
  },
  {
    quote:
      "Atendimento de primeira. A Valdete conversa, entende o que você quer, e o preço é justo. Recomendo muito.",
    author: "Nicélia",
  },
  {
    quote:
      "Troquei o zíper de duas jaquetas e ficou impecável. Trabalho caprichado e pessoa ótima de lidar.",
    author: "João",
  },
];

export const testimonialsInvite = {
  title: "Sua roupa já passou por aqui?",
  short:
    "Conte como foi pelo WhatsApp — seu depoimento aparece aqui e ajuda outros clientes a conhecerem o trabalho da Valdete.",
  ctaLabel: "Deixar meu depoimento",
} as const;
