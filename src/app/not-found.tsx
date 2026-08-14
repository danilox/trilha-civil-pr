import Link from "next/link";
import type { Metadata } from "next";
import { PlatformFooter } from "@/components/platform/platform-footer";
import { PlatformHeader } from "@/components/platform/platform-header";
import { guidePath, platformConfig } from "@/config/site-config";

const links = [
  ["Ver concursos", "/concursos"],
  ["Guia PC-PR 2026", guidePath()],
  ["Sobre a plataforma", "/sobre"],
];

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O conteúdo acessado não existe ou pode ter sido movido no Edital no Controle.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <PlatformHeader />
      <main className="platform-shell not-found-platform">
        <section className="platform-page-header">
          <span>Erro 404</span>
          <h1>Página não encontrada</h1>
          <p>
            O conteúdo acessado não existe ou pode ter sido movido. Utilize a
            navegação para continuar consultando o {platformConfig.name}.
          </p>
        </section>
        <div className="not-found-actions">
          <Link href="/" className="ds-button ds-button-primary ds-focusable">Voltar ao início</Link>
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="ds-button ds-button-secondary ds-focusable">
              {label}
            </Link>
          ))}
        </div>
      </main>
      <PlatformFooter />
    </>
  );
}
