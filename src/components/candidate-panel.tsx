"use client";

import { Calculator, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card, Button, Disclaimer, Input, MetricCard, Select, StatusBadge } from "@/components/ui";
import { limiteTotalTitulos, modalidades, obterBarreira, regioesOficiais } from "@/data/edital";
import { formatarDecimal, formatarNumero } from "@/lib/format";
import type { ModalidadeCota } from "@/types/edital";

const storageKey = "trilha-civil-pr-painel";
const limites = { acertosMin: 0, acertosMinimo: 50, acertosMax: 100, titulosMin: 0, titulosMax: limiteTotalTitulos };

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
function classificarResultado(acertos: number, titulos: number, notaFinal: number) {
  if (acertos === limites.acertosMax && titulos === limites.titulosMax) {
    return {
      badge: "máximo",
      faixa: "Pontuação máxima simulada",
      status: "active" as const,
      explicacao: `Você informou ${limites.acertosMax} acertos e ${formatarDecimal(limites.titulosMax)} pontos em títulos, atingindo o máximo aceito por este simulador. Total simulado: ${formatarDecimal(notaFinal)} pontos.`,
    };
  }
  if (acertos === limites.acertosMax) {
    return {
      badge: "objetiva máxima",
      faixa: "Pontuação máxima na prova objetiva",
      status: "info" as const,
      explicacao: `Você informou ${limites.acertosMax} acertos na prova objetiva. Os ${formatarDecimal(titulos)} pontos em títulos compõem apenas esta simulação e não representam nota final oficial.`,
    };
  }
  if (acertos > limites.acertosMinimo) {
    return {
      badge: "acima do mínimo",
      faixa: "Superou o mínimo objetivo",
      status: "success" as const,
      explicacao: "Superar o mínimo objetivo não garante classificação, convocação ou vaga. O resultado ainda depende da cláusula de barreira, dos empates e da aprovação nas demais fases.",
    };
  }
  if (acertos === limites.acertosMinimo) {
    return {
      badge: "mínimo",
      faixa: "Atingiu o mínimo objetivo",
      status: "success" as const,
      explicacao: `Atingiu o mínimo oficial de ${limites.acertosMinimo} pontos, mas isso não garante classificação, convocação ou vaga e ainda depende das demais fases.`,
    };
  }
  return {
    badge: "atenção",
    faixa: "Não atingiu o mínimo objetivo",
    status: "danger" as const,
    explicacao: `A pontuação informada está abaixo do mínimo objetivo de ${limites.acertosMinimo} pontos. Consulte o edital e os canais oficiais para acompanhar as regras e as demais fases.`,
  };
}

