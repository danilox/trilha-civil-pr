import { StatusBadge } from "@/components/ui";
import type { ContestStatus } from "@/data/contests";

const statusConfig: Record<
  ContestStatus,
  { label: string; status: "active" | "info" | "warning" | "neutral" }
> = {
  disponivel: { label: "Guia disponível", status: "active" },
  "em-construcao": { label: "Em construção", status: "warning" },
  previsto: { label: "Previsto", status: "info" },
  encerrado: { label: "Encerrado", status: "neutral" },
};

export function ContestStatusBadge({ status }: { status: ContestStatus }) {
  const config = statusConfig[status];

  return <StatusBadge status={config.status}>{config.label}</StatusBadge>;
}
