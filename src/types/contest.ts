export type ContestStatus = "inscricoes-abertas" | "inscricoes-encerradas" | "prova-proxima" | "pos-prova" | "taf" | "resultado" | "em-andamento" | "previsto" | "encerrado";
export type ContestCategory = "Polícia Civil" | "Polícia Militar" | "Polícia Penal" | "Polícia Científica" | "Bombeiros" | "Polícia Federal" | "Polícia Rodoviária Federal" | "Guarda Municipal";
export type PublicationType = "edital" | "retificacao" | "inscricao" | "pagamento" | "local-prova" | "prova" | "gabarito" | "resultado" | "recurso" | "taf" | "convocacao" | "nomeacao" | "comunicado";
export interface ContestSource {
  type: PublicationType;
  title: string;
  url: string;
  publishedAt?: string;
  consultedAt: string;
  official: true;
}
export interface ContestEvent {
  date: string;
  type: PublicationType;
  title: string;
  summary: string;
  sourceUrl: string;
}
export type ContestModuleId = "edital" | "cargos" | "requisitos" | "cronograma" | "inscricoes" | "prova" | "taf" | "exames" | "investigacao-social" | "titulos" | "resultados" | "documentos";
export interface ContestModule {
  id: ContestModuleId;
  title: string;
  text: string;
  sourceUrl?: string;
}
export interface Contest {
  slug: string;
  nome: string;
  sigla: string;
  titulo: string;
  estado: string;
  categoria: ContestCategory;
  status: ContestStatus;
  faseAtual: string;
  banca?: string;
  cargos: string[];
  escolaridade?: string;
  vagas?: string;
  salarioInicial?: string;
  inscricoesInicio?: string;
  inscricoesFim?: string;
  dataProva?: string;
  fonteOficial: string;
  ultimaAtualizacao: string;
  descricao: string;
  destaque: string;
  href: string;
  proximoEvento: string;
  sources: ContestSource[];
  events: ContestEvent[];
  modules: ContestModule[];
}
