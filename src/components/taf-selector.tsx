"use client";

import { useMemo, useState } from "react";
import { faixasEtarias, sexosBiologicos, tafIndices } from "@/data/edital";
import type { FaixaEtaria, SexoBiologico } from "@/types/edital";

export function TafSelector() {
  const [sexo, setSexo] = useState<SexoBiologico>("masculino");
  const [faixa, setFaixa] = useState<FaixaEtaria>("ate-29");
  const indices = useMemo(() => tafIndices.filter((item) => item.sexo === sexo).sort((a, b) => a.ordem - b.ordem), [sexo]);
  return (
    <section className="internal-card internal-card-wide" aria-labelledby="taf-selector-title">
      <h2 id="taf-selector-title">Seletor de índices oficiais</h2>
      <div className="selector-grid">
        <label>Sexo biológico<select value={sexo} onChange={(event) => setSexo(event.target.value as SexoBiologico)}>{sexosBiologicos.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <label>Faixa etária<select value={faixa} onChange={(event) => setFaixa(event.target.value as FaixaEtaria)}>{faixasEtarias.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
      </div>
      <div className="table-wrap"><table className="internal-table"><caption>Índices do TAF para {sexosBiologicos.find((item) => item.id === sexo)?.label} - {faixasEtarias.find((item) => item.id === faixa)?.label}</caption><thead><tr><th>Exercício</th><th>Índice</th><th>Tentativas</th><th>Intervalo</th><th>Critério</th></tr></thead><tbody>{indices.map((item) => <tr key={item.id}><td>{item.exercicio}</td><td>{item.indices[faixa]}</td><td>{item.tentativas}</td><td>{item.intervaloMinutos ? `${item.intervaloMinutos} min` : "tentativa única"}</td><td>{item.criterio}</td></tr>)}</tbody></table></div>
      <p className="mt-4 text-sm leading-6 text-zinc-400">Aprovação exige atingir o índice mínimo em todos os exercícios. O edital e a convocação oficial prevalecem.</p>
    </section>
  );
}