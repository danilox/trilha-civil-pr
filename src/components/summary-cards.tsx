"use client";

import { CalendarClock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DataBadge } from "@/components/data-badge";
import { Card, StatusBadge, Tooltip } from "@/components/ui";
import { inscricoesEProva, obterStatusConcurso } from "@/data/edital";
import { resumoConcurso } from "@/data/portal";
import { formatarData } from "@/lib/format";

function formatarDataHoraIso(valor?: string) {
  if (!valor) return "Acompanhe a FGV";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(valor));
}

export function SummaryCards() {
  const [agora, setAgora] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setAgora(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const status = useMemo(() => obterStatusConcurso(agora), [agora]);

  return (
    <section aria-label="Resumo do concurso" className="summary-grid">
      {resumoConcurso.map((card, index) => {
        const destaque = index === 0 ? status.titulo : index === 1 ? formatarDataHoraIso(status.dataAlvo) : card.destaque;
        const detalhe = index === 0
          ? status.descricao
          : index === 1
            ? `Conferência: ${formatarData(inscricoesEProva.referencia.dataConferencia)}`
            : card.detalhe;
        return (
          <Card key={card.id} as="article" className="summary-card" interactive>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{card.titulo}</p>
                {index === 2 ? <Tooltip content="Informação demonstrativa ou estimativa, sem valor de classificação oficial." /> : null}
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
