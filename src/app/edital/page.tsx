import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { dadosGeraisEdital, disciplinasAgente, DOCUMENTO_EDITAL, inscricoesEProva, regioesOficiais, URL_FONTE_FGV } from "@/data/edital";
import { formatarData } from "@/lib/format";

export const metadata: Metadata = { title: "Edital | Trilha Civil PR", description: "Identificação do edital, itens utilizados, dados oficiais conferidos e link para a página oficial da FGV.", alternates: { canonical: "/edital" } };
export default function EditalPage() {
  return (
    <InternalPage title="Edital" description="Dados oficiais extraídos do edital cadastrado localmente. O PDF local não é publicado pelo portal." audited>
      <aside className="internal-alert" role="note">O portal é independente e não oficial. Verifique retificações, anexos e convocações diretamente na FGV. <a className="internal-inline-link ds-focusable" href={URL_FONTE_FGV} target="_blank" rel="noopener noreferrer">Abrir página oficial da FGV</a>.</aside>
      <InfoGrid>
        <InfoCard><div className="flex items-start justify-between gap-3"><h2>{DOCUMENTO_EDITAL}</h2><DataBadge tipo="oficial" /></div><p>Fonte oficial usada para migrar dados gerais, inscrições, prova, regiões, barreiras, exames, TAF e títulos.</p><div className="internal-stat"><span>Data de conferência</span><strong>{formatarData(inscricoesEProva.referencia.dataConferencia)}</strong></div><small>{inscricoesEProva.referencia.fonte}. Item {inscricoesEProva.referencia.itemEdital}, página {inscricoesEProva.referencia.paginaPdf}.</small></InfoCard>
        <InfoCard><h2>Índice por assunto</h2><ul><li>Dados gerais e requisitos</li><li>Inscrições e prova objetiva</li><li>Distribuição regional e reservas</li><li>Cláusula de barreira</li><li>Inspeção de saúde e Anexo V</li><li>TAF e Anexo IV</li><li>Avaliação de títulos</li></ul></InfoCard>
        <InfoCard><h2>Prova objetiva</h2><p>{inscricoesEProva.questoes} questões, {inscricoesEProva.pontos} pontos, {inscricoesEProva.alternativas} alternativas e {inscricoesEProva.respostasCorretas} resposta correta.</p><p>Cidades: {inscricoesEProva.cidades.join(", ")}.</p><small>Itens {inscricoesEProva.referencia.itemEdital}; página {inscricoesEProva.referencia.paginaPdf}.</small></InfoCard>
        <InfoCard><h2>Distribuição regional</h2><ul>{regioesOficiais.map((regiao) => <li key={regiao.id}>{regiao.titulo}: {regiao.percentualDistribuicao}% em cadastro de reserva.</li>)}</ul></InfoCard>
        <InfoCard><h2>Itens utilizados</h2><ul>{dadosGeraisEdital.slice(0, 8).map((dado) => <li key={dado.id}>{dado.titulo}: item {dado.itemEdital}, página {dado.paginaPdf}</li>)}</ul></InfoCard>
        <InfoCard><h2>Disciplinas</h2><ul>{disciplinasAgente.map((disciplina) => <li key={disciplina.id}>{disciplina.titulo}: {disciplina.questoes} questões</li>)}</ul></InfoCard>
      </InfoGrid>
    </InternalPage>
  );
}
