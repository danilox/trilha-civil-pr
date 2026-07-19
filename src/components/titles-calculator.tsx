"use client";

import { useMemo, useState } from "react";
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
    <section className="internal-card internal-card-wide" aria-labelledby="titulos-calc-title">
      <h2 id="titulos-calc-title">Calculadora oficial de títulos</h2>
      <p>Informe quantidades ou anos completos. Cada item é limitado pela tabela oficial e o total máximo é {formatarDecimal(limiteTotalTitulos)} pontos.</p>
      <div className="calculator-grid">
        {titulosOficiais.map((titulo) => {
          const pontos = resultado.itens.find((item) => item.id === titulo.id)?.pontos ?? 0;
          return <label key={titulo.id}>{titulo.titulo}<span>{titulo.pontosPorUnidade.toLocaleString("pt-BR")} por {titulo.unidade}; limite {titulo.limite.toLocaleString("pt-BR")}</span><input type="number" min="0" step="1" inputMode="numeric" value={valores[titulo.id] ?? ""} onChange={(event) => atualizar(titulo.id, event.target.value)} aria-describedby="titulos-total" /><b>{formatarDecimal(pontos)} pts</b></label>;
        })}
      </div>
      <output id="titulos-total" className="calculator-total" aria-live="polite">Total de títulos: {formatarDecimal(resultado.total)} / {formatarDecimal(limiteTotalTitulos)} pontos. Nota final máxima possível: {formatarDecimal(notaFinalMaximaAgente)}.</output>
      <p className="mt-4 text-sm leading-6 text-zinc-400">A calculadora não valida documentos; apenas aplica a pontuação e os limites do edital.</p>
    </section>
  );
}