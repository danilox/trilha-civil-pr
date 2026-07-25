import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InternalPage } from "@/components/internal-page";
import { atualizacoes } from "@/data/portal";
import { formatarData } from "@/lib/format";

export const metadata: Metadata = { title: "Atualizações | Trilha Civil PR", description: "Histórico de alterações, conferências e versões do portal Trilha Civil PR.", alternates: { canonical: "/atualizacoes" } };
export default function AtualizacoesPage() {
  return <InternalPage audited className="internal-page-lot3 internal-page-atualizacoes" title="Atualizações" description="Histórico de alterações do portal com classificação, fonte, conferência e versão."><ol className="updates-timeline" aria-label="Histórico de atualizações, da mais recente para a mais antiga">{atualizacoes.map((item) => <li key={item.id}><InfoCard><div className="flex items-start justify-between gap-3"><h2>{item.titulo}</h2><DataBadge tipo={item.tipo} /></div><p>{item.descricao}</p><div className="internal-stat"><span>Data</span><strong><time dateTime={item.data}>{formatarData(item.data)}</time></strong></div><div className="internal-stat"><span>Fonte</span><strong>{item.fonte}</strong></div><div className="internal-stat"><span>Conferência</span><strong>{item.responsavelConferencia}</strong></div><div className="internal-stat"><span>Versão</span><strong>{item.versaoPortal}</strong></div><small>{item.observacao}</small></InfoCard></li>)}</ol></InternalPage>;
}
