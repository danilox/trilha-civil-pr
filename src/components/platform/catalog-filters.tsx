import Link from "next/link";
import { contestCategories, contestStatusLabels, type CatalogFilters } from "@/lib/contest-catalog";

export function CatalogFiltersForm({ filters, states, action }: { filters: CatalogFilters; states: string[]; action: string }) {
  return <form method="get" action={action} className="catalog-filters" aria-label="Filtrar concursos">
    <label>Instituição<select name="categoria" defaultValue={filters.categoria ?? ""} className="ds-focusable"><option value="">Todas</option>{contestCategories.map(value => <option key={value}>{value}</option>)}</select></label>
    <label>Situação<select name="situacao" defaultValue={filters.situacao ?? ""} className="ds-focusable"><option value="">Todas</option>{Object.entries(contestStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    <label>Estado<select name="estado" defaultValue={filters.estado ?? ""} className="ds-focusable"><option value="">Todos</option>{states.map(value => <option key={value}>{value}</option>)}</select></label>
    <button className="ds-button ds-button-primary ds-focusable" type="submit">Aplicar filtros</button>
    <Link href={action} className="ds-button ds-button-secondary ds-focusable">Limpar</Link>
  </form>;
}
