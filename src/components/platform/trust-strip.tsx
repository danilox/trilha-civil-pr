import { CalendarCheck2, Eye, LockKeyhole, ShieldCheck } from "lucide-react";

const trustItems = [
  {
    title: "Informação conferida",
    description: "Conteúdo revisado com base documental.",
    icon: ShieldCheck,
  },
  {
    title: "Organização visual",
    description: "Tudo o que importa reunido em um só lugar.",
    icon: Eye,
  },
  {
    title: "Prazos importantes",
    description: "Nunca perca um marco relevante do concurso.",
    icon: CalendarCheck2,
  },
  {
    title: "Plataforma independente e não oficial",
    description: "Não substitui os canais oficiais.",
    icon: LockKeyhole,
  },
];

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Diferenciais da plataforma">
      {trustItems.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.title} className="trust-item">
            <Icon aria-hidden="true" />
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
