import type { Metadata } from "next";
import { CompetitionPanelTeaser } from "@/components/competition/competition-panel-teaser";
import { Hero } from "@/components/hero";
import { LowerCards } from "@/components/lower-cards";
import { MethodologySection } from "@/components/methodology-section";
import { NoticeBar } from "@/components/notice-bar";
import { PaymentExtensionAlert } from "@/components/payment-extension-alert";
import { ContestBreadcrumb } from "@/components/platform/contest-breadcrumb";
import { SearchHub } from "@/components/search-hub";
import { SidebarCards } from "@/components/sidebar-cards";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SummaryCards } from "@/components/summary-cards";
import { Timeline } from "@/components/timeline";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Guia PC-PR 2026 | Edital no Controle",
  description:
    "Guia independente com edital, etapas, regiões, exames, TAF, títulos e ferramentas de acompanhamento do concurso PC-PR 2026.",
  path: "/concursos/pc-pr-2026",
  absoluteTitle: true,
});

export default function PcprGuideHomePage() {
  return (
    <>
      <NoticeBar />
      <SiteHeader />
      <main className="page-shell">
        <ContestBreadcrumb
          items={[
            { label: "Edital no Controle", href: "/" },
            { label: "Concursos", href: "/concursos" },
            { label: "PC-PR 2026" },
          ]}
        />
        <div className="dashboard-layout">
          <div className="main-top">
            <Hero />
            <PaymentExtensionAlert />
            <SearchHub />
            <SummaryCards />
          </div>
          <div className="side-column">
            <CompetitionPanelTeaser />
            <SidebarCards />
          </div>
          <div className="main-rest">
            <Timeline />
            <LowerCards />
            <MethodologySection />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
