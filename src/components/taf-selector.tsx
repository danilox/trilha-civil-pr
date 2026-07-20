"use client";

import { useMemo, useState } from "react";
import { Card, Disclaimer, Select, StatusBadge } from "@/components/ui";
import { faixasEtarias, sexosBiologicos, tafIndices } from "@/data/edital";
import type { FaixaEtaria, SexoBiologico } from "@/types/edital";

export function TafSelector() {
  const [sexo, setSexo] = useState<SexoBiologico>("masculino");
  const [faixa, setFaixa] = useState<FaixaEtaria>("ate-29");
  const indices = useMemo(() => tafIndices.filter((item) => item.sexo === sexo).sort((a, b) => a.ordem - b.ordem), [sexo]);
  return (
    <Card as="section" className="internal-card internal-card-wide" aria-labelledby="taf-selector-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="taf-selector-title">Seletor de índices oficiais</h2>
          <p>Consulte os índices oficiais por sexo biológico e faixa etária.</p>
        </div>
        <StatusBadge status="active">oficial</StatusBadge>
      </div>
      <div className="selector-grid">
        <Select label="Sexo biológico" value={sexo} onChange={(event) => setSexo(event.target.value as SexoBiologico)} options={sexosBiologicos.map((item) => ({ label: item.label, value: item.id }))} />
        <Select label="Faixa etária" value={faixa} onChange={(event) => setFaixa(event.target.value as FaixaEtaria)} options={faixasEtarias.map((item) => ({ label: item.label, value: item.id }))} />
      </div>
      <div className="table-wrap"><table className="internal-table"><caption>Índices do TAF para {sexosBiologicos.find((item) => item.id === sexo)?.label} - {faixasEtarias.find((item) => item.id === faixa)?.label}</caption><thead><tr><th>Exercício</th><th>Índice</th><th>Tentativas</th><th>Intervalo</th><th>Critério</th></tr></thead><tbody>{indices.map((item) => <tr key={item.id}><td>{item.exercicio}</td><td>{item.indices[faixa]}</td><td>{item.tentativas}</td><td>{item.intervaloMinutos ? `${item.intervaloMinutos} min` : "tentativa única"}</td><td>{item.criterio}</td></tr>)}</tbody></table></div>
      <Disclaimer className="mt-4">Aprovação exige atingir o índice mínimo em todos os exercícios. O edital e a convocação oficial prevalecem.</Disclaimer>
    </Card>
  );
}
