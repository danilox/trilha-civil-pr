import { emptyCompetitionStatistics, mockCompetitionStatistics } from "@/data/competition";

export async function getServerCompetitionStatistics() {
  return process.env.NODE_ENV !== "production" ? mockCompetitionStatistics : emptyCompetitionStatistics;
}
