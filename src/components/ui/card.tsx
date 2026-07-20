import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardPadding = "sm" | "md" | "lg";
type CardElement = "article" | "aside" | "div" | "header" | "section";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: CardElement;
  interactive?: boolean;
  padding?: CardPadding;
};

export function Card({ as: Element = "div", className, interactive = false, padding = "md", ...props }: CardProps) {
  return (
    <Element
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
