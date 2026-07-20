import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type MetricCardProps = {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  meta?: ReactNode;
  className?: string;
};

export function MetricCard({ className, description, icon, label, meta, value }: MetricCardProps) {
  return (
    <Card className={cn("ds-metric-card", className)} interactive>
      <div className="ds-metric-topline">
        <span>{label}</span>
        {icon ? <span aria-hidden="true">{icon}</span> : null}
      </div>
      <strong className="ds-metric-value">{value}</strong>
      {description ? <p className="ds-metric-description">{description}</p> : null}
      {meta ? <div>{meta}</div> : null}
    </Card>
  );
}
