import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { titulos } from "@/data/portal";

export const metadata: Metadata = {
  title: "Títulos | Trilha Civil PR",
  description: "Estrutura demonstrativa para pontuação, limites e comprovação da prova de títulos.",
  alternates: { canonical: "/titulos" },
};

export default function TitulosPage() {
  return (
    <InternalPage title="Títulos" description="Estrutura para pontuação, limites e comprovação. Exemplos demonstrativos não são regra oficial.">
      <InfoGrid>
        {titulos.map((item) => (
          <InfoCard key={item.id}>
            <div className="flex items-start justify-between gap-3"><h2>{item.titulo}</h2><DataBadge tipo={item.tipo} /></div>
            <p>{item.descricao}</p>
            <div className="internal-stat"><span>Tipo</span><strong>{item.tipoTitulo}</strong></div>
            <div className="internal-stat"><span>Pontuação</span><strong>{item.pontuacao}</strong></div>
            <div className="internal-stat"><span>Limite</span><strong>{item.limite}</strong></div>
            <h3>Comprovação</h3><p>{item.comprovacao}</p>
            <small>{item.fonte}. {item.observacao}</small>
          </InfoCard>
        ))}
      </InfoGrid>
    </InternalPage>
  );
}
