import { exames } from "@/data/portal";
import { DataBadge } from "@/components/data-badge";
import { SectionHeading } from "@/components/section-heading";
import { Badge, Card, Disclaimer } from "@/components/ui";

export function ExamsSection() {
  return (
    <section id="exames" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Exames e avaliações"
        title="Preparação documental sem promessa de aprovação"
        description="A área reúne o que costuma gerar perda de prazo: laudos, certidões, protocolos, deslocamento e conferência de requisitos. Prevalece sempre o edital."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {exames.map((exame) => {
          const Icon = exame.icon;
          return (
            <Card key={exame.id} as="article" className="info-card" interactive>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white text-black">
                  {Icon ? <Icon aria-hidden="true" className="h-5 w-5" /> : null}
                </div>
                <DataBadge tipo={exame.tipo} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{exame.titulo}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{exame.resumo}</p>
              <p className="mt-3 text-xs leading-5 text-zinc-500">{exame.validade}</p>
              <ul className="mt-6 space-y-2">
                {exame.preparo.map((item) => (
                  <li key={item}><Badge variant="neutral">{item}</Badge></li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
      <Disclaimer className="mt-8">As informações sobre exames são organizadas para conferência. O edital e a convocação oficial prevalecem.</Disclaimer>
    </section>
  );
}
