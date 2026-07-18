import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { etapas } from "@/data/portal";

export const metadata: Metadata = {
  title: "Etapas | Trilha Civil PR",
  description: "Organização demonstrativa das etapas do concurso, com aviso de fonte oficial pendente e prevalência do edital.",
  alternates: { canonical: "/etapas" },
};

export default function EtapasPage() {
  return (
    <InternalPage title="Etapas" description="Organização das fases do concurso, com fonte preparada para edital e publicações oficiais.">
      <InfoGrid>
        {etapas.map((etapa) => (
          <InfoCard key={etapa.id}>
            <div className="flex items-start justify-between gap-3">
              <span className="internal-number">{String(etapa.ordem).padStart(2, "0")}</span>
              <DataBadge tipo={etapa.tipo} />
            </div>
            <h2>{etapa.titulo}</h2>
            <p>{etapa.descricao}</p>
            <ul>{etapa.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
            <small>{etapa.fonte}. {etapa.observacao}</small>
          </InfoCard>
        ))}
      </InfoGrid>
    </InternalPage>
  );
}
