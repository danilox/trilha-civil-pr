import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { ContestStatusBadge } from "@/components/platform/contest-status-badge";
import { pendingConfirmation, type Contest } from "@/data/contests";
import { getContestStatus } from "@/lib/contest-catalog";
import { formatarData } from "@/lib/format";
export function ContestCard({ contest, headingLevel = 3 }: { contest: Contest; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const featured = contest.slug === "pc-pr-2026";
  return <article className={"platform-contest-card national-card " + (featured ? "is-featured" : "")}>
    <div className="platform-contest-card-top"><span className="platform-contest-icon" aria-hidden="true"><Layers3 /></span><ContestStatusBadge status={getContestStatus(contest)} /></div>
    <div className="platform-contest-copy"><p className="contest-category">{contest.categoria} · {contest.estado}</p><Heading>{contest.sigla}</Heading><p className="platform-contest-name">{contest.nome}</p><p>{contest.descricao}</p></div>
    <dl className="contest-facts"><div><dt>Cargos</dt><dd>{contest.cargos.join(" · ") || pendingConfirmation}</dd></div><div><dt>Banca</dt><dd>{contest.banca || pendingConfirmation}</dd></div>
      <div><dt>Inscrições</dt><dd>{contest.inscricoesInicio && contest.inscricoesFim ? formatarData(contest.inscricoesInicio) + " → " + formatarData(contest.inscricoesFim) : pendingConfirmation}</dd></div>
      <div><dt>Prova</dt><dd>{contest.dataProva ? formatarData(contest.dataProva) : pendingConfirmation}</dd></div></dl>
    <p className="contest-updated">Atualizado em <time dateTime={contest.ultimaAtualizacao}>{formatarData(contest.ultimaAtualizacao)}</time></p>
    <Link href={contest.href} className={"ds-button ds-focusable " + (featured ? "ds-button-primary" : "ds-button-secondary")}>Acompanhar concurso <span className="sr-only">{contest.sigla}</span><ArrowRight aria-hidden="true" /></Link>
  </article>;
}
