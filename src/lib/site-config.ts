export const siteConfig = {
  name: "Trilha Civil PR",
  version: "0.1.0",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  title: "Trilha Civil PR — Guia independente do concurso",
  description:
    "Informações organizadas sobre etapas, regiões, exames, TAF, títulos e projeções demonstrativas do concurso da Polícia Civil do Paraná.",
  routes: [
    "/",
    "/etapas",
    "/regioes",
    "/nota-de-corte",
    "/exames",
    "/taf",
    "/titulos",
    "/dicas",
    "/fontes",
    "/atualizacoes",
    "/privacidade",
    "/termos",
    "/sobre",
  ],
};
