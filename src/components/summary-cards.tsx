"use client";

import { CalendarClock } from "lucide-react";
import { DataBadge } from "@/components/data-badge";
import { Card, StatusBadge, Tooltip } from "@/components/ui";
import { situacaoAtualPcpr2026 } from "@/data/edital";
import { resumoConcurso } from "@/data/portal";
import { formatarData } from "@/lib/format";

export function SummaryCards() {
  return (
    <section aria-label="Resumo do concurso" className="summary-grid">
      {resumoConcurso.map((card, index) => {
        const destaque = index === 0 ? situacaoAtualPcpr2026.statusCurto : index === 1 ? situacaoAtualPcpr2026.proximoMarco.resumo : card.destaque;
        const detalhe = index === 0
          ? situacaoAtualPcpr2026.substatus
          : index === 1
            ? `Última movimentação: ${formatarData(situacaoAtualPcpr2026.ultimaMovimentacao)}`
            : card.detalhe;

        return (
          <Card key={card.id} as="article" className="summary-card" interactive>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{card.titulo}</p>
                {index === 2 ? <Tooltip content="Informação oficial do edital. Projeções do painel permanecem identificadas como estimativas." /> : null}
              </div>
              {index === 0 ? <StatusBadge status="active">Em acompanhamento</StatusBadge> : <DataBadge tipo={card.tipo} />}
            </div>
            <strong className="mt-3 block text-lg font-semibold text-white">{destaque}</strong>
            <p className="mt-1 flex items-center gap-2 text-xs leading-5 text-zinc-500">
              {index === 1 ? <CalendarClock aria-hidden="true" className="h-3.5 w-3.5" /> : null}
              {detalhe}
            </p>
          </Card>
        );
      })}
    </section>
  );
}
