"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DataBadge } from "@/components/data-badge";
import { resumoConcurso } from "@/data/portal";

const alvoDemonstrativo = new Date("2026-08-15T09:00:00-03:00").getTime();

type TempoRestante = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

function calcularTempo() {
  const restante = Math.max(0, alvoDemonstrativo - Date.now());
  const dias = Math.floor(restante / 86_400_000);
  const horas = Math.floor((restante % 86_400_000) / 3_600_000);
  const minutos = Math.floor((restante % 3_600_000) / 60_000);
  const segundos = Math.floor((restante % 60_000) / 1_000);
  return { dias, horas, minutos, segundos };
}

export function SummaryCards() {
  const [tempo, setTempo] = useState<TempoRestante | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setTempo(calcularTempo()));
    const timer = window.setInterval(() => setTempo(calcularTempo()), 1000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  const contagem = useMemo(() => {
    if (!tempo) return "Prazo demonstrativo";
    return `${tempo.dias}d ${tempo.horas}h ${tempo.minutos}m ${tempo.segundos}s`;
  }, [tempo]);

  return (
    <section aria-label="Resumo do concurso" className="summary-grid">
      {resumoConcurso.map((card, index) => (
        <article key={card.id} className="summary-card">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{card.titulo}</p>
            <DataBadge tipo={card.tipo} />
          </div>
          <strong className="mt-3 block text-lg font-semibold text-white">
            {index === 2 ? contagem : card.destaque}
          </strong>
          <p className="mt-1 flex items-center gap-2 text-xs leading-5 text-zinc-500">
            {index === 2 ? <Clock3 aria-hidden="true" className="h-3.5 w-3.5" /> : null}
            {card.detalhe}
          </p>
        </article>
      ))}
    </section>
  );
}