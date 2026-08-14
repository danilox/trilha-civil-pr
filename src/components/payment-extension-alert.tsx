import Link from "next/link";
import { AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui";
import {
  DATA_COMUNICADO_PRORROGACAO_PAGAMENTO,
  inscricoesEProva,
  URL_COMUNICADO_PRORROGACAO_PAGAMENTO,
  URL_REIMPRESSAO_BOLETO_FGV,
} from "@/data/edital";
import { formatarData } from "@/lib/format";

function formatarPrazo(valor: string) {
  const data = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(valor));
  const hora = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  }).format(new Date(valor)).replace(":", "h");

  return `${data} às ${hora}`;
}

export function PaymentExtensionAlert() {
  return (
    <section className="payment-extension-alert" aria-labelledby="payment-extension-title">
      <div className="payment-extension-icon" aria-hidden="true">
        <AlertCircle />
      </div>
      <div className="payment-extension-copy">
        <div className="payment-extension-heading">
          <Badge variant="orange">Prazo prorrogado</Badge>
          <span>Comunicado oficial em {formatarData(DATA_COMUNICADO_PRORROGACAO_PAGAMENTO)}</span>
        </div>
        <h2 id="payment-extension-title">Pagamento prorrogado</h2>
        <p>
          Prazo para pagamento da taxa de inscrição prorrogado até{" "}
          <strong>{formatarPrazo(inscricoesEProva.boletoFim)}</strong>. As inscrições
          permanecem encerradas; a prorrogação é exclusivamente para candidatos que já
          realizaram a inscrição.
        </p>
      </div>
      <div className="payment-extension-actions">
        <a className="ds-button ds-button-primary ds-focusable" href={URL_REIMPRESSAO_BOLETO_FGV} target="_blank" rel="noopener noreferrer">
          Reimprimir boleto — FGV
          <ExternalLink aria-hidden="true" />
          <span className="sr-only">(abre em nova aba)</span>
        </a>
        <Link className="ds-button ds-button-secondary ds-focusable" href="/concursos/pc-pr-2026/atualizacoes">
          Ver atualizações
        </Link>
        <a className="payment-extension-source ds-focusable" href={URL_COMUNICADO_PRORROGACAO_PAGAMENTO} target="_blank" rel="noopener noreferrer">
          Comunicado FGV
          <ExternalLink aria-hidden="true" />
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      </div>
    </section>
  );
}
