import { Users } from "lucide-react";
import { AnimatedHeroBackground } from "@/components/animated-hero-background";

export function Hero() {
  return (
    <section id="inicio" className="hero-shell radar-hero" aria-labelledby="home-hero-title">
      <AnimatedHeroBackground />
      <div className="hero-content">
        <p className="radar-open-badge"><Users aria-hidden="true" /> Pesquisa aberta — Agente PCPR 2026</p>
        <h1 id="home-hero-title" className="hero-title"><span>Polícia Civil</span><span>do Paraná</span></h1>
        <p className="hero-description">Ajude a mapear a concorrência para o cargo de <strong>Agente da PCPR 2026.</strong><br />Veja onde os candidatos estão se concentrando entre <strong>Interior</strong> e <strong>Curitiba/RMC.</strong></p>
      </div>
    </section>
  );
}
