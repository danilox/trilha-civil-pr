import type { Metadata } from "next";
import Link from "next/link";
import { CompetitionRadarCard } from "@/components/competition/competition-radar-card";
import { CompetitionHowItWorks } from "@/components/competition/competition-how-it-works";
import { CompetitionTrustBadges } from "@/components/competition/competition-trust-badges";
import { CompetitionDocumentChecklist } from "@/components/competition/competition-document-checklist";
import { CandidatePanel } from "@/components/candidate-panel";
import { ExamCountdown } from "@/components/exam-countdown";
import { Badge } from "@/components/ui";
import "@/styles/competition-home.css";
import { Hero } from "@/components/hero";
import { LowerCards } from "@/components/lower-cards";
import { MethodologySection } from "@/components/methodology-section";
import { NoticeBar } from "@/components/notice-bar";
import { ContestBreadcrumb } from "@/components/platform/contest-breadcrumb";
import { SearchHub } from "@/components/search-hub";
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
    <div className="radar-guide-surface">
      <NoticeBar />
      <SiteHeader />
      <main className="page-shell pcpr-radar-page">
        <ContestBreadcrumb
          items={[
            { label: "Edital no Controle", href: "/" },
            { label: "Concursos", href: "/concursos" },
            { label: "PC-PR 2026" },
          ]}
        />
        <div className="radar-layout">
            <Hero />
            <CompetitionRadarCard />
            <CompetitionHowItWorks />
            <CompetitionTrustBadges />
          <div className="radar-tools">
            <Link href="/concursos/pc-pr-2026/nota-de-corte" className="radar-tool ds-focusable">
              <h2>Possível faixa de classificação →</h2>
              <Badge variant="accent">Estimativa</Badge>
              <p>Simule sua classificação com base nos acertos e na concorrência estimada.</p>
            </Link>
            <CompetitionDocumentChecklist />
          </div>
          <div className="radar-rest">
            <ExamCountdown />
            <CandidatePanel />
            <SearchHub />
            <SummaryCards />
            <Timeline />
            <LowerCards />
            <MethodologySection />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
