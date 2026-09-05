import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { dicas } from "@/data/portal";
import { createPageMetadata } from "@/lib/seo";

const avisoLocais =
  "Exames e inspeção de saúde são etapas posteriores. Acompanhe a convocação oficial antes de realizar exames ou contratar serviços.";

export const metadata: Metadata = createPageMetadata({
  title: "Dicas para o Concurso PC-PR 2026",
  description: "Organize documentos, prazos, deslocamentos e preparação logística com orientações informativas do projeto independente.",
  path: "/concursos/pc-pr-2026/dicas",
});

export default function DicasPage() {
  return (
    <InternalPage
      path="/concursos/pc-pr-2026/dicas"
      title="Dicas"
      description="Orientações práticas para documentos, prazos, logística e preparação para convocação."
      audited
      className="internal-page-lot4 internal-page-dicas"
    >
      <aside className="internal-alert" role="note">{avisoLocais}</aside>
      <InfoGrid className="internal-grid-dicas">
        {dicas.map((dica) => (
          <InfoCard key={dica.id}>
            <div className="flex items-start justify-between gap-3"><h2>{dica.titulo}</h2><DataBadge tipo={dica.tipo} /></div>
            <p>{dica.descricao}</p>
            <small>Categoria: {dica.categoria}. {dica.observacao}</small>
          </InfoCard>
        ))}
      </InfoGrid>
    </InternalPage>
  );
}
