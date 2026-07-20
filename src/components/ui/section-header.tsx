import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <header className={cn("ds-section-header", className)}>
      {eyebrow ? <p className="ds-section-eyebrow">{eyebrow}</p> : null}
      <h2 className="ds-section-title">{title}</h2>
      {description ? <p className="ds-section-description">{description}</p> : null}
    </header>
  );
}
