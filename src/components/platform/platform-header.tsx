"use client";

import Link from "next/link";
import { ArrowRight, Layers3, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button, NavigationItem } from "@/components/ui";
import { guidePath, platformConfig } from "@/config/site-config";

const platformNav = [
  { href: "/", label: "Início" },
  { href: "/concursos", label: "Concursos" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: guidePath("/atualizacoes"), label: "Atualizações" },
  { href: "/sobre", label: "Sobre" },
];

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function PlatformHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="platform-header">
      <div className="platform-header-inner">
        <Link href="/" className="platform-brand ds-focusable" aria-label={`${platformConfig.name} - página inicial`}>
          <span className="platform-brand-mark" aria-hidden="true">
            <Layers3 />
          </span>
          <span>
            <strong>Edital</strong>
            <strong>no Controle</strong>
          </span>
        </Link>

        <nav className="platform-desktop-nav" aria-label="Menu da plataforma">
          {platformNav.map((item) => (
            <NavigationItem key={item.href} href={item.href} active={isActive(pathname, item.href)}>
              {item.label}
            </NavigationItem>
          ))}
        </nav>

        <div className="platform-header-actions">
          <Link href={guidePath()} className="ds-button ds-button-primary ds-focusable platform-guide-action">
            Acessar guia PC-PR
            <ArrowRight aria-hidden="true" />
          </Link>
          <Button
            variant="ghost"
            className="platform-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="platform-mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav id="platform-mobile-menu" className="platform-mobile-nav" aria-label="Menu móvel da plataforma">
          {platformNav.map((item) => (
            <NavigationItem
              key={item.href}
              href={item.href}
              active={isActive(pathname, item.href)}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavigationItem>
          ))}
          <NavigationItem href={guidePath()} onClick={() => setOpen(false)}>
            Acessar guia PC-PR
          </NavigationItem>
        </nav>
      ) : null}
    </header>
  );
}
