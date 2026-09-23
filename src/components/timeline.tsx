"use client";

import { Check, Clock3, Hourglass, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { DataBadge } from "@/components/data-badge";
import { Badge, Button, Card, SectionHeader, StatusBadge } from "@/components/ui";
import { obterStatusConcurso } from "@/data/edital";
import { etapas } from "@/data/portal";
import { formatarData } from "@/lib/format";

const statusIcon = { concluida: Check, atencao: Clock3, prevista: Hourglass, prorrogado: RefreshCw };
const statusLabel = { concluida: "concluída", atencao: "fase atual", prevista: "prevista", prorrogado: "prorrogado" };
const statusVariant = { concluida: "success", atencao: "warning", prevista: "neutral", prorrogado: "warning" } as const;

export function Timeline() {
  const statusAtual = useMemo(() => obterStatusConcurso(), []);
  const [selecionada, setSelecionada] = useState(statusAtual.etapaAtualId);
  const etapa = etapas.find((item) => item.id === selecionada) ?? etapas[0];
  const Icon = statusIcon[etapa.status];
  return (
    <Card as="section" id="etapas" className="timeline-section">
      <SectionHeader eyebrow="Etapas oficiais" title="Da inscrição à eventual nomeação" className="section-compact-heading" />
      <div className="timeline-tabs" role="tablist" aria-label="Etapas do concurso">
        {etapas.map((item) => (
          <Button
            key={item.id}
            id={`tab-${item.id}`}
            type="button"
            variant={item.id === selecionada ? "secondary" : "ghost"}
            role="tab"
            aria-selected={item.id === selecionada}
            aria-controls={`panel-${item.id}`}
            tabIndex={item.id === selecionada ? 0 : -1}
            onKeyDown={(event) => {
              const index = etapas.findIndex((step) => step.id === item.id);
              const next = event.key === "ArrowRight" ? (index + 1) % etapas.length : event.key === "ArrowLeft" ? (index - 1 + etapas.length) % etapas.length : event.key === "Home" ? 0 : event.key === "End" ? etapas.length - 1 : -1;
              if (next < 0) return;
              event.preventDefault();
              setSelecionada(etapas[next].id);
              document.getElementById(`tab-${etapas[next].id}`)?.focus();
            }}
            onClick={() => setSelecionada(item.id)}
            className="timeline-tab"
          >
            <span>{item.status === "concluida" ? "✓" : item.status === "atencao" ? "●" : "→"}</span>
            {item.titulo}<small className="block">{item.id === "prova-objetiva" ? "Próxima" : item.status === "prevista" ? "Futura" : statusLabel[item.status]}</small>
          </Button>
        ))}
      </div>
      <Card as="article" className="timeline-detail" role="tabpanel" id={`panel-${etapa.id}`} aria-labelledby={`tab-${etapa.id}`} padding="md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={statusVariant[etapa.status]}><Icon aria-hidden="true" className="h-3.5 w-3.5" />{etapa.id === "prova-objetiva" ? "próxima" : etapa.status === "prevista" ? "futura" : statusLabel[etapa.status]}</StatusBadge>
          <div className="flex items-center gap-2"><DataBadge tipo={etapa.tipo} /><span className="text-xs text-zinc-500">{etapa.dataAtualizacao ? formatarData(etapa.dataAtualizacao) : "sem data publicada"}</span></div>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">{etapa.titulo}</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">{etapa.periodo}</p>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{etapa.descricao}</p>
        <ul className="mt-4 grid gap-2 text-xs text-zinc-300 sm:grid-cols-3">
          {etapa.checklist.map((item) => <li key={item}><Badge variant="neutral">{item}</Badge></li>)}
        </ul>
        <p className="mt-3 text-[11px] leading-5 text-zinc-500">{etapa.observacao}</p>
      </Card>
    </Card>
  );
}
