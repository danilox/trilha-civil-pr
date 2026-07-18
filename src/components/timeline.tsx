"use client";

import { Check, Clock3, Hourglass } from "lucide-react";
import { useState } from "react";
import { DataBadge } from "@/components/data-badge";
import { etapas } from "@/data/portal";
import { formatarData } from "@/lib/format";

const statusIcon = {
  concluida: Check,
  atencao: Clock3,
  prevista: Hourglass,
};

const statusLabel = {
  concluida: "concluída",
  atencao: "atenção",
  prevista: "prevista",
};

export function Timeline() {
  const [selecionada, setSelecionada] = useState(etapas[3]?.id ?? etapas[0].id);
  const etapa = etapas.find((item) => item.id === selecionada) ?? etapas[0];
  const Icon = statusIcon[etapa.status];

  return (
    <section id="etapas" className="timeline-section">
      <div className="section-compact-heading">
        <p>Etapas do concurso</p>
        <h2>Da inscrição à nomeação</h2>
      </div>

      <div className="timeline-tabs" role="tablist" aria-label="Etapas do concurso">
        {etapas.slice(0, 7).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === selecionada}
            onClick={() => setSelecionada(item.id)}
            className="timeline-tab"
          >
            <span>{String(item.ordem).padStart(2, "0")}</span>
            {item.titulo}
          </button>
        ))}
      </div>

      <article className="timeline-detail" role="tabpanel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
            <Icon aria-hidden="true" className="h-3.5 w-3.5" />
            {statusLabel[etapa.status]}
          </span>
          <div className="flex items-center gap-2">
            <DataBadge tipo={etapa.tipo} />
            <span className="text-xs text-zinc-500">
              {etapa.dataAtualizacao ? formatarData(etapa.dataAtualizacao) : "sem data"}
            </span>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">{etapa.titulo}</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600">{etapa.periodo}</p>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{etapa.descricao}</p>
        <ul className="mt-4 grid gap-2 text-xs text-zinc-300 sm:grid-cols-3">
          {etapa.checklist.map((item) => (
            <li key={item} className="border border-white/10 px-3 py-2">{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
