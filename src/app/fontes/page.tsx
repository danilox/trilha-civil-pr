import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { fontesRegistros, ultimaAtualizacao } from "@/data/portal";
import { formatarData } from "@/lib/format";

export const metadata: Metadata = { title: "Fontes e metodologia | Trilha Civil PR", description: "Transparência das fontes oficiais, estimativas locais e demonstrações do portal independente.", alternates: { canonical: "/fontes" } };
export default function FontesPage() {
  return <InternalPage title="Fontes e metodologia" description="Classificação das informações, limites das projeções e critérios de atualização do portal."><section className="internal-alert">Projeto independente. Informações oficiais vêm do edital, banca e órgãos competentes. Projeções não representam classificação oficial. Locais para exames são exemplos informativos/fictícios nesta versão. Última atualização: {formatarData(ultimaAtualizacao)}.</section><InfoGrid>{fontesRegistros.map((registro) => <InfoCard key={registro.id}><div className="flex items-start justify-between gap-3"><h2>{registro.informacao}</h2><DataBadge tipo={registro.classificacao} /></div><div className="internal-stat"><span>Fonte</span><strong>{registro.fonte}</strong></div><div className="internal-stat"><span>Data de publicação</span><strong>{registro.dataPublicacao}</strong></div><div className="internal-stat"><span>Data de conferência</span><strong>{formatarData(registro.dataConferencia)}</strong></div><p>{registro.observacao}</p></InfoCard>)}</InfoGrid></InternalPage>;
}