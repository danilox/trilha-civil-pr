import { Badge } from "@/components/ui";
import type { TipoInformacao } from "@/types/content";

const labels: Record<TipoInformacao, string> = {
  oficial: "Dado oficial",
  estimativa: "Estimativa",
  demonstracao: "Demonstração",
};

const variants: Record<TipoInformacao, "accent" | "blue" | "purple"> = {
  oficial: "accent",
  estimativa: "blue",
  demonstracao: "purple",
};

export function DataBadge({ tipo }: { tipo: TipoInformacao }) {
  return <Badge className={`data-badge data-badge-${tipo}`} variant={variants[tipo]}>{labels[tipo]}</Badge>;
}
