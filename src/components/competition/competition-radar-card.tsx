"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChartNoAxesColumnIncreasing, MapPin, Target, Users } from "lucide-react";
import { emptyCompetitionStatistics } from "@/data/competition";
import { radarPath } from "@/data/competition-presentation";
import { mapCompetitionStatsToStatistics } from "@/lib/competition-data";
import { formatarData, formatarDecimal, formatarNumero } from "@/lib/format";
import type { CompetitionStatsApiResponse } from "@/types/competition";
import { CompetitionTrustBadges } from "./competition-trust-badges";
import { CompetitionShareActions } from "./competition-share-actions";

export function CompetitionRadarCard() {
  const [statistics, setStatistics] = useState(emptyCompetitionStatistics);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      try {
        const response = await fetch("/api/concorrencia/stats?cargo=agente", { cache: "no-store", signal: controller.signal });
        const payload: CompetitionStatsApiResponse = await response.json();
        if (!response.ok || !payload.available || payload.mock) throw new Error("unavailable");
        setStatistics(mapCompetitionStatsToStatistics(payload));
        setStatus("ready");
      } catch { if (!controller.signal.aborted) setStatus("error"); }
    }
    void refresh();
    const timer = window.setInterval(() => { if (!document.hidden) void refresh(); }, 60000);
    return () => { controller.abort(); window.clearInterval(timer); };
  }, []);
  const showNumbers = status === "ready";
  return <section id="radar" className="radar-card" aria-labelledby="radar-title" aria-busy={status === "loading"}>
    <div className="radar-card-heading"><h2 id="radar-title">Radar de concorrência<span>Agente PCPR 2026</span></h2><Target aria-hidden="true" /></div>
    <p className="radar-intro">Veja onde os candidatos estão concentrando suas escolhas e ajude a comunidade a construir um panorama mais representativo da disputa.</p>
    <div className="radar-metrics">
      <div className="radar-total"><span>Participantes</span><Users aria-hidden="true" /><strong>{showNumbers ? formatarNumero(statistics.totalParticipants) : "—"}</strong><p>Candidatos já responderam</p></div>
      <div className="radar-regions">{statistics.regions.map((region) => {
        const percentage = showNumbers ? region.percentage : 0;
        return <div key={region.regionId} className="radar-region"><MapPin aria-hidden="true" /><div><h3>{region.label}</h3><div className="radar-region-value"><div role="progressbar" aria-label={region.label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage} className="radar-track"><span style={{ width: `${percentage}%` }} /></div><strong>{showNumbers ? `${formatarDecimal(percentage)}%` : "—"}</strong></div><p>{showNumbers ? `${formatarNumero(region.count)} ${region.count === 1 ? "participante" : "participantes"}` : "Aguardando dados"}</p></div></div>;
      })}</div>
    </div>
    <p className="radar-data-status" role="status">{status === "loading" ? "Consultando a pesquisa…" : status === "error" ? "Estatísticas temporariamente indisponíveis. Tente novamente em instantes." : statistics.totalParticipants === 0 ? "Seja o primeiro a participar e ajude a formar esta amostra." : "Amostra colaborativa de Agente. Não representa a concorrência oficial."}</p>
    {showNumbers && statistics.atualizadoEm ? <p className="radar-data-status">Última participação registrada em {formatarData(statistics.atualizadoEm.slice(0, 10))}.</p> : null}
    <CompetitionTrustBadges compact />
    <Link href={radarPath} className="radar-participate ds-focusable"><ChartNoAxesColumnIncreasing aria-hidden="true" /> Participar do Radar <ArrowRight aria-hidden="true" /></Link>
    <CompetitionShareActions />
  </section>;
}
