import { ArrowRight, Bell, FileSearch, Layers3, LineChart } from "lucide-react";

const steps = [
  {
    title: "Analisamos o edital",
    description: "Leitura técnica e detalhada para extrair tudo o que importa.",
    icon: FileSearch,
  },
  {
    title: "Organizamos as informações",
    description: "Estruturamos por etapas, prazos, requisitos e documentos.",
    icon: Layers3,
  },
  {
    title: "Transformamos em um guia visual",
    description: "Apresentamos de forma clara, objetiva e fácil de acompanhar.",
    icon: LineChart,
  },
  {
    title: "Mantemos o candidato atualizado",
    description: "Atualizamos a plataforma sempre que houver novidades verificadas.",
    icon: Bell,
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="platform-section how-section" aria-labelledby="how-title">
      <div className="platform-section-heading">
        <h2 id="how-title">Como funciona</h2>
        <p>Um método simples para transformar editais em clareza.</p>
      </div>
      <ol className="how-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <li key={step.title}>
              <article className="how-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
              {index < steps.length - 1 ? <ArrowRight aria-hidden="true" className="how-connector" /> : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
