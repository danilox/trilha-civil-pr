"use client";

import { Calculator, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { limiteTotalTitulos, modalidades, obterBarreira, regioesOficiais } from "@/data/edital";
import { formatarDecimal, formatarNumero } from "@/lib/format";
import type { ModalidadeCota } from "@/types/edital";

const storageKey = "trilha-civil-pr-painel";
const limites = { acertosMin: 0, acertosMax: 100, titulosMin: 0, titulosMax: limiteTotalTitulos };

type PainelState = { regiao: string; modalidade: ModalidadeCota; acertos: string; titulos: string; projetado: boolean };
const estadoInicial: PainelState = { regiao: "regiao-interior", modalidade: "ampla", acertos: "72", titulos: "3", projetado: false };
function normalizarNumero(valor: unknown, fallback: string) { return typeof valor === "number" && Number.isFinite(valor) ? String(valor) : typeof valor === "string" ? valor : fallback; }
function normalizarModalidade(valor: unknown): ModalidadeCota { return modalidades.some((modalidade) => modalidade.id === valor) ? (valor as ModalidadeCota) : estadoInicial.modalidade; }
function lerEstadoInicial(): PainelState {
  if (typeof window === "undefined") return estadoInicial;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) || "{}") as Partial<PainelState> & { acertos?: unknown; titulos?: unknown; modalidade?: unknown };
    return { ...estadoInicial, ...parsed, regiao: regioesOficiais.some((regiao) => regiao.id === parsed.regiao) ? String(parsed.regiao) : estadoInicial.regiao, modalidade: normalizarModalidade(parsed.modalidade), acertos: normalizarNumero(parsed.acertos, estadoInicial.acertos), titulos: normalizarNumero(parsed.titulos, estadoInicial.titulos) };
  } catch { return estadoInicial; }
}
function numeroValido(valor: string, min: number, max: number, inteiro = false) {
  if (valor.trim() === "") return null;
  const numero = Number(valor.replace(",", "."));
  if (!Number.isFinite(numero)) return null;
  const ajustado = Math.min(max, Math.max(min, numero));
  return inteiro ? Math.trunc(ajustado) : Math.round(ajustado * 10) / 10;
}

