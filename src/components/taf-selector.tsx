"use client";

import { useMemo, useState } from "react";
import { Card, Disclaimer, Select, StatusBadge } from "@/components/ui";
import { faixasEtarias, sexosBiologicos, tafIndices } from "@/data/edital";
import type { FaixaEtaria, SexoBiologico } from "@/types/edital";

export function TafSelector() {
  const [sexo, setSexo] = useState<SexoBiologico>("masculino");
  const [faixa, setFaixa] = useState<FaixaEtaria>("ate-29");
  const indices = useMemo(() => tafIndices.filter((item) => item.sexo === sexo).sort((a, b) => a.ordem - b.ordem), [sexo]);
  const sexoLabel = sexosBiologicos.find((item) => item.id === sexo)?.label;
  const faixaLabel = faixasEtarias.find((item) => item.id === faixa)?.label;
  return (
    <Card as="section" className="internal-card internal-card-wide taf-selector-card" aria-labelledby="taf-selector-title">
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
      <p id="taf-table-help" className="table-scroll-hint">A tabela pode ser percorrida horizontalmente em telas menores.</p>
      <p className="sr-only" aria-live="polite">Índices exibidos para {sexoLabel}, faixa etária {faixaLabel}.</p>
      <div className="table-wrap" role="region" aria-labelledby="taf-table-caption" aria-describedby="taf-table-help" tabIndex={0}><table className="internal-table"><caption id="taf-table-caption">Índices do TAF para {sexoLabel} - {faixaLabel}</caption><thead><tr><th scope="col">Exercício</th><th scope="col">Índice</th><th scope="col">Tentativas</th><th scope="col">Intervalo</th><th scope="col">Critério</th></tr></thead><tbody>{indices.map((item) => <tr key={item.id}><th scope="row">{item.exercicio}</th><td>{item.indices[faixa]}</td><td>{item.tentativas}</td><td>{item.intervaloMinutos ? `${item.intervaloMinutos} min` : "tentativa única"}</td><td>{item.criterio}</td></tr>)}</tbody></table></div>
      <Disclaimer className="mt-4">Aprovação exige atingir o índice mínimo em todos os exercícios. O edital e a convocação oficial prevalecem.</Disclaimer>
    </Card>
  );
}
