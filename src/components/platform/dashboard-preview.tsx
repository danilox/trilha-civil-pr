import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Home,
  Layers3,
  Library,
} from "lucide-react";
import { ContestStatusBadge } from "@/components/platform/contest-status-badge";
import { guidePath } from "@/config/site-config";
import {
  DATA_CONFERENCIA_EDITAL,
  DATA_ULTIMA_ATUALIZACAO_OFICIAL,
  DOCUMENTO_EDITAL,
  etapasOficiais,
  situacaoAtualPcpr2026,
} from "@/data/edital";
import { contests } from "@/data/contests";
import { formatarData } from "@/lib/format";

const calendarioOutubro = [
  "D",
  "S",
  "T",
  "Q",
  "Q",
  "S",
  "S",
  "",
  "",
  "",
  "",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

export function DashboardPreview() {
  const pcpr = contests.find((contest) => contest.slug === "pc-pr-2026") ?? contests[0];
  const etapasComData = etapasOficiais.filter((etapa) => etapa.data).length;

  return (
    <aside className="dashboard-preview" aria-label="Prévia visual do guia PC-PR 2026">
      <div className="dashboard-sidebar" aria-hidden="true">
        <span><Library /></span>
        <span className="is-active"><Home /></span>
        <span><Layers3 /></span>
        <span><CalendarDays /></span>
        <span><FileText /></span>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-topbar">
          <div>
            <div className="dashboard-title-row">
              <h2>{pcpr.sigla}</h2>
              <ContestStatusBadge status={pcpr.status} />
            </div>
            <p>{pcpr.nome}</p>
          </div>
          <div className="dashboard-status">
            <span aria-hidden="true" />
            <p>Atualizado em {formatarData(DATA_ULTIMA_ATUALIZACAO_OFICIAL)}</p>
            <Link href={guidePath("/atualizacoes")} className="dashboard-link ds-focusable">
              Ver atualizações
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <section className="dashboard-panel dashboard-timeline" aria-labelledby="dashboard-steps-title">
          <h3 id="dashboard-steps-title">Etapas do concurso</h3>
          <ol>
            {etapasOficiais.slice(0, 7).map((etapa, index) => (
              <li key={etapa.id} className={etapa.status === "atencao" ? "is-current" : undefined}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{etapa.titulo}</strong>
                <small>{etapa.data ? formatarData(etapa.data) : "Em breve"}</small>
              </li>
            ))}
          </ol>
        </section>

        <div className="dashboard-card-grid">
          <section className="dashboard-panel dashboard-calendar" aria-labelledby="dashboard-calendar-title">
            <div className="dashboard-panel-heading">
              <h3 id="dashboard-calendar-title">Calendário</h3>
              <small>Outubro 2026</small>
            </div>
            <div className="calendar-grid" aria-label="Calendário de outubro de 2026 com prova no dia 11">
              {calendarioOutubro.map((dia, index) => (
                <span key={`${dia}-${index}`} className={dia === "11" ? "is-marked" : undefined}>
                  {dia}
                </span>
              ))}
            </div>
          </section>

          <section className="dashboard-panel dashboard-deadline" aria-labelledby="dashboard-deadline-title">
            <div className="dashboard-panel-heading">
              <h3 id="dashboard-deadline-title">Próximo marco</h3>
              <Clock3 aria-hidden="true" />
            </div>
            <small>{situacaoAtualPcpr2026.proximoMarco.titulo}</small>
            <strong>{situacaoAtualPcpr2026.proximoMarco.resumo}</strong>
            <p>Homologação preliminar publicada; acompanhe recursos, consultas individuais e local de prova na FGV.</p>
            <Link href={guidePath("/edital")} className="dashboard-mini-action ds-focusable">
              Ver edital
              <ArrowRight aria-hidden="true" />
            </Link>
          </section>

          <section className="dashboard-panel dashboard-progress" aria-labelledby="dashboard-progress-title">
            <h3 id="dashboard-progress-title">Progresso geral</h3>
            <div className="progress-layout">
              <div className="progress-ring" aria-hidden="true">
                <strong>{etapasOficiais.length}</strong>
                <span>etapas</span>
              </div>
              <ul>
                <li><CheckCircle2 aria-hidden="true" /> {etapasComData} com data</li>
                <li><Clock3 aria-hidden="true" /> {etapasOficiais.length - etapasComData} aguardando</li>
              </ul>
            </div>
          </section>
        </div>

        <section className="dashboard-panel dashboard-documents" aria-labelledby="dashboard-documents-title">
          <FileText aria-hidden="true" />
          <div>
            <h3 id="dashboard-documents-title">Documentos importantes</h3>
            <p>{DOCUMENTO_EDITAL} · Conferido em {formatarData(DATA_CONFERENCIA_EDITAL)}</p>
          </div>
          <Link href={guidePath("/fontes")} className="dashboard-mini-action ds-focusable">
            Visualizar
          </Link>
        </section>
      </div>
    </aside>
  );
}
