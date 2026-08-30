"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ArrowRight, Check, LockKeyhole, ShieldCheck, UserCheck, Users } from "lucide-react";
import { Button, MetricCard } from "@/components/ui";
import { CandidateValidationForm } from "@/components/competition/candidate-validation-form";
import { CompetitionConfirmation } from "@/components/competition/competition-confirmation";
import { CompetitionResults } from "@/components/competition/competition-results";
import { CompetitionStepper } from "@/components/competition/competition-stepper";
import { RegionSelector } from "@/components/competition/region-selector";
import {
  backendUnavailableMessage,
  fetchCompetitionStatistics,
  getCompetitionStatistics,
  isCompetitionMockEnabled,
  submitCompetitionResponse,
  validateOfficialCandidate,
} from "@/lib/competition-data";
import { formatarDecimal, formatarNumero } from "@/lib/format";
import type {
  CandidateValidationResult,
  CompetitionRegionId,
  CompetitionSubmission,
  OfficialCandidate,
} from "@/types/competition";
import { competitionRegionApiValueById, competitionRegionIdByApiValue } from "@/data/competition";

type Step = "validation" | "choice" | "confirmation";
type ValidationState = "idle" | "loading" | "success" | "error";
type SubmissionState = "idle" | "submitting" | "success" | "already-submitted";

