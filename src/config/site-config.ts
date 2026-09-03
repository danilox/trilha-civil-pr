const productionUrl = "https://editalnocontrole.com.br";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
const publicUrl =
  configuredUrl === productionUrl || (process.env.NODE_ENV !== "production" && configuredUrl && !configuredUrl.endsWith(".vercel.app"))
    ? configuredUrl
    : productionUrl;

export const platformConfig = {
  name: "Edital no Controle",
  shortName: "Edital no Controle",
  slogan: "Do edital à nomeação, tudo sob controle.",
  description:
    "Editais, etapas, prazos, documentos, cronômetros e atualizações de concursos públicos organizados em guias visuais.",
  url: publicUrl,
  version: "0.3.0",
  institutional: {
    positioning:
      "Plataforma independente, informativa e educacional voltada ao acompanhamento de concursos públicos.",
    disclaimer:
      "Plataforma independente e não oficial. As informações são organizadas com base em editais, retificações e comunicados oficiais. Em caso de divergência, prevalece a documentação publicada pelo órgão responsável.",
  },
  social: {
    instagram: "",
    youtube: "",
    linkedin: "",
  },
  socialImage: "/opengraph-image",
} as const;

export const pcprGuideConfig = {
  name: "Guia PC-PR 2026",
  slogan: "Informação • Estratégia • Foco",
  basePath: "/concursos/pc-pr-2026",
  description:
    "Guia independente com informações organizadas sobre o concurso da Polícia Civil do Paraná, incluindo edital, etapas, regiões, exames, TAF, títulos e ferramentas de acompanhamento.",
  disclaimer:
    "Projeto independente e não oficial. Consulte sempre o edital e os canais oficiais.",
} as const;

export const guidePath = (path = "") =>
  `${pcprGuideConfig.basePath}${path === "/" ? "" : path}`;

export const siteConfig = {
  name: platformConfig.name,
  version: platformConfig.version,
  url: platformConfig.url,
  title: "Edital no Controle | Guias de concursos públicos",
  titleTemplate: `%s | ${platformConfig.name}`,
  description: platformConfig.description,
  coverImage: "/images/trilha-civil-capa.png",
  socialImage: platformConfig.socialImage,
  routes: [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/concursos", changeFrequency: "weekly", priority: 0.9 },
    { path: guidePath(), changeFrequency: "weekly", priority: 0.9 },
    { path: guidePath("/edital"), changeFrequency: "weekly", priority: 0.8 },
    { path: guidePath("/etapas"), changeFrequency: "weekly", priority: 0.8 },
    { path: guidePath("/atualizacoes"), changeFrequency: "weekly", priority: 0.8 },
    { path: guidePath("/concorrencia"), changeFrequency: "weekly", priority: 0.8 },
    { path: guidePath("/regioes"), changeFrequency: "monthly", priority: 0.7 },
    { path: guidePath("/nota-de-corte"), changeFrequency: "monthly", priority: 0.7 },
    { path: guidePath("/exames"), changeFrequency: "monthly", priority: 0.7 },
    { path: guidePath("/taf"), changeFrequency: "monthly", priority: 0.7 },
    { path: guidePath("/titulos"), changeFrequency: "monthly", priority: 0.7 },
    { path: guidePath("/dicas"), changeFrequency: "monthly", priority: 0.6 },
    { path: guidePath("/fontes"), changeFrequency: "monthly", priority: 0.6 },
    { path: "/concursos/pm-sp", changeFrequency: "monthly", priority: 0.5 },
    { path: "/concursos/pc-rs", changeFrequency: "monthly", priority: 0.5 },
    { path: "/sobre", changeFrequency: "yearly", priority: 0.5 },
    { path: "/privacidade", changeFrequency: "yearly", priority: 0.3 },
    { path: "/termos", changeFrequency: "yearly", priority: 0.3 },
  ],
} as const;
