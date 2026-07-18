import { CandidatePanel } from "@/components/candidate-panel";
import { Hero } from "@/components/hero";
import { LowerCards } from "@/components/lower-cards";
import { MethodologySection } from "@/components/methodology-section";
import { NoticeBar } from "@/components/notice-bar";
import { SearchHub } from "@/components/search-hub";
import { SidebarCards } from "@/components/sidebar-cards";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SummaryCards } from "@/components/summary-cards";
import { Timeline } from "@/components/timeline";

export default function Home() {
  return (
    <>
      <NoticeBar />
      <SiteHeader />
      <main className="page-shell">
        <div className="dashboard-layout">
          <div className="main-top">
            <Hero />
            <SearchHub />
            <SummaryCards />
          </div>
          <div className="side-column">
            <CandidatePanel />
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
