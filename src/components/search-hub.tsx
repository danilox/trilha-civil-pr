"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { dicas, etapas, exames, locaisExame, regioes } from "@/data/portal";

const documentos = [
  ...etapas.map((item) => ({ titulo: item.titulo, detalhe: item.descricao, grupo: "Etapa" })),
  ...regioes.map((item) => ({ titulo: item.nome, detalhe: `${item.concorrencia} candidatos por vaga estimados`, grupo: "Região" })),
  ...exames.map((item) => ({ titulo: item.titulo, detalhe: item.resumo, grupo: "Exame" })),
  ...dicas.map((item) => ({ titulo: item.titulo, detalhe: item.descricao, grupo: "Dica" })),
  ...locaisExame.map((item) => ({ titulo: item.nome, detalhe: `${item.cidade} - ${item.observacao}`, grupo: "Local" })),
];

export function SearchHub() {
  const [termo, setTermo] = useState("");
  const resultado = documentos.filter((item) =>
    `${item.titulo} ${item.detalhe} ${item.grupo}`.toLowerCase().includes(termo.toLowerCase()),
  );

  return (
    <section id="busca" className="search-panel">
      <label htmlFor="busca-portal" className="sr-only">Buscar etapa, exame, região ou documento</label>
      <div className="flex items-center gap-3">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-zinc-500" />
        <input
          id="busca-portal"
          value={termo}
          onChange={(event) => setTermo(event.target.value)}
          className="w-full bg-transparent text-base font-medium text-white outline-none placeholder:text-zinc-600 sm:text-lg"
          placeholder="Buscar etapa, exame, região ou documento..."
        />
      </div>

      {termo ? (
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {resultado.slice(0, 4).map((item) => (
            <article key={`${item.grupo}-${item.titulo}`} className="border border-white/10 bg-black/35 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">{item.grupo}</p>
              <h3 className="mt-1 text-sm font-semibold text-white">{item.titulo}</h3>
              <p className="mt-1 text-xs leading-5 text-zinc-400">{item.detalhe}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
