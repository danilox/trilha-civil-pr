import { ClipboardCheck } from "lucide-react";
import { dicas } from "@/data/portal";
import { SectionHeading } from "@/components/section-heading";
import { Badge, Card, Disclaimer, StatusBadge } from "@/components/ui";

export function TipsLocations() {
  return (
    <section id="preparacao" className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dicas e preparação"
          title="Reta final sem conteúdo vencido"
          description="Sugestões operacionais para acompanhar publicações, organizar documentos e se preparar para as fases posteriores."
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
              <h3 className="text-2xl font-semibold text-white">Preparação para próximas fases</h3>
              <ClipboardCheck aria-hidden="true" className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="grid gap-3 py-5">
              <Badge variant="accent">Aguardando convocação</Badge>
              <p className="text-sm leading-6 text-zinc-400">
                O portal não indica clínicas, laboratórios ou centros de imagem nesta fase. Confira edital, retificações e convocações oficiais antes de realizar exames.
              </p>
              <p className="text-sm leading-6 text-zinc-400">
                Para a reta final, priorize prova objetiva, acompanhamento da FGV, TAF, documentos e títulos.
              </p>
            </div>
            <Disclaimer>Informações operacionais posteriores dependem de convocação oficial.</Disclaimer>
          </Card>
        </div>
      </div>
    </section>
  );
}
