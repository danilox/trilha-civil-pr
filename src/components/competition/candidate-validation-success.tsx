import { Check, LockKeyhole, MapPin, UserCheck } from "lucide-react";
import type { OfficialCandidate } from "@/types/competition";

export function CandidateValidationSuccess({ candidate }: { candidate: OfficialCandidate }) {
  return (
    <section className="competition-validation-success" aria-labelledby="inscricao-localizada">
      <div>
        <Check aria-hidden="true" />
        <h3 id="inscricao-localizada">Inscrição localizada</h3>
      </div>
      <dl>
        <div>
          <dt><UserCheck aria-hidden="true" /> Nome</dt>
          <dd>{candidate.nomeMascarado ?? "Dado protegido no servidor"}</dd>
        </div>
        <div>
          <dt><LockKeyhole aria-hidden="true" /> Inscrição</dt>
          <dd>{candidate.inscricaoMascarada ? `Inscrição ${candidate.inscricaoMascarada}` : "Identificador criptográfico gerado"}</dd>
        </div>
        <div>
          <dt>Cargo</dt>
          <dd>{candidate.cargo}</dd>
        </div>
        <div>
          <dt><MapPin aria-hidden="true" /> Local de prova</dt>
          <dd>{candidate.localProva}</dd>
        </div>
        <div>
          <dt><LockKeyhole aria-hidden="true" /> Status</dt>
          <dd>{candidate.hasExistingEntry ? "Você já participou do Radar" : "Apto a declarar região"}</dd>
        </div>
      </dl>
    </section>
  );
}
