"use client";

import { Calculator, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { regioes } from "@/data/portal";

const storageKey = "trilha-civil-pr-painel";
const limites = { acertosMin: 0, acertosMax: 100, titulosMin: 0, titulosMax: 20 };

type PainelState = {
  regiao: string;
  modalidade: string;
  acertos: string;
  titulos: string;
  projetado: boolean;
};

const estadoInicial: PainelState = {
  regiao: "Curitiba",
  modalidade: "Ampla concorrência",
  acertos: "72",
  titulos: "3",
  projetado: false,
};

function normalizarNumero(valor: unknown, fallback: string) {
  if (typeof valor === "number" && Number.isFinite(valor)) return String(valor);
  if (typeof valor === "string") return valor;
  return fallback;
}

function lerEstadoInicial(): PainelState {
  if (typeof window === "undefined") return estadoInicial;
  try {
    const salvo = window.localStorage.getItem(storageKey);
    if (!salvo) return estadoInicial;
    const parsed = JSON.parse(salvo) as Partial<PainelState> & { acertos?: unknown; titulos?: unknown };
    return {
      ...estadoInicial,
      ...parsed,
      acertos: normalizarNumero(parsed.acertos, estadoInicial.acertos),
      titulos: normalizarNumero(parsed.titulos, estadoInicial.titulos),
    };
  } catch {
    return estadoInicial;
  }
}

function numeroValido(valor: string, min: number, max: number) {
  if (valor.trim() === "") return null;
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return null;
  return Math.min(max, Math.max(min, numero));
}

export function CandidatePanel() {
  const [painel, setPainel] = useState<PainelState>(estadoInicial);
  const [erro, setErro] = useState("");
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setPainel(lerEstadoInicial());
      setHidratado(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hidratado) {
      window.localStorage.setItem(storageKey, JSON.stringify(painel));
    }
  }, [hidratado, painel]);

  const valores = useMemo(() => ({
    acertos: numeroValido(painel.acertos, limites.acertosMin, limites.acertosMax),
    titulos: numeroValido(painel.titulos, limites.titulosMin, limites.titulosMax),
  }), [painel.acertos, painel.titulos]);

  const projecao = useMemo(() => {
    const regiao = regioes.find((item) => item.nome === painel.regiao) ?? regioes[0];
    const acertos = valores.acertos ?? 0;
    const titulos = valores.titulos ?? 0;
    const pontos = acertos + titulos;
    const posicao = Math.max(12, Math.round(regiao.concorrencia * 1.8 - pontos));
    const faixa = pontos >= 80 ? "Alta competitividade" : pontos >= 72 ? "Faixa provável" : "Faixa de atenção";
    return { pontos, posicao, faixa };
  }, [painel.regiao, valores.acertos, valores.titulos]);

  function projetar() {
    if (valores.acertos === null || valores.titulos === null) {
      setErro("Informe valores numéricos para acertos e títulos.");
      return;
    }
    setErro("");
    setPainel((atual) => ({
      ...atual,
      acertos: String(valores.acertos),
      titulos: String(valores.titulos),
      projetado: true,
    }));
  }

  return (
    <aside className="candidate-panel" aria-labelledby="painel-candidato">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Simulação local</p>
          <h2 id="painel-candidato" className="mt-1 text-xl font-semibold text-white">Painel do candidato</h2>
        </div>
        <div className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white text-black">
          <Calculator aria-hidden="true" className="h-4 w-4" />
        </div>
      </div>

      <form className="mt-4 grid gap-3" onSubmit={(event) => { event.preventDefault(); projetar(); }} noValidate>
        <label className="grid gap-1 text-xs font-semibold text-zinc-400">
          Região
          <select value={painel.regiao} onChange={(event) => setPainel((atual) => ({ ...atual, regiao: event.target.value }))} className="h-9 border border-white/10 bg-black px-3 text-sm text-white outline-none focus:border-white/40" required>
            {regioes.map((regiao) => <option key={regiao.id}>{regiao.nome}</option>)}
          </select>
        </label>

        <label className="grid gap-1 text-xs font-semibold text-zinc-400">
          Modalidade
          <select value={painel.modalidade} onChange={(event) => setPainel((atual) => ({ ...atual, modalidade: event.target.value }))} className="h-9 border border-white/10 bg-black px-3 text-sm text-white outline-none focus:border-white/40" required>
            <option>Ampla concorrência</option>
            <option>Reserva legal</option>
            <option>Condição específica</option>
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1 text-xs font-semibold text-zinc-400">
            Acertos estimados
            <input aria-describedby="erro-painel ajuda-acertos" inputMode="numeric" type="number" min={limites.acertosMin} max={limites.acertosMax} value={painel.acertos} onChange={(event) => setPainel((atual) => ({ ...atual, acertos: event.target.value }))} className="h-9 border border-white/10 bg-black px-3 text-sm text-white outline-none focus:border-white/40" required />
          </label>
          <label className="grid gap-1 text-xs font-semibold text-zinc-400">
            Pontos de títulos
            <input aria-describedby="erro-painel ajuda-titulos" inputMode="decimal" type="number" min={limites.titulosMin} max={limites.titulosMax} value={painel.titulos} onChange={(event) => setPainel((atual) => ({ ...atual, titulos: event.target.value }))} className="h-9 border border-white/10 bg-black px-3 text-sm text-white outline-none focus:border-white/40" required />
          </label>
        </div>
        <p id="ajuda-acertos" className="sr-only">Acertos devem ficar entre zero e cem.</p>
        <p id="ajuda-titulos" className="sr-only">Pontos de títulos devem ficar entre zero e vinte.</p>
        <p id="erro-painel" className="min-h-5 text-[11px] leading-5 text-zinc-300" aria-live="polite">{erro}</p>

        <button type="submit" className="h-10 border border-white/20 bg-white text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          Ver projeção
        </button>
      </form>

      <div className="mt-4 border border-white/10 bg-black/35 p-3" aria-live="polite">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">Possível faixa de classificação</p>
        <strong className="mt-2 block text-2xl font-semibold text-white">{projecao.faixa}</strong>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-400">
          <span className="border border-white/10 p-2">{projecao.pontos} pontos</span>
          <span className="border border-white/10 p-2">posição {projecao.posicao}</span>
        </div>
        <p className="mt-3 text-[11px] leading-5 text-zinc-500">Estimativa demonstrativa. Não substitui resultado oficial, edital ou publicação da banca.</p>
      </div>

      <p className="mt-3 flex items-center gap-2 text-[11px] leading-5 text-zinc-500">
        <Save aria-hidden="true" className="h-3.5 w-3.5" />
        Dados salvos somente neste navegador.
      </p>
    </aside>
  );
}