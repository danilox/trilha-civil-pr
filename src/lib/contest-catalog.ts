import type { Contest, ContestStatus } from "@/types/contest";

export const contestStatusLabels: Record<ContestStatus, string> = {
  "inscricoes-abertas": "Inscrições abertas", "inscricoes-encerradas": "Inscrições encerradas",
  "prova-proxima": "Prova próxima", "pos-prova": "Pós-prova", taf: "TAF", resultado: "Resultados",
  "em-andamento": "Em andamento", previsto: "Previsto", encerrado: "Encerrado",
};
export const contestCategories = ["Polícia Civil", "Polícia Militar", "Polícia Penal", "Polícia Científica", "Bombeiros"];
export type CatalogFilters = { categoria?: string; situacao?: string; estado?: string };

// Only advance date-based stages that were explicitly supported by a schedule.
// Never infer a result, a TAF or the closing of a contest from elapsed time.
export function getContestStatus(contest: Contest, date = new Date()): ContestStatus {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  if (contest.status === "inscricoes-abertas") {
    if (contest.inscricoesInicio && today < contest.inscricoesInicio.slice(0, 10)) return "em-andamento";
    if (contest.inscricoesFim && today > contest.inscricoesFim.slice(0, 10)) {
      if (!contest.dataProva) return "inscricoes-encerradas";
      return today <= contest.dataProva.slice(0, 10) ? "prova-proxima" : "pos-prova";
    }
  }
  if (contest.status === "prova-proxima" && contest.dataProva && today > contest.dataProva.slice(0, 10)) return "pos-prova";
  return contest.status;
}

export function filterContests(contests: Contest[], filters: CatalogFilters, date = new Date()) {
  return contests.filter(contest => (!filters.categoria || contest.categoria === filters.categoria)
    && (!filters.situacao || getContestStatus(contest, date) === filters.situacao)
    && (!filters.estado || contest.estado === filters.estado));
}

export function getUpcomingExams(contests: Contest[], date = new Date()) {
  return contests.filter(contest => contest.dataProva && new Date(contest.dataProva.length === 10 ? contest.dataProva + "T23:59:59-03:00" : contest.dataProva) >= date)
    .sort((a, b) => a.dataProva!.localeCompare(b.dataProva!));
}


const statusPriority: Record<ContestStatus, number> = {
  "inscricoes-abertas": 0,
  "prova-proxima": 1,
  "pos-prova": 2,
  resultado: 3,
  taf: 4,
  "em-andamento": 5,
  "inscricoes-encerradas": 6,
  previsto: 7,
  encerrado: 8,
};

export function sortContestsByPriority(contests: Contest[], date = new Date()) {
  return [...contests].sort((a, b) => {
    const aStatus = getContestStatus(a, date);
    const bStatus = getContestStatus(b, date);
    const statusDiff = statusPriority[aStatus] - statusPriority[bStatus];
    if (statusDiff !== 0) return statusDiff;

    if (aStatus === "inscricoes-abertas" && bStatus === "inscricoes-abertas") {
      const aEnd = a.inscricoesFim?.slice(0, 10) ?? "9999-12-31";
      const bEnd = b.inscricoesFim?.slice(0, 10) ?? "9999-12-31";
      const endDiff = aEnd.localeCompare(bEnd);
      if (endDiff !== 0) return endDiff;
    }

    if (a.dataProva && b.dataProva) {
      const examDiff = a.dataProva.localeCompare(b.dataProva);
      if (examDiff !== 0) return examDiff;
    }

    return a.sigla.localeCompare(b.sigla, "pt-BR");
  });
}
