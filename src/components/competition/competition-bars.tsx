import type { CompetitionStatistics } from "@/types/competition";
import { formatarDecimal, formatarNumero } from "@/lib/format";

type CompetitionBarsProps = {
  statistics: CompetitionStatistics;
  compact?: boolean;
};

function getRegionDisplayLabel(regionId: string) {
  return regionId === "regiao-curitiba-rm" ? "Curitiba / RMC" : "Interior";
}

export function CompetitionBars({ compact = false, statistics }: CompetitionBarsProps) {
  const emptySample = statistics.totalParticipants === 0;

  return (
    <div className={compact ? "competition-bars competition-bars-compact" : "competition-bars"}>
      {statistics.regions.map((region) => {
        const displayPercentage = emptySample ? "--" : `${formatarDecimal(region.percentage)}%`;
        const barWidth = emptySample ? 0 : Math.max(0, Math.min(100, region.percentage));

        return (
          <div key={region.regionId} className="competition-bar-row">
            <div className="competition-bar-meta">
              <span>{getRegionDisplayLabel(region.regionId)}</span>
              <strong>{displayPercentage}</strong>
            </div>
            <div className="competition-bar-track" aria-hidden="true">
              <span style={{ width: `${barWidth}%` }} />
            </div>
            {compact ? null : <p>{formatarNumero(region.count)} participantes</p>}
          </div>
        );
      })}
    </div>
  );
}
