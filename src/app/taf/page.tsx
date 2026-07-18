import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { taf } from "@/data/portal";

export const metadata: Metadata = {
  title: "TAF | Trilha Civil PR",
  description: "Estrutura preparada para índices, regras, documentos e motivos de eliminação do teste de aptidão física.",
  alternates: { canonical: "/taf" },
};

export default function TafPage() {
  return (
    <InternalPage title="TAF" description="Estrutura preparada para índices, regras, documentos e motivos de eliminação. Confira sempre o edital.">
      <InfoGrid>
        {taf.map((item) => (
          <InfoCard key={item.id}>
            <div className="flex items-start justify-between gap-3"><h2>{item.titulo}</h2><DataBadge tipo={item.tipo} /></div>
            <p>{item.descricao}</p>
            <h3>Regras</h3><ul>{item.regras.map((regra) => <li key={regra}>{regra}</li>)}</ul>
            <h3>Documentos</h3><ul>{item.documentos.map((doc) => <li key={doc}>{doc}</li>)}</ul>
            <h3>Motivos de eliminação</h3><ul>{item.motivosEliminacao.map((motivo) => <li key={motivo}>{motivo}</li>)}</ul>
            <small>{item.fonte}. {item.observacao}</small>
          </InfoCard>
        ))}
      </InfoGrid>
    </InternalPage>
  );
}
