"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MessageCircle, RotateCcw } from "lucide-react";
import { COMPANIONS } from "@/content/companions";
import {
  DURATIONS,
  IN_PERSON_CITIES,
  IN_PERSON_MIN_HOURS,
  OCCASIONS,
  PROMO_CODE,
  VIRTUAL_MODES,
} from "@/content/booking-options";
import {
  EMPTY_DRAFT,
  bookingWhatsappLink,
  buildBookingMessage,
  clearDraft,
  estimateTotal,
  formatBookingDate,
  isPromoValid,
  loadDraft,
  saveDraft,
  type BookingDraft,
} from "@/lib/booking";
import {
  ChoiceGroup,
  Field,
  TextArea,
  TextInput,
  WizardNav,
} from "@/components/book/fields";
import { WizardProgress } from "@/components/book/wizard-progress";
import { formatINR } from "@/lib/format";

const STEP_LABELS = ["Companion", "Occasion", "Format", "Contact"];
const STEPS = STEP_LABELS.length;
const REVIEW_STEP = STEPS;
const MATCH_VALUE = "__match__";

type Errors = Record<string, string>;

function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function validateStep(step: number, draft: BookingDraft): Errors {
  const errors: Errors = {};

  if (step === 1) {
    if (!draft.occasion) errors.occasion = "Pick the occasion.";
    if (!draft.date) errors.date = "Choose a date.";
    else if (draft.date < todayISO()) errors.date = "That date has passed.";
    if (!draft.time) errors.time = "Choose a start time.";
    if (!draft.hours) errors.hours = "Pick a duration.";
  }

  if (step === 2) {
    if (!draft.format) errors.format = "In person or virtual?";
    else if (draft.format === "in-person" && !draft.city) {
      errors.city = "Which city should we meet in?";
    }
  }

  if (step === 3) {
    if (draft.name.trim().length < 2) errors.name = "Tell us what to call you.";
  }

  return errors;
}

