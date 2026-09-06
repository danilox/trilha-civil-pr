import Link from "next/link";
import { FooterContact } from "@/components/footer-contact";
import { avisoNaoOficial } from "@/data/portal";
import { siteConfig } from "@/lib/site-config";
import { guidePath } from "@/config/site-config";

const footerLinks = [
  { href: guidePath("/edital"), label: "Edital" },
  { href: guidePath("/atualizacoes"), label: "Atualizações" },
  { href: guidePath("/fontes"), label: "Fontes" },
  { href: "/concursos", label: "Concursos" },
  { href: "/privacidade", label: "Privacidade" },
  { href: "/termos", label: "Termos" },
  { href: "/sobre", label: "Sobre" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-zinc-500 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl leading-6">{avisoNaoOficial}</p>
          <p className="font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Guia PC-PR 2026 · {siteConfig.name}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <nav aria-label="Links do rodapé" className="site-footer-links">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-footer-link ds-focusable">
              {link.label}
            </Link>
          ))}
        </nav>
        <FooterContact />
        </div>
      </div>
    </footer>
  );
}
