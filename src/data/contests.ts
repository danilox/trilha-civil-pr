import type { Contest } from "@/types/contest";
import { inscricoesEProva, URL_FONTE_FGV, DATA_ULTIMA_ATUALIZACAO_OFICIAL } from "@/data/edital";
import { pcprRecentUpdates } from "@/data/pcpr-updates";
import { additionalContests } from "@/data/contests-national";
export type { Contest, ContestStatus, ContestCategory } from "@/types/contest";
export const pendingConfirmation = "Aguardando confirmação oficial";
export const plannedContestSections = ["Visão geral", "Edital", "Cargos", "Cronograma", "Prova", "TAF", "Resultados", "Fontes oficiais"] as const;

export const contests: Contest[] = [{
  slug: "pc-pr-2026", nome: "Polícia Civil do Paraná", sigla: "PC-PR 2026", titulo: "Concurso PC-PR 2026",
  estado: "Paraná", categoria: "Polícia Civil", status: "prova-proxima", faseAtual: "Preparação para a prova objetiva",
  banca: "FGV", cargos: ["Agente de Polícia Judiciária", "Delegado de Polícia", "Papiloscopista Policial"],
  vagas: "Cadastro de reserva", inscricoesInicio: inscricoesEProva.inscricoesInicio, inscricoesFim: inscricoesEProva.inscricoesFim,
  dataProva: inscricoesEProva.provaData, fonteOficial: URL_FONTE_FGV, ultimaAtualizacao: DATA_ULTIMA_ATUALIZACAO_OFICIAL,
  descricao: "Guia completo com edital, etapas, ferramentas do candidato e Radar de Concorrência para Agente.",
  destaque: "Guia de referência", href: "/concursos/pc-pr-2026", proximoEvento: "Local de prova previsto a partir de 05/10/2026",
  sources: [{ type: "edital", title: "Edital retificado e publicações FGV", url: URL_FONTE_FGV, consultedAt: "2026-09-22", official: true }],
  events: pcprRecentUpdates.map(item => ({ date: item.data, type: item.data === "2026-09-14" ? "resultado" : "comunicado", title: item.titulo, summary: item.descricao, sourceUrl: item.urlFonte! })),
  modules: [],
}, ...additionalContests];
export function getContest(slug: string) { return contests.find(contest => contest.slug === slug); }
