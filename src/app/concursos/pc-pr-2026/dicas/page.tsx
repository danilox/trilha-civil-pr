import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { dicas, locaisExame } from "@/data/portal";
import { createPageMetadata } from "@/lib/seo";

const avisoLocais =
  "O portal não garante preço, atendimento, disponibilidade ou aceitação do exame. Confirme diretamente com o estabelecimento e com o edital.";

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
        {locaisExame.map((local) => (
          <InfoCard key={local.id}>
            <div className="flex items-start justify-between gap-3"><h2>{local.nome}</h2><DataBadge tipo={local.tipo} /></div>
            <p>{local.categoria} em {local.cidade} ({local.regiao}).</p>
            <div className="internal-stat"><span>Endereço</span><strong>{local.endereco}</strong></div>
            <div className="internal-stat"><span>Telefone</span><strong>{local.telefone}</strong></div>
            <div className="internal-stat"><span>Site</span><strong>{local.site}</strong></div>
            <h3>Serviços oferecidos</h3><ul>{local.servicosOferecidos.map((servico) => <li key={servico}>{servico}</li>)}</ul>
            <small>Exemplo fictício. Verificado em {local.verificadoEm}. Patrocinado: {local.patrocinado ? "sim" : "não"}. {local.observacao}</small>
          </InfoCard>
        ))}
      </InfoGrid>
    </InternalPage>
  );
}
