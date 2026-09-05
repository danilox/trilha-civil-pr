import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { CompetitionBars } from "@/components/competition/competition-bars";
import { getServerCompetitionStatistics } from "@/lib/competition/statistics";
import { formatarDecimal, formatarNumero } from "@/lib/format";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Validação por lista oficial",
    text: "Amostra validada com base na lista oficial de inscritos.",
  },
  {
    icon: UserCheck,
    title: "Participação única",
    text: "Cada candidato pode participar apenas uma vez.",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Resultados agregados",
    text: "Seus dados são usados de forma anônima e agregada.",
  },
];

function getRegionDisplayLabel(regionId: string) {
  return regionId === "regiao-curitiba-rm" ? "Curitiba / RMC" : "Interior";
}

export async function CompetitionPanelTeaser() {
  const statistics = await getServerCompetitionStatistics();
  const [regionOne, regionTwo] = statistics.regions;
  const hasParticipants = statistics.totalParticipants > 0;

  return (
    <Card as="aside" className="candidate-panel competition-panel-teaser" aria-labelledby="concorrencia-colaborativa" padding="md">
      <div className="competition-teaser-top">
        <div>
          <Badge variant="accent">Concorrência colaborativa</Badge>
          {statistics.tipo === "mock" ? <Badge className="mt-2" variant="neutral">DEV/MOCK</Badge> : null}
        </div>
        <div className="competition-icon-box">
          <Users aria-hidden="true" />
        </div>
      </div>

      <h2 id="concorrencia-colaborativa">
        {hasParticipants ? "Veja onde os candidatos estão concentrando suas escolhas" : "A pesquisa começou!"}
      </h2>
      <p className="competition-teaser-copy">
        {hasParticipants
          ? "Acompanhe a distribuição colaborativa declarada pelos candidatos validados."
          : "Seja um dos primeiros a participar e ajude a formar a primeira amostra da concorrência."}
      </p>

      {hasParticipants ? (
        <div className="competition-teaser-metrics" aria-label="Resumo da amostra colaborativa">
          <div>
            <Users aria-hidden="true" />
            <span>Participantes</span>
            <strong>{formatarNumero(statistics.totalParticipants)}</strong>
          </div>
          <div>
            <span>{getRegionDisplayLabel(regionOne.regionId)}</span>
            <strong>{formatarDecimal(regionOne.percentage)}%</strong>
          </div>
          <div>
            <span>{getRegionDisplayLabel(regionTwo.regionId)}</span>
            <strong>{formatarDecimal(regionTwo.percentage)}%</strong>
          </div>
        </div>
      ) : null}

      <div className="competition-trust-list" aria-label="Como a pesquisa protege a qualidade da amostra">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="competition-trust-item">
              <Icon aria-hidden="true" />
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </div>
          );
        })}
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

      <p className="competition-privacy-note">
        <LockKeyhole aria-hidden="true" />
        Seus dados são seguros e utilizados apenas para fins estatísticos.
      </p>
    </Card>
  );
}
