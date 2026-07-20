import type { ReactNode } from "react";
import { useId } from "react";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/cn";

type TooltipProps = {
  content: ReactNode;
  label?: string;
  className?: string;
};

export function Tooltip({ className, content, label = "Mais informações" }: TooltipProps) {
  const id = useId();

  return (
    <span className={cn("ds-tooltip", className)}>
      <button type="button" className="ds-tooltip-trigger ds-focusable" aria-describedby={id} aria-label={label}>
        <HelpCircle aria-hidden="true" className="h-4 w-4" />
      </button>
      <span id={id} role="tooltip" className="ds-tooltip-content">
        {content}
      </span>
    </span>
  );
}
