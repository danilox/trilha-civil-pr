"use client";

import { useMemo, useState } from "react";
import { Button, Card, Disclaimer, Input, MetricCard, StatusBadge } from "@/components/ui";
import { calcularPontuacaoTitulos, limiteTotalTitulos, notaFinalMaximaAgente, titulosOficiais } from "@/data/edital";
import { formatarDecimal } from "@/lib/format";

export function TitlesCalculator() {
  const [valores, setValores] = useState<Record<string, number>>({});
  const resultado = useMemo(() => calcularPontuacaoTitulos(valores), [valores]);
  function atualizar(id: string, valor: string) {
    const numero = Number(valor);
    setValores((atual) => ({ ...atual, [id]: Number.isFinite(numero) && numero > 0 ? numero : 0 }));
  }
  return (
    <Card as="section" className="internal-card internal-card-wide" aria-labelledby="titulos-calc-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="titulos-calc-title">Calculadora oficial de títulos</h2>
          <p>Informe quantidades ou anos completos. Cada item é limitado pela tabela oficial e o total máximo é {formatarDecimal(limiteTotalTitulos)} pontos.</p>
        </div>
        <StatusBadge status="active">oficial</StatusBadge>
      </div>
      <div className="calculator-grid">
        {titulosOficiais.map((titulo) => {
          const pontos = resultado.itens.find((item) => item.id === titulo.id)?.pontos ?? 0;
          return (
            <div key={titulo.id} className="grid gap-2">
              <Input label={titulo.titulo} hint={`${titulo.pontosPorUnidade.toLocaleString("pt-BR")} por ${titulo.unidade}; limite ${titulo.limite.toLocaleString("pt-BR")}`} type="number" min="0" step="1" inputMode="numeric" value={valores[titulo.id] ?? ""} onChange={(event) => atualizar(titulo.id, event.target.value)} aria-describedby="titulos-total" />
              <span className="text-xs font-semibold text-white">{formatarDecimal(pontos)} pts</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetricCard label="Total de títulos" value={formatarDecimal(resultado.total)} description={`limite de ${formatarDecimal(limiteTotalTitulos)} pontos`} />
        <MetricCard label="Nota final máxima" value={formatarDecimal(notaFinalMaximaAgente)} description="conforme estrutura oficial" />
      </div>
      <output id="titulos-total" className="calculator-total" aria-live="polite">Total de títulos: {formatarDecimal(resultado.total)} / {formatarDecimal(limiteTotalTitulos)} pontos. Nota final máxima possível: {formatarDecimal(notaFinalMaximaAgente)}.</output>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" variant="secondary" onClick={() => setValores({})}>Limpar</Button>
      </div>
      <Disclaimer className="mt-4">A calculadora não valida documentos; apenas aplica a pontuação e os limites do edital.</Disclaimer>
    </Card>
  );
}
