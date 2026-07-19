export function Hero() {
  return (
    <section id="inicio" className="hero-shell">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-content">
        <h1>
          Guia independente do
          <span className="hero-line">concurso da <span className="no-break">PC-PR</span></span>
        </h1>
        <p>
          Informações organizadas sobre todas as etapas do concurso, concorrência por região
          e orientações práticas para o candidato.
        </p>
        <div className="hero-seal" aria-label="Projeto independente">
          <span className="hero-seal-icon" aria-hidden="true" />
          Projeto independente
        </div>
      </div>
      <div className="pcpr-mark" aria-hidden="true">PCPR</div>
    </section>
  );
}