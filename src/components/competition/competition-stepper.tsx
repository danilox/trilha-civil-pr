type CompetitionStep = "validation" | "choice" | "confirmation";

const steps: { id: CompetitionStep; label: string; number: string }[] = [
  { id: "validation", label: "Validação", number: "01" },
  { id: "choice", label: "Escolha", number: "02" },
  { id: "confirmation", label: "Confirmação", number: "03" },
];

export function CompetitionStepper({ currentStep }: { currentStep: CompetitionStep }) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <nav className="competition-stepper" aria-label="Etapas da participação">
      <ol>
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={index === currentIndex ? "is-active" : index < currentIndex ? "is-complete" : undefined}
            aria-current={index === currentIndex ? "step" : undefined}
          >
            <span>{step.number}</span>
            <strong>{step.label}</strong>
          </li>
        ))}
      </ol>
    </nav>
  );
}
