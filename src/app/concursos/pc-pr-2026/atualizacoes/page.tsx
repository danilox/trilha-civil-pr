import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InternalPage } from "@/components/internal-page";
import { atualizacoes } from "@/data/portal";
import { formatarData } from "@/lib/format";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Atualizações do Concurso PC-PR 2026",
  description: "Acompanhe o histórico de conferências, revisões de conteúdo e versões publicadas pelo projeto independente Trilha Civil PR.",
  path: "/concursos/pc-pr-2026/atualizacoes",
});
export default function AtualizacoesPage() {
  return <InternalPage path="/concursos/pc-pr-2026/atualizacoes" audited className="internal-page-lot3 internal-page-atualizacoes" title="Atualizações" description="Histórico de alterações do portal com classificação, fonte, conferência e versão."><ol className="updates-timeline" aria-label="Histórico de atualizações, da mais recente para a mais antiga">{atualizacoes.map((item) => <li key={item.id}><InfoCard><div className="flex items-start justify-between gap-3"><h2>{item.titulo}</h2><DataBadge tipo={item.tipo} /></div><p>{item.descricao}</p><div className="internal-stat"><span>Data</span><strong><time dateTime={item.data}>{formatarData(item.data)}</time></strong></div><div className="internal-stat"><span>Fonte</span><strong>{item.fonte}</strong></div>{item.urlFonte ? <a className="source-external-link ds-focusable" href={item.urlFonte} target="_blank" rel="noopener noreferrer">Consultar fonte oficial<ExternalLink aria-hidden="true" className="h-4 w-4" /><span className="sr-only">(abre em nova aba)</span></a> : null}<div className="internal-stat"><span>Conferência</span><strong>{item.responsavelConferencia}</strong></div><div className="internal-stat"><span>Versão</span><strong>{item.versaoPortal}</strong></div><small>{item.observacao}</small></InfoCard></li>)}</ol></InternalPage>;
}
