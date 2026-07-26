import Link from "next/link";
import type { Metadata } from "next";
import { SearchHub } from "@/components/search-hub";
import { NoticeBar } from "@/components/notice-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const links = [
  ["Etapas", "/etapas"],
  ["Regiões", "/regioes"],
  ["Exames", "/exames"],
  ["Fontes", "/fontes"],
];

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O conteúdo acessado não existe ou pode ter sido movido no Trilha Civil PR.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <NoticeBar />
      <SiteHeader />
      <main className="internal-shell">
        <section className="internal-hero">
          <p>Trilha Civil PR</p>
          <h1>Página não encontrada</h1>
          <div className="internal-hero-grid">
            <p>O conteúdo acessado não existe ou pode ter sido movido. Utilize a navegação para continuar consultando o Trilha Civil PR.</p>
            <aside>Nenhum símbolo institucional oficial é usado nesta página.</aside>
          </div>
        </section>
        <div className="not-found-actions">
          <Link href="/" className="button-primary">Voltar ao início</Link>
          {links.map(([label, href]) => <Link key={href} href={href} className="button-secondary">{label}</Link>)}
        </div>
        <SearchHub />
      </main>
      <SiteFooter />
    </>
  );
}