export function BookingWizard() {
  const [draft, setDraft] = useState<BookingDraft>(EMPTY_DRAFT);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [hydrated, setHydrated] = useState(false);
  const [sent, setSent] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const companion = useMemo(
    () => COMPANIONS.find((item) => item.id === draft.companionId),
    [draft.companionId],
  );

  // Restore a saved draft, then let a ?companion=<id> link override it.
  useEffect(() => {
    const stored = loadDraft();
    let next: BookingDraft = stored ?? EMPTY_DRAFT;

    let preselected: string | null = null;
    try {
      const params = new URLSearchParams(window.location.search);
      const candidate = params.get("companion");
      if (candidate && COMPANIONS.some((item) => item.id === candidate)) {
        preselected = candidate;
      }
    } catch {
      /* no window access — ignore */
    }

    if (preselected) {
      next = { ...next, companionId: preselected };
    }

    setDraft(next);
    if (preselected) setStep(1);
    setHydrated(true);
  }, []);

  // Persist every change so the wizard survives a refresh.
  useEffect(() => {
    if (hydrated) saveDraft(draft);
  }, [draft, hydrated]);

  const firstStepRender = useRef(true);
  useEffect(() => {
    if (firstStepRender.current) {
      firstStepRender.current = false;
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    topRef.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, [step]);

  const update = useCallback((patch: Partial<BookingDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setErrors({});
  }, []);

  const goNext = useCallback(() => {
    const found = validateStep(step, draft);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, REVIEW_STEP));
  }, [draft, step]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  }, []);

  const restart = useCallback(() => {
    clearDraft();
    setDraft(EMPTY_DRAFT);
    setStep(0);
    setErrors({});
  }, []);

  const estimate = estimateTotal(draft, companion);
  const promoApplied = isPromoValid(draft.promo);
  const message = buildBookingMessage(draft, companion);
  const waHref = bookingWhatsappLink(draft, companion);

  const punchSteps = STEP_LABELS.map((label, index) => ({
    label,
    done: index < step,
    current: index === step,
  }));

  const durationOptions = DURATIONS.filter((hours) =>
    draft.format === "in-person" ? hours >= IN_PERSON_MIN_HOURS : true,
  ).map((hours) => ({ value: String(hours), label: `${hours}h` }));

  return (
    <div ref={topRef} className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-start">
      {/* -------------------------------------------------- Wizard column */}
      <div className="rounded-3xl border-2 border-ink p-6 sm:p-8">
        <WizardProgress
          steps={punchSteps}
          onJump={step === REVIEW_STEP ? (index) => setStep(index) : undefined}
        />

        <div className="mt-8 border-t-2 border-ink pt-8">
          {step === 0 ? (
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Who&apos;s the plus-one?
              </h2>
              <ChoiceGroup
                legend="Pick a companion"
                name="companion"
                layout="stack"
                value={draft.companionId ?? MATCH_VALUE}
                onChange={(value) =>
                  update({
                    companionId: value === MATCH_VALUE ? null : value,
                  })
                }
                options={[
                  ...COMPANIONS.map((item) => ({
                    value: item.id,
                    label: item.alias,
                    caption: item.role,
                    meta: `${formatINR(item.ratePerHour)}/hr · ${item.city}`,
                  })),
                  {
                    value: MATCH_VALUE,
                    label: "Let PlusOne match me",
                    caption: "Describe the vibe, we'll assign the best fit",
                  },
                ]}
              />
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                What&apos;s the occasion?
              </h2>
              <ChoiceGroup
                legend="Occasion"
                name="occasion"
                value={draft.occasion || null}
                onChange={(value) => update({ occasion: value })}
                options={OCCASIONS.map((occasion) => ({
                  value: occasion,
                  label: occasion,
                }))}
                error={errors.occasion}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Date" htmlFor="booking-date" error={errors.date}>
                  <TextInput
                    id="booking-date"
                    type="date"
                    min={todayISO()}
                    value={draft.date}
                    onChange={(event) => update({ date: event.target.value })}
                    aria-invalid={Boolean(errors.date)}
                  />
                </Field>
                <Field
                  label="Start time"
                  htmlFor="booking-time"
                  error={errors.time}
                >
                  <TextInput
                    id="booking-time"
                    type="time"
                    value={draft.time}
                    onChange={(event) => update({ time: event.target.value })}
                    aria-invalid={Boolean(errors.time)}
                  />
                </Field>
              </div>

              <div>
                <ChoiceGroup
                  legend="How long?"
                  name="hours"
                  value={String(draft.hours)}
                  onChange={(value) => update({ hours: Number(value) })}
                  options={durationOptions}
                  error={errors.hours}
                />
                {draft.format === "in-person" ? (
                  <p className="mt-3 text-xs text-muted">
                    In-person bookings have a {IN_PERSON_MIN_HOURS}-hour
                    minimum.
                  </p>
                ) : null}
              </div>

              <Field
                label="Anything we should know? (optional)"
                htmlFor="booking-notes"
                hint="Family situation, conversation topics to avoid, dress code, who you're meeting — all useful."
              >
                <TextArea
                  id="booking-notes"
                  value={draft.notes}
                  onChange={(event) => update({ notes: event.target.value })}
                  placeholder="My cousin's sangeet in Ghaziabad. Loud family, nobody knows I'm single, keep it casual."
                />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                In person, or online?
              </h2>
              <ChoiceGroup
                legend="Format"
                name="format"
                value={draft.format}
                onChange={(value) =>
                  update({
                    format: value,
                    city: value === "virtual" ? "" : draft.city,
                    hours:
                      value === "in-person"
                        ? Math.max(draft.hours, IN_PERSON_MIN_HOURS)
                        : draft.hours,
                  })
                }
                options={[
                  {
                    value: "in-person",
                    label: "In person",
                    caption: "Public places across Delhi NCR",
                  },
                  {
                    value: "virtual",
                    label: "Virtual",
                    caption: "Text, voice or video · worldwide",
                  },
                ]}
                error={errors.format}
              />

              {draft.format === "in-person" ? (
                <ChoiceGroup
                  legend="City"
                  name="city"
                  value={draft.city || null}
                  onChange={(value) => update({ city: value })}
                  options={IN_PERSON_CITIES.map((city) => ({
                    value: city as string,
                    label: city,
                  }))}
                  error={errors.city}
                />
              ) : null}

              {draft.format === "virtual" ? (
                <ChoiceGroup
                  legend="How should we talk?"
                  name="virtualMode"
                  value={draft.virtualMode}
                  onChange={(value) =>
                    update({
                      virtualMode: value as BookingDraft["virtualMode"],
                    })
                  }
                  options={VIRTUAL_MODES.map((mode) => ({
                    value: mode,
                    label: mode,
                    meta: `${formatINR(
                      mode === "Text" ? 149 : mode === "Voice" ? 199 : 299,
                    )}/hr`,
                  }))}
                />
              ) : null}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Last bit — who are we talking to?
              </h2>
               <Field
                label="Alias (made-up name)"
                htmlFor="booking-name"
                error={errors.name}
                hint="Use any name or alias — we never need or store your legal name."
              >
                <TextInput
                  id="booking-name"
                  value={draft.name}
                  onChange={(event) => update({ name: event.target.value })}
                  placeholder="What should the companion call you?"
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                />
              </Field>

              <Field
                label="Promo code (optional)"
                htmlFor="booking-promo"
                hint={`Try ${PROMO_CODE} — ₹100 off your first booking.`}
              >
                <TextInput
                  id="booking-promo"
                  value={draft.promo}
                  onChange={(event) => update({ promo: event.target.value })}
                  placeholder={PROMO_CODE}
                  aria-describedby="promo-status"
                />
              </Field>
              <p
                id="promo-status"
                className="text-xs font-bold"
                aria-live="polite"
              >
                {draft.promo.trim() === ""
                  ? ""
                  : promoApplied
                    ? `✓ ${PROMO_CODE} applied — ${formatINR(100)} off.`
                    : "That code isn't valid. You can still book without it."}
              </p>

              <p className="text-sm text-muted">
                We never ask for a card here. Your details go into the WhatsApp
                message so a human can confirm your slot.
              </p>
            </div>
          ) : null}

          {step === REVIEW_STEP ? (
            <div className="space-y-7">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  Final step
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Review &amp; send
                </h2>
                  <p className="mt-3 text-sm text-muted">
                    This is exactly what lands in our WhatsApp. Nothing is charged
                    yet. Our team calls you within 10 minutes to verify the
                    booking.
                  </p>
              </div>

              <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl border-2 border-ink bg-panel p-5 font-mono text-xs leading-relaxed text-panel-ink sm:text-sm">
                {message}
              </pre>

              <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSent(true)}
                    className="btn btn-accent text-base"
                  >
                    <MessageCircle size={18} aria-hidden />
                    Send on WhatsApp
                  </a>
                <button type="button" onClick={restart} className="btn btn-ghost">
                  <RotateCcw size={16} aria-hidden />
                  Start over
                </button>
              </div>
              {sent ? (
                <p className="text-sm font-bold text-accent" role="status">
                  WhatsApp opened — finish sending the message there. You can edit
                  and resend anytime.
                </p>
              ) : null}

              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  Change something
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {STEP_LABELS.map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setStep(index)}
                      className="rounded-full border-2 border-ink px-3.5 py-1.5 text-xs font-bold transition-colors hover:bg-ink hover:text-bg"
                    >
                      Edit {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {step < REVIEW_STEP ? (
          <WizardNav
            onBack={step > 0 ? goBack : undefined}
            onNext={goNext}
            nextLabel={step === STEPS - 1 ? "Review booking" : "Continue"}
            backLabel="Back"
          />
        ) : (
          <WizardNav
            onBack={() => setStep(STEPS - 1)}
            backLabel={"Back"}
          />
        )}
      </div>

      {/* ------------------------------------------------- Live summary */}
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-3xl border-2 border-ink bg-panel p-6 text-panel-ink">
          <p className="font-mono text-[11px] uppercase tracking-widest opacity-70">
            Your booking
          </p>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="opacity-70">Companion</dt>
              <dd className="text-right font-bold">
                {companion ? companion.alias : "Let PlusOne match"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-70">Occasion</dt>
              <dd className="text-right font-bold">
                {draft.occasion || "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-70">When</dt>
              <dd className="text-right font-bold">
                {draft.date ? formatBookingDate(draft.date) : "—"}
                {draft.time ? ` · ${draft.time}` : ""}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-70">Duration</dt>
              <dd className="text-right font-bold">{draft.hours}h</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-70">Format</dt>
              <dd className="text-right font-bold">
                {draft.format === "virtual"
                  ? `Virtual · ${draft.virtualMode}`
                  : draft.format === "in-person"
                    ? `In person · ${draft.city || "—"}`
                    : "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t-2 border-panel-ink pt-5">
            {draft.format ? (
              <>
                <p className="flex items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-wider opacity-70">
                  <span>Estimate</span>
                  <span className="tabular-nums">
                    {formatINR(estimate.perHour)}/hr
                  </span>
                </p>
                {estimate.discount > 0 ? (
                  <p className="mt-2 flex items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-wider">
                    <span>{PROMO_CODE}</span>
                    <span>−{formatINR(estimate.discount)}</span>
                  </p>
                ) : null}
                <p className="mt-3 font-display text-4xl font-extrabold tracking-tight">
                  {formatINR(estimate.total)}
                </p>
                <p className="mt-2 text-xs opacity-70">
                  Estimate only — we confirm the final amount on WhatsApp.
                </p>
              </>
            ) : (
              <p className="text-sm opacity-70">
                Pick in person or virtual to see your estimate.
              </p>
            )}
          </div>

          {step === REVIEW_STEP ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setSent(true)}
              className="btn btn-accent mt-6 w-full"
            >
              <MessageCircle size={18} aria-hidden />
              Send on WhatsApp
            </a>
          ) : null}

          <p className="mt-5 flex items-center gap-2 text-xs opacity-70">
            <ArrowRight size={13} aria-hidden />
            Progress saves automatically — refresh and pick up where you left
            off.
          </p>
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs text-muted">
          <ArrowLeft size={14} aria-hidden className="mt-0.5 shrink-0" />
          Strictly platonic, ID-verified companions, public places only. Full
          terms on the Trust &amp; Safety page.
        </p>
      </aside>
    </div>
  );
}
