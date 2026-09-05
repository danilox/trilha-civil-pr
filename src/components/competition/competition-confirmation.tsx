"use client";

import { Check, UserCheck } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { competitionRegionOptions } from "@/data/competition";
import type { CompetitionRegionId, OfficialCandidate } from "@/types/competition";

type CompetitionConfirmationProps = {
  candidate: OfficialCandidate;
  regionId: CompetitionRegionId;
  status: "idle" | "submitting" | "success" | "already-submitted";
  onBack: () => void;
  onConfirm: () => void;
};

export function CompetitionConfirmation({
  candidate,
  onBack,
  onConfirm,
  regionId,
  status,
}: CompetitionConfirmationProps) {
  const region = competitionRegionOptions.find((item) => item.id === regionId);
  const alreadyParticipated = candidate.hasExistingEntry;

  return (
    <Card as="section" className="competition-flow-card competition-confirmation-card" aria-labelledby="confirmar-participacao" padding="lg">
      <div className="competition-card-heading">
        <UserCheck aria-hidden="true" />
        <div>
          <h2 id="confirmar-participacao">{alreadyParticipated ? "Confirmar alteração de região" : "Confirmar participação"}</h2>
          <p>{alreadyParticipated ? "Sua participação será mantida. Apenas a região escolhida será atualizada." : "Revise os dados seguros antes de registrar sua escolha na amostra."}</p>
        </div>
      </div>

      <dl className="competition-confirmation-list">
        <div>
          <dt>Cargo</dt>
          <dd>{candidate.cargo}</dd>
        </div>
        <div>
          <dt>Região escolhida</dt>
          <dd>{region?.code} - {region?.subtitle}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd><Check aria-hidden="true" /> {alreadyParticipated ? "Você já participou do Radar" : "Inscrição localizada"}</dd>
        </div>
      </dl>

      <p className="competition-form-status" aria-live="polite">
        {status === "submitting" ? alreadyParticipated ? "Atualizando região..." : "Registrando participação..." : null}
        {status === "success" ? "Participação registrada." : null}
        {status === "already-submitted" ? "Região atualizada ou participação já registrada." : null}
      </p>

      <div className="competition-confirmation-actions">
        <Button type="button" variant="secondary" onClick={onBack}>
          {alreadyParticipated ? "Voltar à escolha de região" : "Alterar região"}
        </Button>
        <Button type="button" onClick={onConfirm} disabled={status === "submitting"}>
          {alreadyParticipated ? "Salvar alteração" : "Confirmar minha região"}
          <Check aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
}
