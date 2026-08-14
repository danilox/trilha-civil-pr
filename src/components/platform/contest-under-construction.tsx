import Link from "next/link";
import { ArrowLeft, Bell, CheckCircle2 } from "lucide-react";
import { ContestStatusBadge } from "@/components/platform/contest-status-badge";
import { PlatformFooter } from "@/components/platform/platform-footer";
import { PlatformHeader } from "@/components/platform/platform-header";
import { Card } from "@/components/ui";
import { platformConfig } from "@/config/site-config";
import { plannedContestSections, type Contest } from "@/data/contests";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo";

export function ContestUnderConstruction({ contest }: { contest: Contest }) {
  return (
    <>
      <JsonLd data={createWebPageJsonLd(contest.titulo, contest.descricao, contest.href)} />
      <JsonLd data={createBreadcrumbJsonLd(contest.sigla, contest.href)} />
      <PlatformHeader />
      <main className="platform-shell">
        <section className="construction-hero">
          <span className="platform-eyebrow">{contest.sigla}</span>
          <ContestStatusBadge status={contest.status} />
          <h1>{contest.nome}</h1>
          <p>{contest.descricao}</p>
          <div className="platform-hero-actions">
            <Link href="/concursos" className="ds-button ds-button-secondary ds-focusable">
              <ArrowLeft aria-hidden="true" />
              Voltar aos concursos
            </Link>
            <button type="button" className="ds-button ds-button-primary ds-focusable" disabled title="Acompanhamento será disponibilizado em uma etapa futura">
              <Bell aria-hidden="true" />
              Quero acompanhar
            </button>
          </div>
        </section>
        <section className="platform-section" aria-labelledby="planned-sections-title">
          <div className="platform-section-heading">
            <span>Estrutura prevista</span>
            <h2 id="planned-sections-title">O que este guia terá</h2>
            <p>Nenhuma informação oficial deste concurso foi cadastrada nesta etapa.</p>
          </div>
          <Card as="div" className="construction-list">
            <ul>
              {plannedContestSections.map((section) => (
                <li key={section}>
                  <CheckCircle2 aria-hidden="true" />
                  {section}
                </li>
              ))}
            </ul>
          </Card>
        </section>
        <aside className="platform-disclaimer" role="note">
          {platformConfig.institutional.disclaimer}
        </aside>
      </main>
      <PlatformFooter />
    </>
  );
}
