import Link from "next/link";
import { ArrowRight, Layers3, Shield } from "lucide-react";
import { ContestStatusBadge } from "@/components/platform/contest-status-badge";
import type { Contest } from "@/data/contests";

export function ContestCard({ contest }: { contest: Contest }) {
  const available = contest.status === "disponivel";
  const actionLabel = available ? "Acessar guia" : "Ver projeto";
  const Icon = available ? Layers3 : Shield;

  return (
    <article className={`platform-contest-card ${available ? "is-featured" : ""}`}>
      <div className="platform-contest-card-top">
        <span className="platform-contest-icon" aria-hidden="true">
          <Icon />
        </span>
        <ContestStatusBadge status={contest.status} />
      </div>
      <div className="platform-contest-copy">
        <h3>{contest.sigla}</h3>
        <p className="platform-contest-name">{contest.nome}</p>
        <p>{contest.descricao}</p>
      </div>
      <Link
        href={contest.href}
        className={`ds-button ds-focusable ${available ? "ds-button-primary" : "ds-button-secondary"}`}
      >
        {actionLabel}
        <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}
