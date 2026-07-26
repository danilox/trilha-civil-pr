const productionUrl = "https://trilha-civil-pr.vercel.app";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

export const siteConfig = {
  name: "Trilha Civil PR",
  version: "0.2.0",
  url: configuredUrl || productionUrl,
  title: "Trilha Civil PR — Guia Independente do Concurso PC-PR",
  titleTemplate: "%s | Trilha Civil PR",
  description:
    "Guia independente com informações organizadas sobre o concurso da Polícia Civil do Paraná, incluindo edital, etapas, regiões, exames, TAF, títulos e ferramentas de acompanhamento.",
  coverImage: "/images/trilha-civil-capa.png",
  socialImage: "/opengraph-image",
  routes: [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/edital", changeFrequency: "weekly", priority: 0.8 },
    { path: "/etapas", changeFrequency: "weekly", priority: 0.8 },
    { path: "/atualizacoes", changeFrequency: "weekly", priority: 0.8 },
    { path: "/regioes", changeFrequency: "monthly", priority: 0.7 },
    { path: "/nota-de-corte", changeFrequency: "monthly", priority: 0.7 },
    { path: "/exames", changeFrequency: "monthly", priority: 0.7 },
    { path: "/taf", changeFrequency: "monthly", priority: 0.7 },
    { path: "/titulos", changeFrequency: "monthly", priority: 0.7 },
    { path: "/dicas", changeFrequency: "monthly", priority: 0.6 },
    { path: "/fontes", changeFrequency: "monthly", priority: 0.6 },
    { path: "/sobre", changeFrequency: "yearly", priority: 0.5 },
    { path: "/privacidade", changeFrequency: "yearly", priority: 0.3 },
    { path: "/termos", changeFrequency: "yearly", priority: 0.3 },
  ],
} as const;
