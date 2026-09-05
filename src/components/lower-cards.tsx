import { Activity, ArrowRight, FileQuestion, Map, Stethoscope } from "lucide-react";
import Link from "next/link";
import { DataBadge } from "@/components/data-badge";
import { Badge, Card, Disclaimer, StatusBadge } from "@/components/ui";
import { limiteTotalTitulos, notaMinimaObjetivaAgente, regioesOficiais } from "@/data/edital";
import { dicas, exames } from "@/data/portal";
import { formatarNumero } from "@/lib/format";
import { guidePath } from "@/config/site-config";

export function LowerCards() {
  return (
    <section className="lower-grid" aria-label="Informações complementares">
      <Card as="article" id="regioes" className="lower-card lower-card-large" interactive>
        <div className="flex items-center justify-between gap-4"><h2>Distribuição regional</h2><Map aria-hidden="true" className="h-5 w-5 text-zinc-500" /></div>
        <div className="concept-map" aria-hidden="true">{regioesOficiais.map((regiao) => <span key={regiao.id} style={{ width: `${regiao.percentualDistribuicao}%` }} />)}</div>
        <div className="mt-4 grid gap-2">{regioesOficiais.map((regiao) => <div key={regiao.id} className="flex items-center justify-between border-t border-white/10 pt-2 text-sm"><span className="text-zinc-300">{regiao.titulo}</span><Badge variant="accent">{regiao.percentualDistribuicao}% oficiais</Badge></div>)}</div>
        <p className="mt-4 text-[11px] leading-5 text-zinc-500">Cadastro de reserva. Não há vagas numéricas por cidade nesta visualização.</p>
        <Link href={guidePath("/regioes")} className="inline-link ds-focusable">Ver regiões <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </Card>
      <Card as="article" id="nota-corte" className="lower-card" interactive>
        <div className="flex items-center justify-between gap-3"><h2>Nota mínima e barreira</h2><DataBadge tipo="oficial" /></div>
        <div className="mt-5 space-y-4"><div><div className="flex justify-between text-xs text-zinc-400"><span>{notaMinimaObjetivaAgente.titulo}</span><span>50 pts</span></div><div className="mt-2 h-2 bg-zinc-800"><div className="h-full bg-white" style={{ width: "50%" }} /></div></div>{regioesOficiais.map((regiao) => <div key={regiao.id} className="text-xs text-zinc-400"><strong className="text-white">{regiao.titulo}</strong>: ampla {formatarNumero(regiao.barreiras.ampla)}ª, afro {formatarNumero(regiao.barreiras.afrodescendente)}ª, PcD {formatarNumero(regiao.barreiras.pcd)}ª</div>)}</div>
        <Disclaimer className="mt-5" title="Classificação não oficial">Empatados na última posição são incluídos. O painel local não gera classificação oficial.</Disclaimer>
        <Link href={guidePath("/nota-de-corte")} className="inline-link ds-focusable">Abrir barreiras <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </Card>
      <Card as="article" id="exames" className="lower-card" interactive>
        <div className="flex items-center justify-between gap-4"><h2>Exames médicos</h2><Stethoscope aria-hidden="true" className="h-5 w-5 text-zinc-500" /></div>
        <Badge variant="neutral">Aguardando convocação</Badge>
        <p className="mt-4 text-sm leading-6 text-zinc-400">Etapa posterior à prova objetiva. Acompanhe a convocação oficial antes de realizar exames.</p>
        <ul className="mt-5 grid gap-2 text-sm text-zinc-300">{exames.slice(0, 5).map((exame) => <li key={exame.id}><Badge variant="neutral">{exame.titulo}</Badge></li>)}</ul>
        <Link href={guidePath("/exames")} className="inline-link ds-focusable">Ver detalhes <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </Card>
      <Card as="article" id="dicas" className="lower-card" interactive>
        <div className="flex items-center justify-between gap-4"><h2>Reta final</h2><FileQuestion aria-hidden="true" className="h-5 w-5 text-zinc-500" /></div>
        <div className="mt-5 grid gap-3">{dicas.slice(0, 4).map((dica) => <div key={dica.id} className="border-t border-white/10 pt-3"><StatusBadge status="info">{dica.categoria}</StatusBadge><h3 className="mt-2 text-sm font-semibold text-white">{dica.titulo}</h3><p className="mt-1 text-xs leading-5 text-zinc-500">{dica.descricao}</p></div>)}</div>
        <Link href={guidePath("/dicas")} className="inline-link ds-focusable">Abrir dicas <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </Card>
      <Card as="article" id="taf" className="lower-card taf-card" interactive><div className="flex items-center justify-between gap-4"><h2>TAF</h2><Activity aria-hidden="true" className="h-5 w-5 text-zinc-500" /></div><Badge variant="accent">Prepare-se com antecedência</Badge><p className="mt-4 text-sm leading-6 text-zinc-400">Etapa futura. Índices oficiais por sexo biológico e faixa etária; aprovação exige cumprir todos os exercícios.</p><Link href={guidePath("/taf")} className="inline-link ds-focusable">Ver índices oficiais <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link></Card>
      <Card as="article" id="titulos" className="lower-card taf-card" interactive><h2>Títulos</h2><Badge variant="neutral">Edital retificado</Badge><p className="mt-4 text-sm leading-6 text-zinc-400">Tabela oficial com limite total de {limiteTotalTitulos.toLocaleString("pt-BR")} pontos. Confira regras sensíveis contra o edital vigente e retificações.</p><Link href={guidePath("/titulos")} className="inline-link ds-focusable">Ver títulos <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link></Card>
    </section>
  );
}
