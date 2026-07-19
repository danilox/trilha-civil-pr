"use client";

import Link from "next/link";
import { Menu, PanelRight, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/etapas", label: "Etapas" },
  { href: "/regioes", label: "Concorrência" },
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
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-lockup focus-ring" aria-label="Trilha Civil PR - página inicial">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span className="brand-copy">
            <strong>Trilha Civil <b>PR</b></strong>
            <small>Informação independente</small>
          </span>
        </Link>

        <nav aria-label="Menu principal" className="desktop-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/#painel-candidato" className="panel-access focus-ring">
            <PanelRight aria-hidden="true" className="h-4 w-4" />
            Acessar painel
          </Link>
          <button
            type="button"
            className="mobile-menu-button focus-ring"
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
        <nav id="menu-movel" aria-label="Menu móvel" className="mobile-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setAberto(false)} className="focus-ring">
              {item.label}
            </Link>
          ))}
          <Link href="/#painel-candidato" onClick={() => setAberto(false)} className="mobile-panel-link focus-ring">
            Acessar painel
          </Link>
        </nav>
      ) : null}
    </header>
  );
}