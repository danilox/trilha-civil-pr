import type { Metadata } from "next";
import { ContestCard } from "@/components/platform/contest-card";
import { HowItWorks } from "@/components/platform/how-it-works";
import { PaymentExtensionAlert } from "@/components/payment-extension-alert";
import { PlatformFooter } from "@/components/platform/platform-footer";
import { PlatformHeader } from "@/components/platform/platform-header";
import { PlatformHero } from "@/components/platform/platform-hero";
import { TrustStrip } from "@/components/platform/trust-strip";
import { JsonLd } from "@/components/seo/json-ld";
import { platformConfig } from "@/config/site-config";
import { contests } from "@/data/contests";
import { createPageMetadata, createWebPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Edital no Controle | Guias de concursos públicos",
  description: platformConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function PlatformHomePage() {
  return (
    <>
      <JsonLd data={createWebPageJsonLd("Edital no Controle", platformConfig.description, "/")} />
      <PlatformHeader />
      <main className="platform-shell platform-home">
        <PlatformHero />
        <PaymentExtensionAlert />
        <TrustStrip />
        <section className="platform-section featured-section" aria-labelledby="featured-title">
          <div className="platform-section-heading">
            <h2 id="featured-title">Concursos em destaque</h2>
            <p>Guias completos e organizados para você acompanhar cada etapa.</p>
          </div>
          <div className="platform-contest-grid">
            {contests.map((contest) => (
              <ContestCard key={contest.slug} contest={contest} />
            ))}
          </div>
        </section>
        <HowItWorks />
      </main>
      <PlatformFooter />
    </>
  );
}
