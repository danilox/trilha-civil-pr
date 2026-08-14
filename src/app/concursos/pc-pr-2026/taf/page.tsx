import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { TafSelector } from "@/components/taf-selector";
import { regrasTafOficiais, tafIndices } from "@/data/edital";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "TAF PC-PR — Teste de Aptidão Física",
  description: "Consulte exercícios, critérios informativos e utilize o seletor de acompanhamento do teste de aptidão física.",
  path: "/concursos/pc-pr-2026/taf",
});
export default function TafPage() {
  return <InternalPage path="/concursos/pc-pr-2026/taf" audited className="internal-page-lot2 internal-page-taf" title="TAF" description="Índices oficiais do Anexo IV e regras gerais do Teste de Aptidão Física."><aside className="internal-alert" role="note">Aprovação exige atingir o índice mínimo em todos os exercícios. Confira sempre edital e convocação oficial.</aside><TafSelector /><InfoGrid className="internal-grid-taf"><InfoCard><div className="flex items-start justify-between gap-3"><h2>{regrasTafOficiais.titulo}</h2><DataBadge tipo="oficial" /></div><p>{regrasTafOficiais.descricao}</p><ul><li>Resultado APTO ou INAPTO.</li><li>Obrigatório e eliminatório.</li><li>Atestado médico emitido em até 30 dias antes da etapa, conforme edital.</li><li>Não há segunda chamada fora das hipóteses previstas.</li></ul><small>{regrasTafOficiais.fonte}. Item {regrasTafOficiais.itemEdital}, página {regrasTafOficiais.paginaPdf}.</small></InfoCard><InfoCard><h2>Validação da tabela</h2><p>{tafIndices.length} linhas oficiais cadastradas: cinco masculinas e cinco femininas.</p><p>Exercícios com duas tentativas exibem intervalo mínimo de 10 minutos; Cooper possui tentativa única.</p></InfoCard></InfoGrid></InternalPage>;
}
