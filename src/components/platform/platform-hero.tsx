import Link from "next/link";
import { ArrowRight, Bell, FileCheck2, Layers3, Radar } from "lucide-react";
import { PortalOverview } from "@/components/platform/portal-overview";


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
            EDITAL NO CONTROLE
          </span>
          <h1 id="platform-hero-title">
            Concursos de <span>Segurança Pública</span>
          </h1>
          <p>
            Editais, inscrições, provas, TAF, resultados e convocações organizados em um único lugar.
          </p>
          <div className="platform-hero-actions">
            <Link href="/concursos" className="ds-button ds-button-primary ds-focusable">
              Ver concursos
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/radar" className="ds-button ds-button-secondary ds-focusable">
              Ver Radar
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
      <PortalOverview />
    </section>
  );
}
