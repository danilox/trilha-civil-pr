import type { Metadata } from "next";
import { ContestCatalog } from "@/components/platform/contest-catalog";
import { PlatformFooter } from "@/components/platform/platform-footer";
import { PlatformHeader } from "@/components/platform/platform-header";
import { JsonLd } from "@/components/seo/json-ld";
import { ContestBreadcrumb } from "@/components/platform/contest-breadcrumb";
import { platformConfig } from "@/config/site-config";
import { contests } from "@/data/contests";
import { createBreadcrumbJsonLd, createPageMetadata, createWebPageJsonLd } from "@/lib/seo";

const title = "Concursos";
const description =
  "Concursos de Segurança Pública por instituição, situação e estado, com datas e fontes oficiais.";

export const metadata: Metadata = createPageMetadata({
  title: "Concursos policiais",
  description,
  path: "/concursos",
});

export default async function ContestsPage({ searchParams }: { searchParams: Promise<{ categoria?: string; situacao?: string; estado?: string }> }) {
  const filters = await searchParams;
  return (
    <>
      <JsonLd data={createWebPageJsonLd(title, description, "/concursos")} />
      <JsonLd data={createBreadcrumbJsonLd(title, "/concursos")} />
      <PlatformHeader />
      <main className="platform-shell platform-catalog">
        <ContestBreadcrumb items={[{ label: "Início", href: "/" }, { label: "Concursos" }]} />
        <header className="platform-page-header">
          <span>Catálogo</span>
          <h1>Concursos</h1>
          <p>{description}</p>
        </header>
        <ContestCatalog contests={contests} filters={filters} />
        <aside className="platform-disclaimer" role="note">
          {platformConfig.institutional.disclaimer}
        </aside>
      </main>
      <PlatformFooter />
    </>
  );
}
