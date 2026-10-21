import { Check } from "lucide-react";

export interface PunchStep {
  label: string;
  done: boolean;
  current: boolean;
}

/**
 * Booking progress as a punch card — the micro-reward for finishing a step.
 */
export function WizardProgress({
  steps,
  onJump,
}: {
  steps: PunchStep[];
  onJump?: (index: number) => void;
}) {
  return (
    <ol className="flex items-start gap-2" aria-label="Booking progress">
      {steps.map((step, index) => {
        const clickable = Boolean(onJump) && step.done && !step.current;
        const content = (
          <>
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink font-mono text-xs font-bold ${
                step.done
                  ? "bg-accent text-accent-ink"
                  : step.current
                    ? "bg-ink text-bg"
                    : "bg-transparent"
              }`}
              aria-hidden
            >
              {step.done ? <Check size={15} strokeWidth={3.5} /> : index + 1}
            </span>
            <span
              className={`mt-2 text-center font-mono text-[10px] uppercase leading-tight tracking-wider ${
                step.current ? "text-ink" : "text-muted"
              }`}
            >
              {step.label}
            </span>
          </>
        );

        return (
          <li key={step.label} className="flex flex-1 flex-col items-center">
            {clickable ? (
              <button
                type="button"
                onClick={() => onJump?.(index)}
                className="flex flex-col items-center"
                aria-label={`Go back to step ${index + 1}: ${step.label}`}
              >
                {content}
              </button>
            ) : (
              <span
                className="flex flex-col items-center"
                aria-current={step.current ? "step" : undefined}
              >
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
