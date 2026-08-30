import type { CompetitionStatistics } from "@/types/competition";
import { formatarDecimal, formatarNumero } from "@/lib/format";

type CompetitionBarsProps = {
  statistics: CompetitionStatistics;
  compact?: boolean;
};

export function CompetitionBars({ compact = false, statistics }: CompetitionBarsProps) {
  return (
    <div className={compact ? "competition-bars competition-bars-compact" : "competition-bars"}>
      {statistics.regions.map((region) => (
        <div key={region.regionId} className="competition-bar-row">
          <div className="competition-bar-meta">
            <span>{region.label}</span>
            <strong>{formatarNumero(region.count)}</strong>
          </div>
          <div className="competition-bar-track" aria-hidden="true">
            <span style={{ width: `${region.percentage}%` }} />
          </div>
          <p>{formatarDecimal(region.percentage)}%</p>
        </div>
      ))}
    </div>
  );
}
