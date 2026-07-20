"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PanelRight, X } from "lucide-react";
import { useState } from "react";
import { Button, NavigationItem } from "@/components/ui";

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

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-lockup ds-focusable" aria-label="Trilha Civil PR - página inicial">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span className="brand-copy">
            <strong>Trilha Civil <b>PR</b></strong>
            <small>Informação • Estratégia • Foco</small>
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
          <Link href="/#painel-candidato" className="panel-access ds-button ds-button-secondary ds-focusable">
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
          <Link href="/#painel-candidato" onClick={() => setAberto(false)} className="mobile-panel-link ds-focusable">
            Acessar painel
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
