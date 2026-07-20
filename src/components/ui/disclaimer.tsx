import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";

type DisclaimerProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Disclaimer({ children, className, title = "Projeto independente" }: DisclaimerProps) {
  return (
    <aside className={cn("ds-disclaimer", className)} role="note">
      <strong>
        <AlertTriangle aria-hidden="true" className="inline h-4 w-4" /> {title}
      </strong>
      <div>{children}</div>
    </aside>
  );
}
