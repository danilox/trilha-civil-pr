import Link from "next/link";
import { avisoNaoOficial } from "@/data/portal";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { href: "/atualizacoes", label: "Atualizações" },
  { href: "/fontes", label: "Fontes" },
  { href: "/privacidade", label: "Privacidade" },
  { href: "/termos", label: "Termos" },
  { href: "/sobre", label: "Sobre" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-zinc-500 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl leading-6">{avisoNaoOficial}</p>
          <p className="font-semibold uppercase tracking-[0.22em] text-zinc-400">{siteConfig.name} v{siteConfig.version}</p>
        </div>
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-3">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
