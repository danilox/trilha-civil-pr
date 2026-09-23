import { ContestCard } from "@/components/platform/contest-card";
import { CatalogFiltersForm } from "@/components/platform/catalog-filters";
import { filterContests, type CatalogFilters } from "@/lib/contest-catalog";
import type { Contest } from "@/data/contests";
export function ContestCatalog({ contests, filters = {} }: { contests: Contest[]; filters?: CatalogFilters }) {
  const filtered = filterContests(contests, filters);
  return <><CatalogFiltersForm filters={filters} states={[...new Set(contests.map(contest => contest.estado))].sort()} action="/concursos" />
    <p className="catalog-result-count">{filtered.length} concurso(s) encontrado(s)</p>
    {filtered.length ? <div className="platform-contest-grid">{filtered.map(contest => <ContestCard key={contest.slug} contest={contest} headingLevel={2} />)}</div> : <div className="platform-empty"><h2>Nenhum concurso corresponde aos filtros</h2><p>Limpe ou altere os filtros para consultar outros concursos.</p></div>}
  </>;
}
