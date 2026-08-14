import { NoticeBar } from "@/components/notice-bar";
import { ContestBreadcrumb } from "@/components/platform/contest-breadcrumb";
import { PlatformFooter } from "@/components/platform/platform-footer";
import { PlatformHeader } from "@/components/platform/platform-header";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Card, Disclaimer } from "@/components/ui";
import { guidePath, platformConfig } from "@/config/site-config";
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
  const isGuidePage = path.startsWith(guidePath());
  const disclaimer = isGuidePage
    ? avisoNaoOficial
    : platformConfig.institutional.disclaimer;

  return (
    <>
      <JsonLd data={createWebPageJsonLd(title, description, path)} />
      <JsonLd data={createBreadcrumbJsonLd(title, path)} />
      {isGuidePage ? <NoticeBar /> : null}
      {isGuidePage ? <SiteHeader /> : <PlatformHeader />}
      <main className={cn("internal-shell", className)}>
        <ContestBreadcrumb
          items={
            isGuidePage
              ? [
                  { label: "Edital no Controle", href: "/" },
                  { label: "Concursos", href: "/concursos" },
                  { label: "PC-PR 2026", href: guidePath() },
                  { label: title },
                ]
              : [
                  { label: "Início", href: "/" },
                  { label: title },
                ]
          }
        />
        <Card as="header" className="internal-hero" padding="lg">
          <p>{isGuidePage ? "Guia PC-PR 2026" : platformConfig.name}</p>
          <h1>{title}</h1>
          <div className="internal-hero-grid">
            <p>{description}</p>
            <Disclaimer title="Aviso institucional">{disclaimer}</Disclaimer>
          </div>
        </Card>
        {children}
      </main>
      {isGuidePage ? <SiteFooter /> : <PlatformFooter />}
    </>
  );
}

export function InfoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("internal-grid", className)}>{children}</section>;
}

export function InfoCard({ children, id }: { children: React.ReactNode; id?: string }) {
  return <Card as="article" id={id} className="internal-card" interactive>{children}</Card>;
}
