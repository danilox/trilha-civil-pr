"use client";

import { ArrowRight, Check, Search } from "lucide-react";
import type { FormEvent } from "react";
import { Button, Card, Input } from "@/components/ui";
import { CandidateValidationSuccess } from "@/components/competition/candidate-validation-success";
import type { CandidateValidationResult, OfficialCandidate } from "@/types/competition";

type ValidationState = "idle" | "loading" | "success" | "error";

type CandidateValidationFormProps = {
  candidate: OfficialCandidate | null;
  error: string;
  state: ValidationState;
  onSubmit: (registrationNumber: string, fullName: string) => Promise<CandidateValidationResult>;
  onSuccess: (candidate: OfficialCandidate) => void;
  onContinue: () => void;
  onKeep: () => void;
};

export function CandidateValidationForm({
  candidate,
  error,
  onContinue,
  onKeep,
  onSubmit,
  onSuccess,
  state,
}: CandidateValidationFormProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const registrationNumber = String(formData.get("registrationNumber") || "");
    const fullName = String(formData.get("fullName") || "");
    const result = await onSubmit(registrationNumber, fullName);
    if (result.status === "success") onSuccess(result.candidate);
  }

  if (state === "success" && candidate?.hasExistingEntry) {
    const region = candidate.competitionRegion === "interior"
      ? "Interior do Paraná"
      : candidate.competitionRegion === "curitiba_rm" ? "Curitiba e RMC" : null;

    return (
      <Card as="section" className="competition-flow-card" aria-labelledby="participacao-existente" padding="lg">
        <div className="competition-card-heading">
          <Check aria-hidden="true" />
          <div>
            <h2 id="participacao-existente">Você já participou do Radar</h2>
            <p>Região atual: {region ?? "Não foi possível identificar a região registrada."}</p>
          </div>
        </div>
        <div className="competition-confirmation-actions">
          <Button type="button" onClick={onKeep} disabled={!region}>Manter minha escolha</Button>
          <Button type="button" variant="secondary" onClick={onContinue}>Alterar região</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card as="section" className="competition-flow-card competition-validation-card" aria-labelledby="validar-inscricao" padding="lg">
      <div className="competition-card-heading">
        <Search aria-hidden="true" />
        <div>
          <h2 id="validar-inscricao">Validar inscrição</h2>
          <p>Antes de participar, confirme sua inscrição na relação utilizada pela plataforma.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="competition-validation-form">
        <Input
          id="competition-registration"
          label="Número de inscrição"
          name="registrationNumber"
          inputMode="numeric"
          autoComplete="off"
          required
        />
        <Input
          id="competition-name"
          label="Nome completo"
          name="fullName"
          autoComplete="name"
          required
        />

        <p className="competition-form-status" aria-live="polite">
          {state === "loading" ? "Conferindo relação oficial..." : null}
          {state === "error" ? error : null}
        </p>

        <Button type="submit" disabled={state === "loading"} className="competition-submit-button">
          Validar inscrição
          <ArrowRight aria-hidden="true" />
        </Button>
      </form>

      {state === "success" && candidate ? (
        <>
          <CandidateValidationSuccess candidate={candidate} />
          <Button type="button" onClick={onContinue} className="competition-submit-button">
            Continuar
            <ArrowRight aria-hidden="true" />
          </Button>
        </>
      ) : null}
    </Card>
  );
}
