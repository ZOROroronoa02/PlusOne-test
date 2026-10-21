import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  GROUND_RULES,
  POLICIES,
  TRUST_POINTS,
  VERIFICATION_STEPS,
} from "@/content/trust";
import { URGENT_BOOKING_MESSAGE } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Trust & safety",
  alternates: canonical("/trust"),
  description:
    "How PlusOne keeps companionship safe: government ID plus live selfie verification, 100% platonic ground rules in writing, public places only, privacy protection, verified WhatsApp Business, and full refunds on cancellations two hours ahead.",
};

export default function TrustPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <Reveal eager>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Trust &amp; safety · the actual product
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
            Safety isn&apos;t the fine print. It&apos;s the{" "}
            <span className="mark">pitch</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            You&apos;re inviting a stranger into an important day. That only
            works if both sides feel completely safe, so we built the whole
            service around that one sentence.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="mt-9 flex flex-wrap gap-3">
            {TRUST_POINTS.map((point) => (
              <li
                key={point.id}
                className="sticker rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest"
                style={{ transform: `rotate(${point.rotate})` }}
              >
                <point.icon size={14} aria-hidden />
                {point.sticker}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Verification ------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Verification"
          title={<>Five checks before anyone meets you.</>}
          blurb="Companions don't get a badge for signing up. They get one for passing every step below — and lose it permanently if they break the rules."
        />

        <ol className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-x-16">
          {VERIFICATION_STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 0.04}
              className={index % 2 === 1 ? "lg:mt-14" : ""}
            >
              <div className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-2.5 py-1 font-mono text-2xl font-bold text-accent-ink"
                >
                  {step.number}
                </span>
                <div className="border-l-2 border-dashed border-line pl-5">
                  <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{step.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Promises ----------------------------------------------------- */}
      <section className="tone-panel border-t-2 border-ink bg-panel text-panel-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Our promises"
            title={<>What we guarantee, in plain words.</>}
          />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-x-16">
            {TRUST_POINTS.map((point, index) => (
              <Reveal
                as="li"
                key={point.id}
                delay={index * 0.03}
                className={index % 2 === 1 ? "sm:mt-10" : ""}
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-panel-ink">
                    <point.icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm opacity-85">{point.blurb}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Ground rules ------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Ground rules"
          title={
            <>
              Eight rules. <span className="mark">Zero</span> negotiation.
            </>
          }
          blurb="Both sides accept these before a slot is confirmed. They protect you, the companion, and the reason this service can exist at all."
        />
        <Reveal className="mt-12">
          <ul className="grid gap-3 sm:grid-cols-2">
            {GROUND_RULES.map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-3 rounded-2xl border-2 border-ink px-4 py-3.5 text-sm"
              >
                <Check
                  size={16}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden
                />
                {rule}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Policies ----------------------------------------------------- */}
      <section className="border-t-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-20">
          {POLICIES.map((policy) => (
            <div key={policy.id} id={policy.id} className="scroll-mt-24">
              <Reveal>
                <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                  {policy.title}
                </h2>
                <ul className="mt-6 space-y-4">
                  {policy.lines.map((line) => (
                    <li
                      key={line}
                      className="border-l-2 border-accent pl-4 text-sm text-muted"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-10 sm:px-6">
          <ShieldCheck size={20} aria-hidden />
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Reported a safety issue? We reply within 2 hours, 7 days a week, and
            remove first while we investigate.
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Book with confidence"
        title={<>Safe enough to recommend to a friend.</>}
        blurb="Verified companions, public places only, full refund if you cancel two hours ahead. Strictly platonic, in writing, every single time."
        message={URGENT_BOOKING_MESSAGE}
        secondaryHref="/faq"
        secondaryLabel="Read the FAQ"
      />
    </>
  );
}
