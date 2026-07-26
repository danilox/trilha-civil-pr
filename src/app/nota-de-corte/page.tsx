import type { Metadata } from "next";
import { DataBadge } from "@/components/data-badge";
import { InfoCard, InfoGrid, InternalPage } from "@/components/internal-page";
import { modalidades, notaMinimaObjetivaAgente, regioesOficiais } from "@/data/edital";
import { formatarNumero } from "@/lib/format";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Nota de Corte PC-PR — Mínimo e Barreiras",
  description: "Consulte a nota mínima objetiva e as cláusulas de barreira cadastradas, sem projeção ou declaração de classificação oficial.",
  path: "/nota-de-corte",
});
export default function NotaDeCortePage() {
  return <InternalPage path="/nota-de-corte" audited className="internal-page-lot2 internal-page-nota" title="Nota de corte" description="O edital traz nota mínima objetiva e limites de classificação por região/modalidade. O portal não calcula resultado oficial."><aside className="internal-alert" role="note">Mínimo objetivo: 50 pontos. Atingir esse mínimo não garante aprovação, convocação ou classificação final.</aside><InfoGrid><InfoCard><div className="flex items-start justify-between gap-3"><h2>{notaMinimaObjetivaAgente.titulo}</h2><DataBadge tipo="oficial" /></div><div className="bar-row"><span>Mínimo</span><i aria-hidden="true" style={{ width: "50%" }} /><b>50</b></div><p>{notaMinimaObjetivaAgente.descricao}</p><small>{notaMinimaObjetivaAgente.fonte}. Item {notaMinimaObjetivaAgente.itemEdital}, página {notaMinimaObjetivaAgente.paginaPdf}.</small></InfoCard>{regioesOficiais.map((regiao) => <InfoCard key={regiao.id}><div className="flex items-start justify-between gap-3"><h2>{regiao.titulo}</h2><DataBadge tipo="oficial" /></div>{modalidades.map((modalidade) => <div key={modalidade.id} className="internal-stat"><span>{modalidade.label}</span><strong>{formatarNumero(regiao.barreiras[modalidade.id])}ª posição</strong></div>)}<p>Inclui candidatos empatados na última posição. A classificação depende das demais fases.</p><small>{regiao.fonte}. Item {regiao.itemEdital}, página {regiao.paginaPdf}.</small></InfoCard>)}</InfoGrid></InternalPage>;
}
