import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { modalidades, regioesOficiais } from "@/data/edital";
import { formatarNumero } from "@/lib/format";

export const metadata: Metadata = { title: "Regiões | Trilha Civil PR", description: "Distribuição regional oficial, reservas e barreiras para Agente de Polícia Judiciária.", alternates: { canonical: "/regioes" } };
export default function RegioesPage() {
  return <InternalPage title="Regiões" description="Distribuição por macrorregião em cadastro de reserva. Não há vagas numéricas por cidade nesta visualização."><section className="internal-alert">O edital informa cadastro de reserva, 80% para Interior e 20% para Curitiba/RMC, com reservas de 10% para afrodescendentes e 5% para PcD.</section><InfoGrid>{regioesOficiais.map((regiao) => <InfoCard key={regiao.id}><div className="flex items-start justify-between gap-3"><h2>{regiao.titulo}</h2><DataBadge tipo={regiao.tipo} /></div><div className="internal-stat"><span>Distribuição</span><strong>{regiao.percentualDistribuicao}%</strong></div><div className="internal-stat"><span>Afrodescendentes</span><strong>{regiao.reservas.afrodescendente}%</strong></div><div className="internal-stat"><span>PcD</span><strong>{regiao.reservas.pcd}%</strong></div><h3>Cláusula de barreira</h3><ul>{modalidades.map((modalidade) => <li key={modalidade.id}>{modalidade.label}: até a posição {formatarNumero(regiao.barreiras[modalidade.id])}, incluídos empatados na última posição.</li>)}</ul><p>{regiao.observacao}</p><small>{regiao.fonte}. Item {regiao.itemEdital}, página {regiao.paginaPdf}.</small></InfoCard>)}</InfoGrid></InternalPage>;
}