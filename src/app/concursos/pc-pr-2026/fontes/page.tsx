import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { fontesRegistros, ultimaAtualizacao } from "@/data/portal";
import { formatarData } from "@/lib/format";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fontes e Metodologia",
  description: "Veja como o Edital no Controle classifica fontes oficiais, estimativas e demonstrações, além dos critérios de atualização do portal.",
  path: "/concursos/pc-pr-2026/fontes",
});
export default function FontesPage() {
  return <InternalPage path="/concursos/pc-pr-2026/fontes" audited className="internal-page-lot3 internal-page-fontes" title="Fontes e metodologia" description="Classificação das informações, limites das projeções e critérios de atualização do portal."><aside className="internal-alert" role="note">Projeto independente. Informações oficiais vêm do edital, banca e órgãos competentes. Projeções não representam classificação oficial. Locais para exames são exemplos informativos/fictícios nesta versão. Última atualização: {formatarData(ultimaAtualizacao)}.</aside><InfoGrid>{fontesRegistros.map((registro) => <InfoCard key={registro.id}><div className="flex items-start justify-between gap-3"><h2>{registro.informacao}</h2><DataBadge tipo={registro.classificacao} /></div><div className="internal-stat"><span>Fonte</span><strong>{registro.fonte}</strong></div><div className="internal-stat"><span>Data de publicação</span><strong>{registro.dataPublicacao}</strong></div><div className="internal-stat"><span>Data de conferência</span><strong>{formatarData(registro.dataConferencia)}</strong></div><p>{registro.observacao}</p>{registro.urlFonte ? <a className="source-external-link ds-focusable" href={registro.urlFonte} target="_blank" rel="noopener noreferrer">Consultar fonte: {registro.fonte}<ExternalLink aria-hidden="true" className="h-4 w-4" /><span className="sr-only">(abre em nova aba)</span></a> : null}</InfoCard>)}</InfoGrid></InternalPage>;
}
