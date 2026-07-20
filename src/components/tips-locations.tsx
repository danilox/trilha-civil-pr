import { MapPin } from "lucide-react";
import { dicas, locaisExame } from "@/data/portal";
import { SectionHeading } from "@/components/section-heading";
import { Badge, Card, Disclaimer, EmptyState, StatusBadge } from "@/components/ui";

export function TipsLocations() {
  return (
    <section id="locais" className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dicas e locais"
          title="Roteiro prático para não perder prazo"
          description="Sugestões operacionais para candidatos compararem agenda, documentação e deslocamento com tempo de sobra."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {dicas.map((dica) => (
              <Card key={dica.titulo} as="article" className="tip-card" interactive>
                <StatusBadge status="info">{dica.categoria}</StatusBadge>
                <h3 className="mt-3 text-lg font-semibold text-white">{dica.titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{dica.descricao}</p>
              </Card>
            ))}
          </div>

          <Card as="div" className="location-panel">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <h3 className="text-2xl font-semibold text-white">Locais para exames</h3>
              <MapPin aria-hidden="true" className="h-5 w-5 text-zinc-500" />
            </div>
            {locaisExame.length ? (
              <div className="divide-y divide-white/10">
                {locaisExame.map((local) => (
                  <article key={`${local.nome}-${local.cidade}`} className="py-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{local.nome}</h4>
                        <p className="mt-1 text-sm text-zinc-500">{local.cidade}</p>
                      </div>
                      <Badge variant="purple">demonstração</Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {local.servicosOferecidos.map((item) => (
                        <Badge key={item} variant="neutral">{item}</Badge>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-zinc-400">{local.observacao}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState title="Nenhum local cadastrado" description="Os locais serão exibidos quando houver registros conferidos ou exemplos demonstrativos." />
            )}
            <Disclaimer>O portal não garante preço, atendimento, disponibilidade ou aceitação do exame. Confirme diretamente com o estabelecimento e com o edital.</Disclaimer>
          </Card>
        </div>
      </div>
    </section>
  );
}
