import { CheckCircle2, Clock3, CalendarDays } from "lucide-react";
import { StatusBadge } from "@/components/ui";
import { contestStatusLabels } from "@/lib/contest-catalog";
import type { ContestStatus } from "@/types/contest";
export function ContestStatusBadge({ status }: { status: ContestStatus }) {
  const Icon = status === "inscricoes-abertas" ? CheckCircle2 : status === "prova-proxima" ? CalendarDays : Clock3;
  return <StatusBadge status={status === "inscricoes-abertas" ? "active" : status === "prova-proxima" ? "warning" : "neutral"}><Icon aria-hidden="true" className="h-3.5 w-3.5" />{contestStatusLabels[status]}</StatusBadge>;
}
