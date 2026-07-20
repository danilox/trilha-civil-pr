import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({ actionLabel, className, description, icon, onAction, title }: EmptyStateProps) {
  return (
    <div className={cn("ds-empty-state", className)}>
      <div className="ds-empty-state-icon" aria-hidden="true">
        {icon ?? <SearchX className="h-5 w-5" />}
      </div>
      <div>
        <p className="ds-empty-state-title">{title}</p>
        <p className="ds-empty-state-description">{description}</p>
      </div>
      {actionLabel ? <Button onClick={onAction} disabled={!onAction}>{actionLabel}</Button> : null}
    </div>
  );
}
