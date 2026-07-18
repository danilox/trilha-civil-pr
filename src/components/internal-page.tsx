import Link from "next/link";
import { NoticeBar } from "@/components/notice-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { avisoNaoOficial } from "@/data/portal";

export type InternalPageProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function InternalPage({ title, description, children }: InternalPageProps) {
  return (
    <>
      <NoticeBar />
      <SiteHeader />
      <main className="internal-shell">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>
        <header className="internal-hero">
          <p>Trilha Civil PR</p>
          <h1>{title}</h1>
          <div className="internal-hero-grid">
            <p>{description}</p>
            <aside aria-label="Aviso institucional">{avisoNaoOficial}</aside>
          </div>
        </header>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function InfoGrid({ children }: { children: React.ReactNode }) {
  return <section className="internal-grid">{children}</section>;
}

export function InfoCard({ children, id }: { children: React.ReactNode; id?: string }) {
  return <article id={id} className="internal-card">{children}</article>;
}
