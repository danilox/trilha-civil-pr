import Link from "next/link";
import { FooterContact } from "@/components/footer-contact";
import { Info, Layers3 } from "lucide-react";
import { guidePath, platformConfig } from "@/config/site-config";

const navigationLinks = [
  { href: "/", label: "Início" },
  { href: "/concursos", label: "Concursos" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: guidePath("/atualizacoes"), label: "Atualizações" },
  { href: "/sobre", label: "Sobre" },
];

const resourceLinks = [
  { href: guidePath(), label: "Guia PC-PR 2026" },
  { href: guidePath("/edital"), label: "Edital organizado" },
  { href: guidePath("/etapas"), label: "Etapas" },
  { href: guidePath("/fontes"), label: "Fontes" },
];

const supportLinks = [
  { href: "/sobre", label: "Dúvidas frequentes" },
  { href: "/sobre", label: "Fale conosco" },
];

export function PlatformFooter() {
  return (
    <footer className="platform-footer">
      <div className="platform-footer-inner">
        <div className="platform-footer-brand">
          <Link href="/" className="platform-brand ds-focusable" aria-label={`${platformConfig.name} - página inicial`}>
            <span className="platform-brand-mark" aria-hidden="true">
              <Layers3 />
            </span>
            <span>
              <strong>Edital</strong>
              <strong>no Controle</strong>
            </span>
          </Link>
          <p>Guias visuais de concursos públicos com informações conferidas e organizadas para você estudar com foco e segurança.</p>
          <div className="platform-social-links" aria-label="Canais sociais em preparação">
            <span aria-hidden="true">IG</span>
            <span aria-hidden="true">YT</span>
          </div>
          <FooterContact />
        </div>

        <nav className="platform-footer-nav" aria-label="Navegação">
          <h2>Navegação</h2>
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="ds-focusable">
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="platform-footer-nav" aria-label="Recursos">
          <h2>Recursos</h2>
          {resourceLinks.map((link) => (
            <Link key={link.href} href={link.href} className="ds-focusable">
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="platform-footer-nav" aria-label="Suporte">
          <h2>Suporte</h2>
          {supportLinks.map((link) => (
            <Link key={`${link.href}-${link.label}`} href={link.href} className="ds-focusable">
              {link.label}
            </Link>
          ))}
        </nav>

        <aside className="platform-footer-notice" role="note">
          <Info aria-hidden="true" />
          <div>
            <h2>Aviso importante</h2>
            <p>{platformConfig.institutional.disclaimer}</p>
          </div>
        </aside>
      </div>
      <div className="platform-footer-bottom">
        <p>© 2026 Edital no Controle. Todos os direitos reservados.</p>
        <nav aria-label="Links legais">
          <Link href="/termos" className="ds-focusable">Termos de Uso</Link>
          <Link href="/privacidade" className="ds-focusable">Política de Privacidade</Link>
        </nav>
      </div>
    </footer>
  );
}
