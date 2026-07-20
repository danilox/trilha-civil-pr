import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Input({ className, error, hint, id, label, required, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <label className="ds-field" htmlFor={inputId}>
      <span className="ds-field-label">{label}{required ? " *" : null}</span>
      <input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn("ds-field-control", className)}
        {...props}
      />
      {hint ? <span id={hintId} className="ds-field-hint">{hint}</span> : null}
      {error ? <span id={errorId} className="ds-field-error">{error}</span> : null}
    </label>
  );
}
