"use client";

import { LockKeyhole, ShieldCheck } from "lucide-react";

type ModalitySelectorProps = {
  afro: boolean;
  pcd: boolean;
};

export function ModalitySelector({ afro, pcd }: ModalitySelectorProps) {
  const statuses = [
    { label: "Ampla", active: !afro && !pcd },
    { label: "Afro", active: afro },
    { label: "PcD", active: pcd },
  ];

  return (
    <fieldset className="competition-selector-group competition-modality-group">
      <legend>Status validado</legend>
      <div className="competition-modality-options" aria-label="Status validado na base">
        {statuses.map((status) => (
          <span
            key={status.label}
            className="competition-modality-option"
            aria-current={status.active ? "true" : undefined}
          >
            {status.active ? <ShieldCheck aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
            {status.label}
          </span>
        ))}
      </div>
    </fieldset>
  );
}
