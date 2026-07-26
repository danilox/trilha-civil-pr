import Link from "next/link";
import { NoticeBar } from "@/components/notice-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Card, Disclaimer } from "@/components/ui";
import { avisoNaoOficial } from "@/data/portal";
import { cn } from "@/lib/cn";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo";

export type InternalPageProps = {
  title: string;
  description: string;
  path: string;
  children: React.ReactNode;
  audited?: boolean;
  className?: string;
};

export function InternalPage({ title, description, path, children, className }: InternalPageProps) {
  return (
    <>
      <JsonLd data={createWebPageJsonLd(title, description, path)} />
      <JsonLd data={createBreadcrumbJsonLd(title, path)} />
      <NoticeBar />
      <SiteHeader />
      <main className={cn("internal-shell", className)}>
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <Card as="header" className="internal-hero" padding="lg">
          <p>Trilha Civil PR</p>
          <h1>{title}</h1>
          <div className="internal-hero-grid">
            <p>{description}</p>
            <Disclaimer title="Aviso institucional">{avisoNaoOficial}</Disclaimer>
          </div>
        </Card>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function InfoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("internal-grid", className)}>{children}</section>;
}

export function InfoCard({ children, id }: { children: React.ReactNode; id?: string }) {
  return <Card as="article" id={id} className="internal-card" interactive>{children}</Card>;
}
