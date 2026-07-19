import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { TitlesCalculator } from "@/components/titles-calculator";
import { limiteTotalTitulos, titulosOficiais } from "@/data/edital";

export const metadata: Metadata = { title: "Títulos | Trilha Civil PR", description: "Tabela oficial e calculadora local da prova de títulos, com limite total de 15,5 pontos.", alternates: { canonical: "/titulos" } };
export default function TitulosPage() {
  return <InternalPage title="Títulos" description="Pontuação oficial da prova de títulos para Agente, com calculadora local sem validação documental."><TitlesCalculator /><InfoGrid>{titulosOficiais.map((item) => <InfoCard key={item.id}><div className="flex items-start justify-between gap-3"><h2>{item.titulo}</h2><DataBadge tipo="oficial" /></div><div className="internal-stat"><span>Tipo</span><strong>{item.tipoTitulo}</strong></div><div className="internal-stat"><span>Pontuação</span><strong>{item.pontosPorUnidade.toLocaleString("pt-BR")} por {item.unidade}</strong></div><div className="internal-stat"><span>Limite</span><strong>{item.limite.toLocaleString("pt-BR")} ponto(s)</strong></div><h3>Comprovação</h3><p>{item.comprovacao}</p><small>{item.fonte}. Item {item.itemEdital}, página {item.paginaPdf}. Total máximo: {limiteTotalTitulos.toLocaleString("pt-BR")} pontos.</small></InfoCard>)}</InfoGrid></InternalPage>;
}