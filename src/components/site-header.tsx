"use client";

import Link from "next/link";
import { Menu, PanelRight, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/etapas", label: "Etapas" },
  { href: "/regioes", label: "Regiões" },
  { href: "/nota-de-corte", label: "Nota de Corte" },
  { href: "/exames", label: "Exames" },
  { href: "/taf", label: "TAF" },
  { href: "/titulos", label: "Títulos" },
  { href: "/dicas", label: "Dicas" },
  { href: "/atualizacoes", label: "Atualizações" },
];

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1540px] items-center justify-between px-4 sm:px-5 xl:px-6">
        <Link href="/" className="flex min-w-44 flex-col leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <span className="text-sm font-semibold tracking-[0.08em]">Trilha Civil PR</span>
          <span className="text-[11px] text-zinc-500">Da inscrição à nomeação</span>
        </Link>

        <nav aria-label="Menu principal" className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#painel-candidato" className="hidden h-9 items-center gap-2 border border-white/15 bg-white px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:inline-flex">
            <PanelRight aria-hidden="true" className="h-3.5 w-3.5" />
            Acessar painel
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center border border-white/15 bg-zinc-950 text-white xl:hidden"
            onClick={() => setAberto((valor) => !valor)}
            aria-expanded={aberto}
            aria-controls="menu-movel"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          >
            {aberto ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {aberto ? (
        <nav id="menu-movel" aria-label="Menu móvel" className="grid gap-1 border-t border-white/10 bg-black px-4 py-3 xl:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setAberto(false)}
              className="border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#painel-candidato" onClick={() => setAberto(false)} className="border border-white/20 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black">
            Acessar painel
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