export function CandidatePanel() {
  const [painel, setPainel] = useState<PainelState>(estadoInicial);
  const [erro, setErro] = useState("");
  const [hidratado, setHidratado] = useState(false);
  useEffect(() => { const frame = window.requestAnimationFrame(() => { setPainel(lerEstadoInicial()); setHidratado(true); }); return () => window.cancelAnimationFrame(frame); }, []);
  useEffect(() => { if (hidratado) window.localStorage.setItem(storageKey, JSON.stringify(painel)); }, [hidratado, painel]);
  const valores = useMemo(() => ({ acertos: numeroValido(painel.acertos, limites.acertosMin, limites.acertosMax, true), titulos: numeroValido(painel.titulos, limites.titulosMin, limites.titulosMax) }), [painel.acertos, painel.titulos]);
  const acertosInvalidos = Boolean(erro) && valores.acertos === null;
  const titulosInvalidos = Boolean(erro) && valores.titulos === null;
  const resultado = useMemo(() => {
    const acertos = valores.acertos ?? 0;
    const titulos = valores.titulos ?? 0;
    const barreira = obterBarreira(painel.regiao, painel.modalidade);
    const notaFinal = acertos + titulos;
    const posicaoEstimada = Math.max(1, Math.round((barreira * 0.18) + Math.max(0, 100 - acertos) * 14 + Math.max(0, limiteTotalTitulos - titulos) * 3));
    return { acertos, titulos, barreira, notaFinal, posicaoEstimada, ...classificarResultado(acertos, titulos, notaFinal) };
  }, [painel.modalidade, painel.regiao, valores.acertos, valores.titulos]);
  function projetar() {
    if (valores.acertos === null || valores.titulos === null) { setErro("Informe valores numéricos para acertos e títulos."); return; }
    setErro(""); setPainel((atual) => ({ ...atual, acertos: String(valores.acertos), titulos: String(valores.titulos).replace(".", ","), projetado: true }));
  }
  return (
    <Card as="aside" className="candidate-panel" aria-labelledby="painel-candidato" padding="md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Simulação local</p>
          <h2 id="painel-candidato" className="mt-1 text-xl font-semibold text-white">Painel do candidato</h2>
        </div>
        <div className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white text-black"><Calculator aria-hidden="true" className="h-4 w-4" /></div>
      </div>
      <form className="mt-4 grid gap-3" onSubmit={(event) => { event.preventDefault(); projetar(); }} noValidate>
        <Select label="Região" value={painel.regiao} onChange={(event) => setPainel((atual) => ({ ...atual, regiao: event.target.value }))} required options={regioesOficiais.map((regiao) => ({ label: regiao.titulo, value: regiao.id }))} />
        <Select label="Modalidade" value={painel.modalidade} onChange={(event) => setPainel((atual) => ({ ...atual, modalidade: event.target.value as ModalidadeCota }))} required options={modalidades.map((modalidade) => ({ label: modalidade.label, value: modalidade.id }))} />
        <div className="grid grid-cols-2 gap-3">
          <Input id="painel-acertos" label="Acertos" hint="Inteiro entre 0 e 100." aria-invalid={acertosInvalidos || undefined} aria-describedby={`painel-acertos-hint${acertosInvalidos ? " erro-painel" : ""}`} inputMode="numeric" type="number" min={limites.acertosMin} max={limites.acertosMax} step="1" value={painel.acertos} onChange={(event) => setPainel((atual) => ({ ...atual, acertos: event.target.value }))} required />
          <Input id="painel-titulos" label="Títulos" hint={`Até ${formatarDecimal(limites.titulosMax)} pontos.`} aria-invalid={titulosInvalidos || undefined} aria-describedby={`painel-titulos-hint${titulosInvalidos ? " erro-painel" : ""}`} inputMode="decimal" type="number" min={limites.titulosMin} max={limites.titulosMax} step="0.1" value={painel.titulos.replace(",", ".")} onChange={(event) => setPainel((atual) => ({ ...atual, titulos: event.target.value }))} required />
        </div>
        <p id="erro-painel" className="min-h-5 text-[11px] leading-5 text-zinc-300" aria-live="polite">{erro}</p>
        <Button type="submit" className="w-full">Ver projeção</Button>
      </form>
      <div className="mt-4" aria-live="polite">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">Leitura do painel</p>
            <strong className="mt-2 block text-xl font-semibold text-white">{resultado.faixa}</strong>
          </div>
          <StatusBadge status={resultado.status}>{resultado.badge}</StatusBadge>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <MetricCard label="Objetiva" value={formatarDecimal(resultado.acertos)} description="pontos" />
          <MetricCard label="Títulos" value={formatarDecimal(resultado.titulos)} description="pontos" />
          <MetricCard label="Final" value={formatarDecimal(resultado.notaFinal)} description="nota estimada" />
          <MetricCard label="Mínimo" value={formatarDecimal(limites.acertosMinimo)} description="objetiva" />
          <MetricCard label="Barreira" value={`${formatarNumero(resultado.barreira)}ª`} description="limite oficial" />
          <MetricCard label="Estimativa" value={`${formatarNumero(resultado.posicaoEstimada)}ª`} description="não oficial" />
        </div>
        <p className="mt-3 text-[11px] leading-5 text-zinc-500">{resultado.explicacao}</p>
        <Disclaimer className="mt-3" title="Projeção demonstrativa">A posição é estimada e não oficial. Este painel nunca declara aprovação.</Disclaimer>
      </div>
      <p className="mt-3 flex items-center gap-2 text-[11px] leading-5 text-zinc-500"><Save aria-hidden="true" className="h-3.5 w-3.5" />Dados salvos somente neste navegador.</p>
    </Card>
  );
}
