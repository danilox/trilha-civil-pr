import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  height?: string;
  width?: string;
};

export function Skeleton({ className, height = "1rem", width = "100%", style, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("ds-skeleton", className)}
      style={{ height, width, ...style }}
      {...props}
    />
  );
}
