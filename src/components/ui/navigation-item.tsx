import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type NavigationItemProps = ComponentProps<typeof Link> & {
  active?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

export function NavigationItem({ active = false, children, className, icon, ...props }: NavigationItemProps) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn("ds-navigation-item ds-focusable", active && "ds-navigation-item-active", className)}
      {...props}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </Link>
  );
}
