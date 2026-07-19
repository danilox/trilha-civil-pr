export type TipoOficial = "oficial";

export type FonteOficial = {
  id: string;
  titulo: string;
  descricao: string;
  tipo: TipoOficial;
  documento: string;
  itemEdital: string;
  paginaPdf: number;
  fonte: string;
  urlFonte: string;
  dataConferencia: string;
  observacao?: string;
  ativo: boolean;
};

export type ModalidadeCota = "ampla" | "afrodescendente" | "pcd";
export type SexoBiologico = "masculino" | "feminino";
export type FaixaEtaria = "ate-29" | "30-39" | "40-49" | "50-mais";

export type DadoGeralEdital = FonteOficial & {
  categoria: string;
  valor: string;
};

export type EtapaOficial = FonteOficial & {
  ordem: number;
  periodo: string;
  data?: string;
  status: "concluida" | "atencao" | "prevista";
  checklist: string[];
};

export type DisciplinaProva = FonteOficial & {
  bloco: string;
  questoes: number;
  pontos: number;
};

export type RegiaoOficial = FonteOficial & {
  percentualDistribuicao: number;
  reservas: Record<Exclude<ModalidadeCota, "ampla">, number>;
  barreiras: Record<ModalidadeCota, number>;
};

export type TafIndice = FonteOficial & {
  sexo: SexoBiologico;
  ordem: number;
  exercicio: string;
  tentativas: number;
  intervaloMinutos?: number;
  criterio: string;
  indices: Record<FaixaEtaria, string>;
};

export type ExameOficial = FonteOficial & {
  categoria: string;
  finalidade: string;
  preparo: string[];
  validade: string;
  documentos: string[];
  errosDocumentais: string[];
};

export type CausaIncapacitante = FonteOficial & {
  grupo: string;
  exemplos: string[];
};

export type TituloOficial = FonteOficial & {
  tipoTitulo: string;
  pontosPorUnidade: number;
  unidade: string;
  limite: number;
  comprovacao: string;
};

export type StatusConcurso = {
  id: string;
  titulo: string;
  descricao: string;
  dataAlvo?: string;
  etapaAtualId: string;
};