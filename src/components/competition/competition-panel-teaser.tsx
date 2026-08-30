import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { CompetitionBars } from "@/components/competition/competition-bars";
import { getServerCompetitionStatistics } from "@/lib/competition/statistics";
import { formatarDecimal, formatarNumero } from "@/lib/format";

export async function CompetitionPanelTeaser() {
  const statistics = await getServerCompetitionStatistics();
  const [regionOne, regionTwo] = statistics.regions;

  return (
    <Card as="aside" className="candidate-panel competition-panel-teaser" aria-labelledby="concorrencia-colaborativa" padding="md">
      <div className="competition-teaser-top">
        <div>
          <Badge variant="accent">Concorrência colaborativa</Badge>
          {statistics.tipo === "mock" ? <Badge className="mt-2" variant="neutral">DEV/MOCK</Badge> : null}
        </div>
        <div className="competition-icon-box">
          <ChartNoAxesColumnIncreasing aria-hidden="true" />
        </div>
      </div>

      <h2 id="concorrencia-colaborativa">
        Veja onde os candidatos estão concentrando suas escolhas
      </h2>

      <div className="competition-teaser-metrics" aria-label="Resumo da amostra colaborativa">
        <div>
          <Users aria-hidden="true" />
          <span>Participantes</span>
          <strong>{formatarNumero(statistics.totalParticipants)}</strong>
        </div>
        <div>
          <span>{regionOne.shortLabel}</span>
          <strong>{formatarDecimal(regionOne.percentage)}%</strong>
        </div>
        <div>
          <span>{regionTwo.shortLabel}</span>
          <strong>{formatarDecimal(regionTwo.percentage)}%</strong>
        </div>
      </div>

      <CompetitionBars statistics={statistics} compact />

      <p className="competition-validation-seal">
        <ShieldCheck aria-hidden="true" />
        Validação pela relação oficial
      </p>

      <Link href="/concursos/pc-pr-2026/concorrencia" className="ds-button ds-button-primary ds-focusable competition-teaser-button">
        Participar da pesquisa
        <ArrowRight aria-hidden="true" />
      </Link>

      <p className="competition-privacy-note">Dados exibidos somente de forma agregada.</p>
    </Card>
  );
}