export function CompetitionPage() {
  const statistics = getCompetitionStatistics();
  const [liveStatistics, setLiveStatistics] = useState(statistics);
  const [step, setStep] = useState<Step>("validation");
  const [candidate, setCandidate] = useState<OfficialCandidate | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<CompetitionRegionId | null>(null);
  const [validationState, setValidationState] = useState<ValidationState>("idle");
  const [validationError, setValidationError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [backendUnavailable, setBackendUnavailable] = useState(false);
  const [submission, setSubmission] = useState<CompetitionSubmission | null>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [isPending, startTransition] = useTransition();
  const resultsRef = useRef<HTMLElement | null>(null);

  const [regionOne, regionTwo] = liveStatistics.regions;

  useEffect(() => {
    let active = true;
    fetchCompetitionStatistics().then((result) => {
      if (!active) return;
      setLiveStatistics(result.statistics);
      setBackendUnavailable(result.unavailable);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleValidation(registrationNumber: string, fullName: string): Promise<CandidateValidationResult> {
    setValidationState("loading");
    setValidationError("");
    const result = await validateOfficialCandidate(registrationNumber, fullName);
    if (result.status === "error") {
      setValidationState("error");
      setValidationError(result.message);
      return result;
    }

    if (result.candidate.hasExistingEntry) {
      setSubmissionState("already-submitted");
      if (result.candidate.competitionRegion) {
        setSelectedRegion(competitionRegionIdByApiValue[result.candidate.competitionRegion]);
      }
    } else {
      setSubmissionState("idle");
    }
    setValidationState("success");
    return result;
  }

  function handleValidationSuccess(foundCandidate: OfficialCandidate) {
    setCandidate(foundCandidate);
  }

  async function handleConfirm() {
    if (!candidate || !selectedRegion) return;

    setSubmissionState("submitting");
    setSubmissionError("");

    const result = await submitCompetitionResponse(
      candidate.validationToken,
      competitionRegionApiValueById[selectedRegion],
    );

    if (!result.ok) {
      setSubmissionState(result.status === "unavailable" ? "idle" : "idle");
      setSubmissionError(result.message || backendUnavailableMessage);
      return;
    }

    setSubmission({
      validationToken: candidate.validationToken,
      regionId: selectedRegion,
      submittedAt: new Date().toISOString(),
    });
    setSubmissionState(result.status === "updated" ? "already-submitted" : "success");

    const refreshed = await fetchCompetitionStatistics();
    setLiveStatistics(refreshed.statistics);
    setBackendUnavailable(refreshed.unavailable);
  }

  useEffect(() => {
    if (submissionState !== "success") return;
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submissionState]);

  function continueToConfirmation() {
    if (!selectedRegion) return;
    startTransition(() => setStep("confirmation"));
  }

  return (
    <div className="competition-shell">
      <header className="competition-hero">
        <div>
          <span>Concorrência PC-PR 2026</span>
          <h1>Concorrência PC-PR 2026</h1>
          <p>Veja como candidatos validados estão declarando sua região de concorrência.</p>
        </div>
        <aside className="competition-trust-strip" aria-label="Critérios de confiança">
          <span><Users aria-hidden="true" /> Dados colaborativos</span>
          <span><UserCheck aria-hidden="true" /> Inscrição conferida</span>
          <span><LockKeyhole aria-hidden="true" /> Nenhum nome exibido publicamente</span>
          {isCompetitionMockEnabled ? <span><ShieldCheck aria-hidden="true" /> DEV/MOCK</span> : null}
        </aside>
      </header>

      {backendUnavailable ? (
        <div className="competition-success-banner competition-unavailable-banner" role="status">
          <ShieldCheck aria-hidden="true" />
          <span>Backend real indisponível. Em produção, os dados não serão simulados.</span>
        </div>
      ) : null}

      <section className="competition-metrics" aria-label="Métricas gerais da amostra">
        <MetricCard label="Participantes" value={formatarNumero(liveStatistics.totalParticipants)} description="dados agregados" />
        <MetricCard label="Região 1" value={`${formatarDecimal(regionOne.percentage)}%`} description={`${formatarNumero(regionOne.count)} no Interior`} />
        <MetricCard label="Região 2" value={`${formatarDecimal(regionTwo.percentage)}%`} description={`${formatarNumero(regionTwo.count)} em Curitiba/RMC`} />
      </section>

      <section className="competition-flow" aria-label="Participar da pesquisa">
        <CompetitionStepper currentStep={step} />

        {step === "validation" ? (
          <CandidateValidationForm
            candidate={candidate}
            error={validationError}
            state={validationState}
            onContinue={() => setStep("choice")}
            onSubmit={handleValidation}
            onSuccess={handleValidationSuccess}
          />
        ) : null}

        {step === "choice" ? (
          <section className="competition-flow-card competition-choice-step" aria-labelledby="escolha-regiao-modalidade">
            <div className="competition-card-heading">
              <ShieldCheck aria-hidden="true" />
              <div>
                <h2 id="escolha-regiao-modalidade">Onde você está concorrendo?</h2>
                <p>A região é declarada por você no Radar e não é inferida pelo local de prova.</p>
              </div>
            </div>
            <RegionSelector selectedRegion={selectedRegion} onSelect={setSelectedRegion} />
            <Button
              type="button"
              onClick={continueToConfirmation}
              disabled={!selectedRegion || isPending}
              className="competition-submit-button"
            >
              Confirmar minha região
              <ArrowRight aria-hidden="true" />
            </Button>
          </section>
        ) : null}

        {step === "confirmation" && candidate && selectedRegion ? (
          <CompetitionConfirmation
            candidate={candidate}
            regionId={selectedRegion}
            status={submissionState}
            onBack={() => setStep("choice")}
            onConfirm={handleConfirm}
          />
        ) : null}
        {submissionError ? <p className="competition-form-status" aria-live="polite">{submissionError}</p> : null}
      </section>

      {submission ? (
        <div className="competition-success-banner" role="status">
          <Check aria-hidden="true" />
          <span>{submissionState === "already-submitted" ? "Participação já registrada." : "Participação registrada."}</span>
        </div>
      ) : null}

      {submission ? (
        <section ref={resultsRef}>
          <CompetitionResults
            statistics={liveStatistics}
            selectedRegion={selectedRegion}
            candidate={candidate}
            showMockBadge={liveStatistics.tipo === "mock"}
          />
        </section>
      ) : null}

      <p className="competition-disclaimer">
        O Radar de Concorrência é uma amostra colaborativa formada exclusivamente por candidatos encontrados na lista oficial da PC-PR 2026 que informaram voluntariamente sua região de concorrência. A distribuição regional apresentada não representa dado oficial da FGV ou da Polícia Civil do Paraná.
      </p>
    </div>
  );
}
