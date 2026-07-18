import Link from "next/link";
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
            <p>O endereço acessado não existe ou foi movido. Use a busca ou volte para uma das páginas principais do portal.</p>
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
