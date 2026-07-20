import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardPadding = "sm" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  padding?: CardPadding;
};

export function Card({ className, interactive = false, padding = "md", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "ds-card",
        `ds-card-padding-${padding}`,
        interactive && "ds-card-interactive",
        className,
      )}
      {...props}
    />
  );
}
