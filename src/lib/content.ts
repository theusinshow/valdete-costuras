/**
 * Valdete Costuras — content config (single source of copy + placeholders).
 * Edit real values here. Placeholders in [BRACKETS] must be replaced before
 * production launch — see /docs/ai/CONTENT_PENDING.md.
 */

export const site = {
  name: "Valdete Costuras",
  slogan: "[SLOGAN]", // optional brand line — CNT-008
  // WhatsApp number in international format, digits only: 55DDNNNNNNNNN — CNT-001
  whatsapp: "[WHATSAPP]",
  location: {
    neighborhoodCity: "[BAIRRO/CIDADE]", // CNT-002
    address: "[ENDERECO]", // CNT-002
    hours: "[HORARIO]", // CNT-003
    mapsUrl: "", // optional Google Maps link/embed
  },
  yearsExperience: "[ANOS]", // CNT-004
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
  eyebrow: "Ateliê de costura",
  title: "Ajustes e consertos de roupa, rápido e bem feito",
  subtitle:
    "Em [BAIRRO/CIDADE]. [ANOS] anos de experiência em costura, com atendimento próximo e preço justo.",
  ctaLabel: "Falar no WhatsApp",
  reassurance: "Atendimento pessoal · orçamento na hora",
} as const;

// Primary offer — alterations & repairs (CNT-005: confirm real services)
export const services = [
  { title: "Bainhas", short: "Calças, saias e vestidos no comprimento certo." },
  { title: "Ajuste de peças", short: "Apertar, alargar e ajustar ao corpo." },
  { title: "Troca de zíper", short: "Zíper novo em calças, jaquetas e vestidos." },
  { title: "Consertos", short: "Rasgos, costuras soltas e reparos em geral." },
  { title: "Botões e barras", short: "Pregar botões, refazer barras e acabamentos." },
  { title: "Reformas", short: "Transformar e renovar peças que você gosta." },
] as const;

// 4 trust pillars (the differentiators — DEC-005)
export const pillars = [
  {
    title: "Experiência",
    short: "[ANOS] anos costurando, com técnica e cuidado em cada peça.",
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
  eyebrow: "Para empresas",
  title: "Uniformes e costura para o seu negócio",
  short:
    "Produção, ajustes e conserto de uniformes em volume, com padrão e prazo confiáveis.",
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

// Empty until real content arrives (CNT-006 / CNT-007) — render "em breve".
export const gallery: { src: string; alt: string }[] = [];
export const testimonials: { quote: string; author: string }[] = [];
