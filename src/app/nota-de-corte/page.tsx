import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { projecoes } from "@/data/portal";
import { formatarDecimal } from "@/lib/format";

export const metadata: Metadata = {
  title: "Nota de corte | Trilha Civil PR",
  description: "Projeções demonstrativas de nota de corte para comparação, sem valor oficial ou garantia de classificação.",
  alternates: { canonical: "/nota-de-corte" },
};

export default function NotaDeCortePage() {
  return (
    <InternalPage title="Nota de corte" description="Projeções demonstrativas para comparação. Não representam resultado, classificação ou nota oficial.">
      <InfoGrid>
        {projecoes.map((projecao) => (
          <InfoCard key={projecao.id}>
            <div className="flex items-start justify-between gap-3"><h2>{projecao.cargo}</h2><DataBadge tipo={projecao.tipo} /></div>
            <div className="bar-row"><span>Mínima</span><i style={{ width: `${projecao.notaMinima}%` }} /><b>{formatarDecimal(projecao.notaMinima)}</b></div>
            <div className="bar-row"><span>Provável</span><i style={{ width: `${projecao.notaProvavel}%` }} /><b>{formatarDecimal(projecao.notaProvavel)}</b></div>
            <div className="bar-row"><span>Competitiva</span><i style={{ width: `${projecao.notaCompetitiva}%` }} /><b>{formatarDecimal(projecao.notaCompetitiva)}</b></div>
            <small>{projecao.fonte}. {projecao.observacao}</small>
          </InfoCard>
        ))}
      </InfoGrid>
    </InternalPage>
  );
}
