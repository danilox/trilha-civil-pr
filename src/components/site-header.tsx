"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PanelRight, X } from "lucide-react";
import { useState } from "react";
import { Button, NavigationItem } from "@/components/ui";
import { guidePath } from "@/config/site-config";

const navItems = [
  { href: guidePath(), label: "Início" },
  { href: guidePath("/etapas"), label: "Etapas" },
  { href: guidePath("/regioes"), label: "Concorrência" },
  { href: guidePath("/nota-de-corte"), label: "Nota de Corte" },
  { href: guidePath("/exames"), label: "Exames" },
  { href: guidePath("/taf"), label: "TAF" },
  { href: guidePath("/titulos"), label: "Títulos" },
  { href: guidePath("/dicas"), label: "Dicas" },
  { href: guidePath("/atualizacoes"), label: "Atualizações" },
];

function isActive(pathname: string, href: string) {
  return href === guidePath() ? pathname === href : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href={guidePath()} className="brand-lockup ds-focusable" aria-label="Guia PC-PR 2026 - página inicial">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span className="brand-copy">
            <strong>PC-PR <b>2026</b></strong>
            <small>Um guia da Edital no Controle</small>
          </span>
        </Link>

        <nav aria-label="Menu principal" className="desktop-nav">
          {navItems.map((item) => (
            <NavigationItem key={item.href} href={item.href} active={isActive(pathname, item.href)}>
              {item.label}
            </NavigationItem>
          ))}
        </nav>

        <div className="header-actions">
          <Link href={`${guidePath()}/#painel-candidato`} className="panel-access ds-button ds-button-secondary ds-focusable">
            <PanelRight aria-hidden="true" className="h-4 w-4" />
            Acessar painel
          </Link>
          <Button
            type="button"
            variant="ghost"
            className="mobile-menu-button"
            onClick={() => setAberto((valor) => !valor)}
            aria-expanded={aberto}
            aria-controls="menu-movel"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          >
            {aberto ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {aberto ? (
        <nav id="menu-movel" aria-label="Menu móvel" className="mobile-nav">
          {navItems.map((item) => (
            <NavigationItem
              key={item.href}
              href={item.href}
              active={isActive(pathname, item.href)}
              onClick={() => setAberto(false)}
            >
              {item.label}
            </NavigationItem>
          ))}
          <Link href={`${guidePath()}/#painel-candidato`} onClick={() => setAberto(false)} className="mobile-panel-link ds-focusable">
            Acessar painel
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
