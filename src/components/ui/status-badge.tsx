import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Status = "neutral" | "active" | "info" | "success" | "warning" | "danger";

type StatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  status?: Status;
};

export function StatusBadge({ className, status = "neutral", children, ...props }: StatusBadgeProps) {
  return (
    <span className={cn("ds-status-badge", `ds-status-${status}`, className)} {...props}>
      <span aria-hidden="true">●</span>
      {children}
    </span>
  );
}
