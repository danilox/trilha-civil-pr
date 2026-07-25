import Link from "next/link";
import { ArrowRight, BarChart3, ClipboardList, Radar, Target } from "lucide-react";
import { AnimatedHeroBackground } from "@/components/animated-hero-background";
import { ExamCountdown } from "@/components/exam-countdown";

const heroHighlights = [
  { icon: Radar, title: "Acompanhe", text: "status e etapas oficiais" },
  { icon: BarChart3, title: "Compare", text: "regiões e barreiras" },
  { icon: Target, title: "Projete", text: "simulação local" },
];

export function Hero() {
  return (
    <section id="inicio" className="hero-shell" aria-labelledby="home-hero-title">
      <AnimatedHeroBackground />
      <div className="hero-content">
        <p className="hero-kicker"><span>Concurso</span></p>
        <h1 id="home-hero-title" className="hero-title">
          <span>Polícia Civil</span>
          <span>do Paraná</span>
        </h1>
        <p className="hero-description">
          Guia independente com dados oficiais, estimativas identificadas e ferramentas locais para acompanhar o concurso da <span className="no-break">PC-PR</span>.
        </p>

        <ExamCountdown />

        <div className="hero-highlight-grid" aria-label="Principais recursos da página inicial">
          {heroHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon aria-hidden="true" className="h-4 w-4" />
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </article>
            );
          })}
        </div>

        <div className="hero-actions">
          <Link href="/#painel-candidato" className="hero-primary-action focus-ring">
            <ClipboardList aria-hidden="true" className="h-4 w-4" />
            Acessar painel do candidato
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href="/edital" className="hero-secondary-action focus-ring">
            Ver edital organizado
          </Link>
        </div>

        <div className="hero-progress-dots" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}