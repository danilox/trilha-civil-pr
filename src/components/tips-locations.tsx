import { MapPin } from "lucide-react";
import { dicas, locaisExame } from "@/data/portal";
import { SectionHeading } from "@/components/section-heading";

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
              <article key={dica.titulo} className="tip-card">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                  {dica.categoria}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{dica.titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{dica.descricao}</p>
              </article>
            ))}
          </div>

          <div className="location-panel">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <h3 className="text-2xl font-semibold text-white">Locais para exames</h3>
              <MapPin aria-hidden="true" className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="divide-y divide-white/10">
              {locaisExame.map((local) => (
                <article key={`${local.nome}-${local.cidade}`} className="py-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{local.nome}</h4>
                      <p className="mt-1 text-sm text-zinc-500">{local.cidade}</p>
                    </div>
                    <span className="badge">estimativa</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {local.servicosOferecidos.map((item) => (
                      <span key={item} className="border border-white/10 px-2 py-1 text-xs text-zinc-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">{local.observacao}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

