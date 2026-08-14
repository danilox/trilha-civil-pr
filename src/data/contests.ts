import { guidePath } from "@/config/site-config";

export type ContestStatus =
  | "disponivel"
  | "em-construcao"
  | "previsto"
  | "encerrado";

export type ContestCategory =
  | "Polícia Civil"
  | "Polícia Militar"
  | "Polícia Penal";

export interface Contest {
  slug: string;
  nome: string;
  sigla: string;
  titulo: string;
  estado: string;
  categoria: ContestCategory;
  status: ContestStatus;
  banca?: string;
  cargo?: string;
  dataProva?: string;
  descricao: string;
  destaque: string;
  href: string;
  atualizadoEm?: string;
  enabledSections?: string[];
}

export const plannedContestSections = [
  "Visão geral",
  "Edital organizado",
  "Cargos e requisitos",
  "Cronograma",
  "Etapas",
  "Prova objetiva",
  "TAF",
  "Exames",
  "Investigação social",
  "Documentos",
  "Atualizações",
] as const;

export const contests: Contest[] = [
  {
    slug: "pc-pr-2026",
    nome: "Polícia Civil do Paraná",
    sigla: "PC-PR 2026",
    titulo: "Concurso PC-PR 2026",
    estado: "Paraná",
    categoria: "Polícia Civil",
    status: "disponivel",
    descricao:
      "Guia completo com edital organizado, etapas, regiões, exames, TAF, títulos e ferramentas locais de acompanhamento.",
    destaque: "Guia disponível",
    href: guidePath(),
    enabledSections: [
      "edital",
      "etapas",
      "regioes",
      "nota-de-corte",
      "exames",
      "taf",
      "titulos",
      "dicas",
      "fontes",
      "atualizacoes",
    ],
  },
  {
    slug: "pm-sp",
    nome: "Polícia Militar do Estado de São Paulo",
    sigla: "PM-SP",
    titulo: "Projeto PM-SP",
    estado: "São Paulo",
    categoria: "Polícia Militar",
    status: "em-construcao",
    descricao:
      "Estrutura inicial preparada para receber informações oficiais após conferência documental.",
    destaque: "Em construção",
    href: "/concursos/pm-sp",
  },
  {
    slug: "pc-rs",
    nome: "Polícia Civil do Rio Grande do Sul",
    sigla: "PC-RS",
    titulo: "Projeto PC-RS",
    estado: "Rio Grande do Sul",
    categoria: "Polícia Civil",
    status: "em-construcao",
    descricao:
      "Estrutura inicial preparada para receber informações oficiais após conferência documental.",
    destaque: "Em construção",
    href: "/concursos/pc-rs",
  },
];

export function getContest(slug: string) {
  return contests.find((contest) => contest.slug === slug);
}
