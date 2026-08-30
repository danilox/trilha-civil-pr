import type { Metadata } from "next";
import { CompetitionPage } from "@/components/competition/competition-page";
import { ContestBreadcrumb } from "@/components/platform/contest-breadcrumb";
import { NoticeBar } from "@/components/notice-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Concorrência PC-PR 2026",
  description:
    "Experiência colaborativa para visualizar escolhas agregadas por região e modalidade no concurso PC-PR 2026, sem exibir dados pessoais.",
  path: "/concursos/pc-pr-2026/concorrencia",
});

export default function PcprCompetitionRoute() {
  return (
    <>
      <NoticeBar />
      <SiteHeader />
      <main className="page-shell">
        <ContestBreadcrumb
          items={[
            { label: "Edital no Controle", href: "/" },
            { label: "Concursos", href: "/concursos" },
            { label: "PC-PR 2026", href: "/concursos/pc-pr-2026" },
            { label: "Concorrência" },
          ]}
        />
        <CompetitionPage />
      </main>
      <SiteFooter />
    </>
  );
}
