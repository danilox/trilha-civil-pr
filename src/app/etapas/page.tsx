import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { etapasOficiais } from "@/data/edital";

export const metadata: Metadata = { title: "Etapas | Trilha Civil PR", description: "Etapas oficiais do concurso conforme edital, com datas a divulgar quando ainda não houver cronograma oficial.", alternates: { canonical: "/etapas" } };
export default function EtapasPage() {
  return <InternalPage title="Etapas" description="Linha do tempo oficial organizada por fase. Quando não houver data, o portal informa isso explicitamente."><InfoGrid>{etapasOficiais.map((etapa) => <InfoCard key={etapa.id}><div className="flex items-start justify-between gap-3"><span className="internal-number">{String(etapa.ordem).padStart(2, "0")}</span><DataBadge tipo={etapa.tipo} /></div><h2>{etapa.titulo}</h2><p>{etapa.descricao}</p><div className="internal-stat"><span>Período</span><strong>{etapa.periodo}</strong></div><ul>{etapa.checklist.map((item) => <li key={item}>{item}</li>)}</ul><small>{etapa.fonte}. Item {etapa.itemEdital}, página {etapa.paginaPdf}. {etapa.observacao}</small></InfoCard>)}</InfoGrid></InternalPage>;
}