import { Activity, ArrowRight, FileQuestion, Map, Stethoscope } from "lucide-react";
import Link from "next/link";
import { DataBadge } from "@/components/data-badge";
import { dicas, exames, projecoes, regioes } from "@/data/portal";
import { formatarDecimal, formatarNumero } from "@/lib/format";

export function LowerCards() {
  return (
    <section className="lower-grid" aria-label="Informações complementares">
      <article id="regioes" className="lower-card lower-card-large">
        <div className="flex items-center justify-between gap-4">
          <h2>Candidatos por região</h2>
          <Map aria-hidden="true" className="h-5 w-5 text-zinc-500" />
        </div>
        <div className="concept-map" aria-hidden="true">
          {regioes.slice(0, 5).map((regiao, index) => (
            <span key={regiao.id} style={{ width: `${32 + index * 8}%` }} />
          ))}
        </div>
        <div className="mt-4 grid gap-2">
          {regioes.slice(0, 5).map((regiao) => (
            <div key={regiao.id} className="flex items-center justify-between border-t border-white/10 pt-2 text-sm">
              <span className="text-zinc-300">{regiao.nome}</span>
              <span className="text-zinc-500">{formatarNumero(regiao.inscritosEstimados)} estimados</span>
            </div>
          ))}
        </div>
        <Link href="/regioes" className="inline-link">Ver todas as regiões <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </article>

      <article id="nota-corte" className="lower-card">
        <div className="flex items-center justify-between gap-3">
          <h2>Possível nota de corte</h2>
          <DataBadge tipo="estimativa" />
        </div>
        <div className="mt-5 space-y-4">
          {projecoes.map((projecao) => (
            <div key={projecao.id}>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>{projecao.cargo}</span>
                <span>{formatarDecimal(projecao.notaProvavel)} pts</span>
              </div>
              <div className="mt-2 h-2 bg-zinc-800">
                <div className="h-full bg-white" style={{ width: `${projecao.notaProvavel}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[11px] leading-5 text-zinc-500">Valores demonstrativos e marcados como estimativa.</p>
        <Link href="/nota-de-corte" className="inline-link">Abrir metodologia <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </article>

      <article id="exames" className="lower-card">
        <div className="flex items-center justify-between gap-4">
          <h2>Exames médicos e TAF</h2>
          <Stethoscope aria-hidden="true" className="h-5 w-5 text-zinc-500" />
        </div>
        <ul className="mt-5 grid gap-2 text-sm text-zinc-300">
          {exames.map((exame) => <li key={exame.id} className="border border-white/10 px-3 py-2">{exame.titulo}</li>)}
        </ul>
        <Link href="/exames" className="inline-link">Ver detalhes <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </article>

      <article id="dicas" className="lower-card">
        <div className="flex items-center justify-between gap-4">
          <h2>Dicas úteis</h2>
          <FileQuestion aria-hidden="true" className="h-5 w-5 text-zinc-500" />
        </div>
        <div className="mt-5 grid gap-3">
          {dicas.slice(0, 4).map((dica) => (
            <div key={dica.id} className="border-t border-white/10 pt-3">
              <h3 className="text-sm font-semibold text-white">{dica.titulo}</h3>
              <p className="mt-1 text-xs leading-5 text-zinc-500">{dica.descricao}</p>
            </div>
          ))}
        </div>
        <Link href="/dicas" className="inline-link">Abrir dicas <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </article>

      <article id="taf" className="lower-card taf-card">
        <div className="flex items-center justify-between gap-4">
          <h2>TAF</h2>
          <Activity aria-hidden="true" className="h-5 w-5 text-zinc-500" />
        </div>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          Organize corrida, força e aquecimento em rotina separada da agenda médica. Use apenas os índices publicados na convocação oficial.
        </p>
        <Link href="/taf" className="inline-link">Ver TAF <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </article>

      <article id="titulos" className="lower-card taf-card">
        <h2>Títulos</h2>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          Separe certificados por instituição, carga horária e data de emissão. Pontuação usada aqui é demonstrativa.
        </p>
        <Link href="/titulos" className="inline-link">Ver títulos <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      </article>
    </section>
  );
}
