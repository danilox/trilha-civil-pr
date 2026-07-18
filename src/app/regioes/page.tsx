import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { regioes } from "@/data/portal";
import { formatarDecimal, formatarNumero } from "@/lib/format";

export const metadata: Metadata = {
  title: "Regiões | Trilha Civil PR",
  description: "Comparação regional com vagas, candidatos estimados e candidatos por vaga, sem caráter de resultado oficial.",
  alternates: { canonical: "/regioes" },
};

export default function RegioesPage() {
  return (
    <InternalPage title="Regiões" description="Comparação visual de vagas, candidatos estimados e candidatos por vaga. Valores provisórios não são oficiais.">
      <InfoGrid>
        {regioes.map((regiao) => (
          <InfoCard key={regiao.id}>
            <div className="flex items-start justify-between gap-3"><h2>{regiao.nome}</h2><DataBadge tipo={regiao.tipo} /></div>
            <div className="internal-stat"><span>Vagas</span><strong>{formatarNumero(regiao.vagas)}</strong></div>
            <div className="internal-stat"><span>Candidatos estimados</span><strong>{formatarNumero(regiao.inscritosEstimados)}</strong></div>
            <div className="internal-stat"><span>Candidatos por vaga</span><strong>{formatarDecimal(regiao.concorrencia)}</strong></div>
            <p>{regiao.observacao}</p>
            <small>{regiao.fonte}</small>
          </InfoCard>
        ))}
      </InfoGrid>
    </InternalPage>
  );
}
