import { ShieldCheck } from "lucide-react";
import { Card, Disclaimer } from "@/components/ui";
import type { CompetitionStatistics } from "@/types/competition";
import { formatarDecimal } from "@/lib/format";

export function CompetitionSamplePressure({ statistics }: { statistics: CompetitionStatistics }) {
  const regionsWithVacancies = statistics.regions.filter(
    (region) => typeof region.availableVacancies === "number" && region.availableVacancies > 0,
  );

  return (
    <Card as="section" className="competition-results-card" aria-labelledby="pressao-na-amostra" padding="lg">
      <div className="competition-results-heading">
        <ShieldCheck aria-hidden="true" />
        <h2 id="pressao-na-amostra">Pressão na amostra</h2>
      </div>

      {regionsWithVacancies.length > 0 ? (
        <div className="competition-pressure-grid">
          {regionsWithVacancies.map((region) => (
            <div key={region.regionId}>
              <span>{region.label}</span>
              <strong>{formatarDecimal(region.count / Number(region.availableVacancies))}</strong>
              <p>participantes da amostra por vaga</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="competition-muted-copy">
          Vagas numéricas por região ainda não estão disponíveis para este cálculo.
        </p>
      )}

      <Disclaimer className="mt-4" title="Leitura limitada da amostra">
        Calculado somente sobre os candidatos que participaram da pesquisa. Não representa a concorrência oficial da FGV.
      </Disclaimer>
    </Card>
  );
}
