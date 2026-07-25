"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge, Card, EmptyState, Input } from "@/components/ui";
import { dicas, etapas, exames, locaisExame, regioes } from "@/data/portal";

const documentos = [
  ...etapas.map((item) => ({ titulo: item.titulo, detalhe: item.descricao, grupo: "Etapa", href: "/etapas" })),
  ...regioes.map((item) => ({ titulo: item.nome, detalhe: `${item.concorrencia} candidatos por vaga estimados`, grupo: "Região", href: "/regioes" })),
  ...exames.map((item) => ({ titulo: item.titulo, detalhe: item.resumo, grupo: "Exame", href: "/exames" })),
  ...dicas.map((item) => ({ titulo: item.titulo, detalhe: item.descricao, grupo: "Dica", href: "/dicas" })),
  ...locaisExame.map((item) => ({ titulo: item.nome, detalhe: `${item.cidade} - ${item.observacao}`, grupo: "Local", href: "/dicas" })),
];

export function SearchHub() {
  const [termo, setTermo] = useState("");
  const resultado = documentos.filter((item) =>
    `${item.titulo} ${item.detalhe} ${item.grupo}`.toLowerCase().includes(termo.toLowerCase()),
  );

  return (
    <Card as="section" id="busca" className="search-panel" aria-label="Busca do portal">
      <div className="flex items-end gap-3">
        <Search aria-hidden="true" className="mb-3 h-5 w-5 shrink-0 text-zinc-500" />
        <Input
          label="Buscar no portal"
          value={termo}
          onChange={(event) => setTermo(event.target.value)}
          placeholder="Buscar etapa, exame, região ou documento..."
        />
      </div>

      {termo ? (
        resultado.length ? (
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {resultado.slice(0, 4).map((item) => (
              <Link aria-label={`Abrir ${item.titulo}`} className="search-result-link ds-focusable" href={item.href} key={`${item.grupo}-${item.titulo}`}>
                <Card as="article" padding="sm" interactive>
                  <Badge variant="neutral">{item.grupo}</Badge>
                  <h3 className="mt-2 text-sm font-semibold text-white">{item.titulo}</h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{item.detalhe}</p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState className="mt-4" title="Nenhum resultado encontrado" description="Tente buscar por etapa, exame, região, documento ou local." />
        )
      ) : null}
    </Card>
  );
}
