"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  PROMO,
  formatDeadline,
  nextPromoDeadline,
  splitCountdown,
  type CountdownParts,
} from "@/lib/promo";

const UNITS: Array<{ key: keyof Omit<CountdownParts, "expired">; label: string }> =
  [
    { key: "days", label: "days" },
    { key: "hours", label: "hrs" },
    { key: "minutes", label: "min" },
    { key: "seconds", label: "sec" },
  ];

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

/**
 * Expiring promo strip with a real, live countdown.
 * Renders dashes on the server and starts ticking after mount, so there is
 * never a hydration mismatch between build time and the visitor's clock.
 */
export function PromoCountdown({ className = "" }: { className?: string }) {
  const [parts, setParts] = useState<CountdownParts | null>(null);
  const [deadline, setDeadline] = useState<string | null>(null);

  useEffect(() => {
    const target = nextPromoDeadline();
    setDeadline(formatDeadline(target));

    const tick = () => setParts(splitCountdown(new Date(), target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const expired = parts?.expired ?? false;

  return (
    <section
      aria-label="Limited-time offer"
      className={`border-y-2 border-ink bg-accent text-accent-ink ${className}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center sm:text-left">
          <Sparkles size={18} aria-hidden />
          <span className="font-display text-lg font-extrabold uppercase tracking-tight sm:text-xl">
            {PROMO.headline}
          </span>
          <span className="text-sm font-semibold sm:text-base">
            → {PROMO.benefit}, code{" "}
            <span className="font-mono font-bold">{PROMO.code}</span>
          </span>
        </p>

        {expired ? (
          <p className="font-mono text-xs uppercase tracking-wider">
            Offer ended — fresh drop every Monday
          </p>
        ) : (
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest">
              Ends {deadline ?? "Sunday 23:59"}
            </span>
            <div className="flex items-center gap-1.5" role="timer">
              {UNITS.map((unit) => (
                <span
                  key={unit.key}
                  className="flex min-w-[3.1rem] flex-col items-center rounded-lg border-2 border-ink bg-bg px-2 py-1.5 text-ink"
                >
                  <span className="font-mono text-base font-bold leading-none tabular-nums">
                    {parts ? pad(parts[unit.key]) : "--"}
                  </span>
                  <span className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
                    {unit.label}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
