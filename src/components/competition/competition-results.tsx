import { ChartNoAxesColumnIncreasing, Users } from "lucide-react";
import { Badge, Card, MetricCard } from "@/components/ui";
import { CompetitionBars } from "@/components/competition/competition-bars";
import { CompetitionSamplePressure } from "@/components/competition/competition-sample-pressure";
import { competitionRegionOptions } from "@/data/competition";
import type {
  CompetitionRegionId,
  CompetitionStatistics,
  OfficialCandidate,
} from "@/types/competition";
import { formatarDecimal, formatarNumero } from "@/lib/format";

type CompetitionResultsProps = {
  statistics: CompetitionStatistics;
  selectedRegion: CompetitionRegionId | null;
  candidate: OfficialCandidate | null;
  showMockBadge?: boolean;
};

export function CompetitionResults({
  candidate,
  selectedRegion,
  showMockBadge = false,
  statistics,
}: CompetitionResultsProps) {
  const region = competitionRegionOptions.find((item) => item.id === selectedRegion);
  const selectedCount = selectedRegion
    ? statistics.regions.find((item) => item.regionId === selectedRegion)?.count ?? 0
    : 0;

  return (
    <section className="competition-results" aria-labelledby="concorrencia-comunidade">
      <div className="competition-results-title">
        <div>
          <span>Concorrência da comunidade</span>
          <h2 id="concorrencia-comunidade">Distribuição colaborativa</h2>
        </div>
        {showMockBadge ? <Badge variant="neutral">DEV/MOCK</Badge> : null}
      </div>

      <div className="competition-results-grid">
        <MetricCard
          label="Participantes"
          value={formatarNumero(statistics.totalParticipants)}
          description="declarações agregadas"
          icon={<Users className="h-4 w-4" />}
        />
        {statistics.regions.map((item) => (
          <MetricCard
            key={item.regionId}
            label={item.shortLabel}
            value={`${formatarDecimal(item.percentage)}%`}
            description={`${formatarNumero(item.count)} participantes`}
            icon={<ChartNoAxesColumnIncreasing className="h-4 w-4" />}
          />
        ))}
      </div>

      <Card className="competition-results-card" padding="lg">
        <div className="competition-results-heading">
          <ChartNoAxesColumnIncreasing aria-hidden="true" />
          <h3>Regiões declaradas</h3>
        </div>
        <CompetitionBars statistics={statistics} />
      </Card>

      {region && candidate ? (
        <Card as="aside" className="competition-results-card competition-choice-card" padding="lg">
          <span>Sua escolha</span>
          <strong>{region.code} - {region.subtitle}</strong>
          <p>{candidate.cargo}</p>
          <small>
            Você está entre os {formatarNumero(selectedCount)} participantes que declararam esta região.
          </small>
        </Card>
      ) : null}

      <Card className="competition-results-card" padding="lg">
        <div className="competition-results-heading">
          <Users aria-hidden="true" />
          <h3>Distribuição por status validado</h3>
        </div>
        <div className="competition-table-wrap">
          <table className="competition-table">
            <caption>Status validado por região, com dados públicos agregados.</caption>
            <thead>
              <tr>
                <th>Status</th>
                <th>Região 1</th>
                <th>Região 2</th>
              </tr>
            </thead>
            <tbody>
              {statistics.modalities.map((item) => (
                <tr key={item.status}>
                  <th scope="row">{item.label}</th>
                  <td data-label="Região 1">{formatarNumero(item.regions["regiao-interior"])}</td>
                  <td data-label="Região 2">{formatarNumero(item.regions["regiao-curitiba-rm"])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <CompetitionSamplePressure statistics={statistics} />
    </section>
  );
}
