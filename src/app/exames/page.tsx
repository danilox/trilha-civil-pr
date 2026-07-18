import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { exames } from "@/data/portal";

export const metadata: Metadata = {
  title: "Exames | Trilha Civil PR",
  description: "Informações organizadas sobre exames médicos, finalidade, preparação, validade e erros documentais comuns.",
  alternates: { canonical: "/exames" },
};

export default function ExamesPage() {
  return (
    <InternalPage title="Exames" description="Estrutura de finalidade, preparação, validade e erros documentais. Prevalece sempre o edital.">
      <InfoGrid>
        {exames.map((exame) => (
          <InfoCard key={exame.id}>
            <div className="flex items-start justify-between gap-3"><h2>{exame.titulo}</h2><DataBadge tipo={exame.tipo} /></div>
            <p>{exame.finalidade}</p>
            <h3>Preparação</h3><ul>{exame.preparo.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>Validade</h3><p>{exame.validade}</p>
            <h3>Possíveis erros documentais</h3><ul>{exame.errosDocumentais.map((item) => <li key={item}>{item}</li>)}</ul>
            <small>{exame.fonte}. {exame.observacao}</small>
          </InfoCard>
        ))}
      </InfoGrid>
    </InternalPage>
  );
}
