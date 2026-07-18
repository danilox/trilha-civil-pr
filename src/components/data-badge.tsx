import type { TipoInformacao } from "@/types/content";

const labels: Record<TipoInformacao, string> = {
  oficial: "Dado oficial",
  estimativa: "Estimativa",
  demonstracao: "Demonstração",
};

export function DataBadge({ tipo }: { tipo: TipoInformacao }) {
  return <span className={`data-badge data-badge-${tipo}`}>{labels[tipo]}</span>;
}