export function CandidatePanel() {
  const [painel, setPainel] = useState<PainelState>(estadoInicial);
  const [erro, setErro] = useState("");
  const [hidratado, setHidratado] = useState(false);
  useEffect(() => { const frame = window.requestAnimationFrame(() => { setPainel(lerEstadoInicial()); setHidratado(true); }); return () => window.cancelAnimationFrame(frame); }, []);
  useEffect(() => { if (hidratado) window.localStorage.setItem(storageKey, JSON.stringify(painel)); }, [hidratado, painel]);
  const valores = useMemo(() => ({ acertos: numeroValido(painel.acertos, limites.acertosMin, limites.acertosMax, true), titulos: numeroValido(painel.titulos, limites.titulosMin, limites.titulosMax) }), [painel.acertos, painel.titulos]);
  const resultado = useMemo(() => {
    const acertos = valores.acertos ?? 0;
    const titulos = valores.titulos ?? 0;
    const barreira = obterBarreira(painel.regiao, painel.modalidade);
    const notaFinal = acertos + titulos;
    const posicaoEstimada = Math.max(1, Math.round((barreira * 0.18) + Math.max(0, 100 - acertos) * 14 + Math.max(0, limiteTotalTitulos - titulos) * 3));
    const atingiuMinimo = acertos >= 50;
    return { acertos, titulos, barreira, notaFinal, posicaoEstimada, atingiuMinimo, faixa: atingiuMinimo ? "Atingiu o mínimo objetivo" : "Não atingiu o mínimo" };
  }, [painel.modalidade, painel.regiao, valores.acertos, valores.titulos]);
  function projetar() {
    if (valores.acertos === null || valores.titulos === null) { setErro("Informe valores numéricos para acertos e títulos."); return; }
    setErro(""); setPainel((atual) => ({ ...atual, acertos: String(valores.acertos), titulos: String(valores.titulos).replace(".", ","), projetado: true }));
  }
  return (
    <aside className="candidate-panel" aria-labelledby="painel-candidato">
      <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Simulação local</p><h2 id="painel-candidato" className="mt-1 text-xl font-semibold text-white">Painel do candidato</h2></div><div className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white text-black"><Calculator aria-hidden="true" className="h-4 w-4" /></div></div>
      <form className="mt-4 grid gap-3" onSubmit={(event) => { event.preventDefault(); projetar(); }} noValidate>
        <label className="grid gap-1 text-xs font-semibold text-zinc-400">Região<select value={painel.regiao} onChange={(event) => setPainel((atual) => ({ ...atual, regiao: event.target.value }))} className="h-9 border border-white/10 bg-black px-3 text-sm text-white outline-none focus:border-white/40" required>{regioesOficiais.map((regiao) => <option key={regiao.id} value={regiao.id}>{regiao.titulo}</option>)}</select></label>
        <label className="grid gap-1 text-xs font-semibold text-zinc-400">Modalidade<select value={painel.modalidade} onChange={(event) => setPainel((atual) => ({ ...atual, modalidade: event.target.value as ModalidadeCota }))} className="h-9 border border-white/10 bg-black px-3 text-sm text-white outline-none focus:border-white/40" required>{modalidades.map((modalidade) => <option key={modalidade.id} value={modalidade.id}>{modalidade.label}</option>)}</select></label>
        <div className="grid grid-cols-2 gap-3"><label className="grid gap-1 text-xs font-semibold text-zinc-400">Acertos<input aria-describedby="erro-painel ajuda-acertos" inputMode="numeric" type="number" min={limites.acertosMin} max={limites.acertosMax} step="1" value={painel.acertos} onChange={(event) => setPainel((atual) => ({ ...atual, acertos: event.target.value }))} className="h-9 border border-white/10 bg-black px-3 text-sm text-white outline-none focus:border-white/40" required /></label><label className="grid gap-1 text-xs font-semibold text-zinc-400">Títulos<input aria-describedby="erro-painel ajuda-titulos" inputMode="decimal" type="number" min={limites.titulosMin} max={limites.titulosMax} step="0.1" value={painel.titulos.replace(",", ".")} onChange={(event) => setPainel((atual) => ({ ...atual, titulos: event.target.value }))} className="h-9 border border-white/10 bg-black px-3 text-sm text-white outline-none focus:border-white/40" required /></label></div>
        <p id="ajuda-acertos" className="sr-only">Acertos devem ser número inteiro entre zero e cem.</p><p id="ajuda-titulos" className="sr-only">Pontos de títulos devem ficar entre zero e quinze vírgula cinco.</p><p id="erro-painel" className="min-h-5 text-[11px] leading-5 text-zinc-300" aria-live="polite">{erro}</p>
        <button type="submit" className="h-10 border border-white/20 bg-white text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Ver projeção</button>
      </form>
      <div className="mt-4 border border-white/10 bg-black/35 p-3" aria-live="polite"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">Leitura do painel</p><strong className="mt-2 block text-xl font-semibold text-white">{resultado.faixa}</strong><div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-400"><span className="border border-white/10 p-2">Objetiva: {formatarDecimal(resultado.acertos)}</span><span className="border border-white/10 p-2">Títulos: {formatarDecimal(resultado.titulos)}</span><span className="border border-white/10 p-2">Final: {formatarDecimal(resultado.notaFinal)}</span><span className="border border-white/10 p-2">Mínimo: {formatarDecimal(50)}</span><span className="border border-white/10 p-2">Barreira: {formatarNumero(resultado.barreira)}ª</span><span className="border border-white/10 p-2">Estimativa: {formatarNumero(resultado.posicaoEstimada)}ª</span></div><p className="mt-3 text-[11px] leading-5 text-zinc-500">{resultado.atingiuMinimo ? "Atingiu o mínimo oficial de 50 pontos, mas depende da cláusula de barreira, empates e aprovação em todas as demais fases." : "Abaixo de 50 pontos, não atinge o mínimo objetivo previsto para Agente."}</p><p className="mt-2 text-[11px] leading-5 text-zinc-500">A posição é estimada e não oficial. Este painel nunca declara aprovação.</p></div>
      <p className="mt-3 flex items-center gap-2 text-[11px] leading-5 text-zinc-500"><Save aria-hidden="true" className="h-3.5 w-3.5" />Dados salvos somente neste navegador.</p>
    </aside>
  );
}