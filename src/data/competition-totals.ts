// Totais da base oficial de referência do Radar. Não são o total importado
// nem a amostra colaborativa. Não atualizar sem conferir a base de origem.
export const officialTotalsByCargo: Record<string, number> = {
  "Agente de Polícia Judiciária": 40284,
  "Delegado de Polícia": 15549,
  "Papiloscopista Policial": 6824,
};

export const officialSourceTotal = Object.values(officialTotalsByCargo).reduce((sum, total) => sum + total, 0);

export function getOfficialSourceTotal(cargo?: string) {
  return cargo ? officialTotalsByCargo[cargo] ?? 0 : officialSourceTotal;
}
