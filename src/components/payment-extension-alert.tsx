import Link from "next/link";
import { ArrowRight, CalendarClock, ExternalLink, FileCheck2, ShieldAlert } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import {
  situacaoAtualPcpr2026,
  URL_FONTE_FGV,
} from "@/data/edital";
import { atualizacoes } from "@/data/portal";
import { formatarData } from "@/lib/format";
import { guidePath } from "@/config/site-config";

const feed = atualizacoes.slice(0, 5);

export function PaymentExtensionAlert() {
  return (
    <Card as="section" className="final-stretch-panel" aria-labelledby="official-status-title">
      <div className="final-stretch-status">
        <div className="final-stretch-heading">
          <Badge variant="accent">Situação oficial</Badge>
          <span>{situacaoAtualPcpr2026.status}</span>
        </div>
        <div className="final-stretch-copy">
          <div className="final-stretch-icon" aria-hidden="true">
            <FileCheck2 />
          </div>
          <div>
            <h2 id="official-status-title">{situacaoAtualPcpr2026.statusCurto}</h2>
            <p>{situacaoAtualPcpr2026.substatus}</p>
          </div>
        </div>
        <div className="final-stretch-meta">
          <span>Última movimentação oficial</span>
          <strong>{formatarData(situacaoAtualPcpr2026.ultimaMovimentacao)}</strong>
          <p>{situacaoAtualPcpr2026.ultimaMovimentacaoDescricao}</p>
        </div>
      </div>

      <div className="next-milestone-card">
        <div>
          <Badge variant="neutral">Próximo grande marco</Badge>
          <h3>{situacaoAtualPcpr2026.proximoMarco.titulo}</h3>
        </div>
        <div className="next-milestone-date">
          <CalendarClock aria-hidden="true" />
          <strong>11 OUT 2026</strong>
          <span>13h → 18h</span>
        </div>
        <a className="inline-link ds-focusable" href={URL_FONTE_FGV} target="_blank" rel="noopener noreferrer">
          Acompanhar na FGV
          <ExternalLink aria-hidden="true" />
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      </div>

      <div className="official-feed" aria-labelledby="official-feed-title">
        <div className="official-feed-heading">
          <ShieldAlert aria-hidden="true" />
          <h3 id="official-feed-title">Últimas atualizações</h3>
        </div>
        <ol>
          {feed.map((item) => (
            <li key={item.id}>
              <time dateTime={item.data}>{formatarData(item.data).slice(0, 5)}</time>
              <span>{item.titulo}</span>
            </li>
          ))}
        </ol>
        <Link className="official-feed-link ds-focusable" href={guidePath("/atualizacoes")}>
          Ver todas as atualizações
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
