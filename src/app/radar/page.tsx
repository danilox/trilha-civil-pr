import Link from "next/link";
import { InternalPage } from "@/components/internal-page";
import { CatalogFiltersForm } from "@/components/platform/catalog-filters";
import { ContestStatusBadge } from "@/components/platform/contest-status-badge";
import { contests, pendingConfirmation } from "@/data/contests";
import { filterContests, getContestStatus, sortContestsByPriority, type CatalogFilters } from "@/lib/contest-catalog";
import { formatarData } from "@/lib/format";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Radar de concursos de Segurança Pública", description: "Compare concursos por estado, instituição, banca, inscrições, prova e próximo evento oficial.", path: "/radar" });
export default async function RadarPage({ searchParams }: { searchParams: Promise<CatalogFilters> }) {
  const filters = await searchParams;
  const filtered = sortContestsByPriority(filterContests(contests, filters));
  return <InternalPage title="Radar de concursos" description="Uma visão nacional dos prazos e movimentos de Segurança Pública. Use os filtros e compartilhe o endereço da sua seleção." path="/radar">
    <CatalogFiltersForm filters={filters} states={[...new Set(contests.map(contest => contest.estado))].sort()} action="/radar" />
    <p className="catalog-result-count">{filtered.length} concurso(s) encontrado(s)</p>
    <div className="radar-national-grid">{filtered.map(contest => <article className="radar-national-item" key={contest.slug}>
      <div><h2><Link className="ds-focusable" href={contest.href}>{contest.sigla} →</Link></h2><p>{contest.estado} · {contest.categoria}</p></div>
      <ContestStatusBadge status={getContestStatus(contest)} />
      <dl className="contest-facts"><div><dt>Banca</dt><dd>{contest.banca || pendingConfirmation}</dd></div><div><dt>Inscrições</dt><dd>{contest.inscricoesInicio && contest.inscricoesFim ? `${formatarData(contest.inscricoesInicio)} → ${formatarData(contest.inscricoesFim)}` : pendingConfirmation}</dd></div><div><dt>Prova</dt><dd>{contest.dataProva ? formatarData(contest.dataProva) : pendingConfirmation}</dd></div><div><dt>Próximo evento</dt><dd>{contest.proximoEvento}</dd></div></dl>
      <p className="contest-updated">Atualizado em <time dateTime={contest.ultimaAtualizacao}>{formatarData(contest.ultimaAtualizacao)}</time></p>
    </article>)}</div>
    {!filtered.length && <p className="platform-empty">Nenhum concurso corresponde aos filtros. Altere sua seleção ou limpe os filtros.</p>}
    <p className="catalog-result-count">Procurando a pesquisa de regiões? <Link className="source-external-link ds-focusable" href="/concursos/pc-pr-2026/concorrencia">Radar de Concorrência PCPR</Link></p>
  </InternalPage>;
}
