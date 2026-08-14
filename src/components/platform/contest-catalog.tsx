"use client";

import { useMemo, useState } from "react";
import { ContestCard } from "@/components/platform/contest-card";
import type { Contest, ContestCategory, ContestStatus } from "@/data/contests";

type Filter =
  | "todos"
  | ContestCategory
  | Extract<ContestStatus, "disponivel" | "em-construcao">;

const filters: { value: Filter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "Polícia Civil", label: "Polícia Civil" },
  { value: "Polícia Militar", label: "Polícia Militar" },
  { value: "Polícia Penal", label: "Polícia Penal" },
  { value: "disponivel", label: "Disponíveis" },
  { value: "em-construcao", label: "Em construção" },
];

export function ContestCatalog({ contests }: { contests: Contest[] }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("todos");
  const filteredContests = useMemo(
    () =>
      contests.filter(
        (contest) =>
          activeFilter === "todos" ||
          contest.categoria === activeFilter ||
          contest.status === activeFilter,
      ),
    [activeFilter, contests],
  );

  return (
    <>
      <div className="platform-filter-list" role="group" aria-label="Filtrar concursos">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className="platform-filter ds-focusable"
            aria-pressed={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {filteredContests.length} concurso(s) exibido(s).
      </p>
      {filteredContests.length ? (
        <div className="platform-contest-grid">
          {filteredContests.map((contest) => (
            <ContestCard key={contest.slug} contest={contest} />
          ))}
        </div>
      ) : (
        <div className="platform-empty">
          <h2>Nenhum concurso nesta categoria</h2>
          <p>Novos guias serão exibidos aqui após o cadastro das informações.</p>
        </div>
      )}
    </>
  );
}
