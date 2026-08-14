import Link from "next/link";
import { ArrowRight, Bell, FileCheck2, Layers3, Radar } from "lucide-react";
import { DashboardPreview } from "@/components/platform/dashboard-preview";
import { guidePath } from "@/config/site-config";

const benefits = [
  { label: "Editais organizados", icon: FileCheck2 },
  { label: "Acompanhamento por etapas", icon: Layers3 },
  { label: "Atualizações centralizadas", icon: Bell },
];

export function PlatformHero() {
  return (
    <section className="platform-hero" aria-labelledby="platform-hero-title">
      <div className="platform-hero-grid" aria-hidden="true" />
      <div className="platform-hero-lines" aria-hidden="true" />
      <div className="platform-hero-content">
        <div className="platform-hero-copy">
          <span className="platform-eyebrow">
            <Radar aria-hidden="true" />
            O guia visual dos concursos públicos
          </span>
          <h1 id="platform-hero-title">
            Assuma o <span>controle</span> do seu concurso.
          </h1>
          <p>
            Editais, etapas, prazos, documentos e atualizações organizados em
            guias visuais fáceis de acompanhar.
          </p>
          <div className="platform-hero-actions">
            <Link href="/concursos" className="ds-button ds-button-primary ds-focusable">
              Ver concursos
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href={guidePath()} className="ds-button ds-button-secondary ds-focusable">
              Acessar guia PC-PR 2026
            </Link>
          </div>
          <div className="platform-hero-signals" aria-label="Recursos da plataforma">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <span key={benefit.label}>
                  <Icon aria-hidden="true" />
                  {benefit.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <DashboardPreview />
    </section>
  );
}
