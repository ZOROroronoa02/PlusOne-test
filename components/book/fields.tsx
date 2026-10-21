"use client";

import type { ReactNode } from "react";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  className = "",
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block font-mono text-[11px] uppercase tracking-widest text-muted"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error ? (
        <p className="mt-2 text-xs text-muted">{hint}</p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-2 text-xs font-bold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  caption?: string;
  meta?: string;
}

export function ChoiceGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
  name,
  layout = "wrap",
  error,
}: {
  legend: string;
  options: ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  name: string;
  layout?: "wrap" | "stack";
  error?: string;
}) {
  const listClass =
    layout === "stack" ? "flex flex-col gap-3" : "flex flex-wrap gap-2.5";

  return (
    <fieldset>
      <legend className="font-mono text-[11px] uppercase tracking-widest text-muted">
        {legend}
      </legend>
      <div role="radiogroup" aria-label={legend} className={`mt-3 ${listClass}`}>
        {options.map((option) => {
          const selected = value === option.value;
          const inputId = `${name}-${option.value}`.replace(/\s+/g, "-");
          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`choice cursor-pointer rounded-2xl border-2 px-4 py-3 transition-colors ${
                selected
                  ? "border-ink bg-ink text-bg"
                  : "border-ink bg-transparent hover:bg-accent/20"
              } ${layout === "wrap" ? "text-sm font-bold" : ""}`}
            >
              <input
                id={inputId}
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className={
                    layout === "wrap"
                      ? "font-bold"
                      : "font-display text-lg font-bold tracking-tight"
                  }
                >
                  {option.label}
                </span>
                {option.caption ? (
                  <span className="text-xs text-muted">{option.caption}</span>
                ) : null}
                {option.meta ? (
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    {option.meta}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-xs font-bold text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-ink bg-bg px-4 py-3 font-body text-base text-ink placeholder:text-muted focus-visible:border-accent";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={`${inputClass} min-h-28 resize-y ${props.className ?? ""}`}
    />
  );
}

export function WizardNav({
  onBack,
  onNext,
  nextLabel = "Continue",
  backLabel = "Back",
  nextDisabled = false,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      {onBack ? (
        <button type="button" onClick={onBack} className="btn btn-ghost">
          {backLabel}
        </button>
      ) : null}
      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          className="btn btn-accent"
          disabled={nextDisabled}
        >
          {nextLabel}
        </button>
      ) : null}
    </div>
  );
}
