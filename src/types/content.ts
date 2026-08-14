import type { LucideIcon } from "lucide-react";

export type TipoInformacao = "oficial" | "estimativa" | "demonstracao";

export type InformacaoBase = {
  id?: string;
  titulo?: string;
  descricao?: string;
  tipo: TipoInformacao;
  fonte?: string;
  urlFonte?: string;
  dataAtualizacao?: string;
  observacao?: string;
  ativo?: boolean;
};

export type EtapaConcurso = InformacaoBase & {
  id: string;
  ordem: number;
  titulo: string;
  periodo: string;
  status: "concluida" | "atencao" | "prevista" | "prorrogado";
  descricao: string;
  checklist: string[];
};

export type Regiao = InformacaoBase & {
  id: string;
  nome: string;
  vagas: number;
  inscritosEstimados: number;
  concorrencia: number;
};

export type Projecao = InformacaoBase & {
  id: string;
  cargo: string;
  notaMinima: number;
  notaProvavel: number;
  notaCompetitiva: number;
};

export type Exame = InformacaoBase & {
  id: string;
  titulo: string;
  resumo: string;
  finalidade: string;
  preparo: string[];
  validade: string;
  errosDocumentais: string[];
  icon?: LucideIcon;
};

export type TafItem = InformacaoBase & {
  id: string;
  titulo: string;
  regras: string[];
  documentos: string[];
  motivosEliminacao: string[];
};

export type TituloItem = InformacaoBase & {
  id: string;
  tipoTitulo: string;
  pontuacao: string;
  limite: string;
  comprovacao: string;
};

export type Dica = InformacaoBase & {
  id: string;
  titulo: string;
  descricao: string;
  categoria: "documentos" | "deslocamento" | "prazo" | "saude" | "convocacao";
};

export type LocalExame = InformacaoBase & {
  id: string;
  nome: string;
  cidade: string;
  regiao: string;
  categoria: string;
  endereco: string;
  telefone: string;
  site: string;
  servicosOferecidos: string[];
  verificadoEm: string;
  patrocinado: boolean;
};

export type PainelItem = {
  id: string;
  titulo: string;
  detalhe: string;
};

export type FonteRegistro = InformacaoBase & {
  id: string;
  informacao: string;
  classificacao: TipoInformacao;
  dataPublicacao: string;
  dataConferencia: string;
};




export type AtualizacaoPortal = InformacaoBase & {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
  responsavelConferencia: string;
  versaoPortal: string;
};
