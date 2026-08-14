import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { TitlesCalculator } from "@/components/titles-calculator";
import { limiteTotalTitulos, titulosOficiais } from "@/data/edital";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Avaliação de Títulos PC-PR",
  description: "Entenda os critérios informativos e simule a pontuação de títulos utilizando a calculadora do projeto.",
  path: "/concursos/pc-pr-2026/titulos",
});
export default function TitulosPage() {
  return <InternalPage path="/concursos/pc-pr-2026/titulos" audited className="internal-page-lot3 internal-page-titulos" title="Títulos" description="Pontuação oficial da prova de títulos para Agente, com calculadora local sem validação documental."><TitlesCalculator /><InfoGrid className="internal-grid-titulos">{titulosOficiais.map((item) => <InfoCard key={item.id}><div className="flex items-start justify-between gap-3"><h2>{item.titulo}</h2><DataBadge tipo="oficial" /></div><div className="internal-stat"><span>Tipo</span><strong>{item.tipoTitulo}</strong></div><div className="internal-stat"><span>Pontuação</span><strong>{item.pontosPorUnidade.toLocaleString("pt-BR")} por {item.unidade}</strong></div><div className="internal-stat"><span>Limite</span><strong>{item.limite.toLocaleString("pt-BR")} ponto(s)</strong></div><h3>Comprovação</h3><p>{item.comprovacao}</p><small>{item.fonte}. Item {item.itemEdital}, página {item.paginaPdf}. Total máximo: {limiteTotalTitulos.toLocaleString("pt-BR")} pontos.</small></InfoCard>)}</InfoGrid></InternalPage>;
}
