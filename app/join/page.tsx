import type { Metadata } from "next";
import { BadgeCheck, MessageCircle } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { JoinForm } from "@/components/join-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  APPLICANT_FAQS,
  COMPANION_PROMISES,
  EARNINGS,
  JOIN_MESSAGE,
  JOIN_STEPS,
} from "@/content/join";
import { VERIFICATION_STEPS } from "@/content/trust";
import { whatsappLink } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Become a companion",
  alternates: canonical("/join"),
  description:
    "Earn ₹399–₹499 an hour as a verified PlusOne companion in Ghaziabad, Noida or Delhi NCR, or ₹149–₹299 an hour online. Choose your own hours, use an alias, work in public places only, get paid weekly.",
};

export default function JoinPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <Reveal eager>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            We&apos;re hiring companions
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-hero font-extrabold uppercase leading-[0.93] tracking-tight">
            Get paid to be <span className="mark">good company</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            ₹399–₹499 an hour in person, ₹149–₹299 an hour online. You pick your
            hours, you keep an alias, and every single meetup happens in a
            public place. No shifts, no targets, no photographs of you on the
            internet.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#apply" className="btn btn-accent text-base">
            Apply in two minutes
          </a>
          <a
            href={whatsappLink(JOIN_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-base"
          >
            <MessageCircle size={18} aria-hidden />
            Ask us first
          </a>
        </Reveal>
      </section>

      {/* Earnings ------------------------------------------------------ */}
      <section className="mt-16 border-y-2 border-ink bg-panel text-panel-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest opacity-70">
            What you earn
          </p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {EARNINGS.map((item) => (
              <li key={item.label}>
                <p className="font-mono text-[11px] uppercase tracking-widest opacity-70">
                  {item.label}
                </p>
                <p className="mt-3 font-display text-3xl font-extrabold tracking-tight">
                  {item.value}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider opacity-70">
                  {item.unit}
                </p>
                <p className="mt-3 text-xs opacity-80">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Flow ---------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="The application flow"
          title={<>Four steps from application to first booking.</>}
          blurb="Most applications get a reply the same day. Verification usually takes 24–48 hours, depending on how fast your ID check comes back."
        />
        <ol className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-x-16">
          {JOIN_STEPS.map((step, index) => (
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

      {/* Promises ------------------------------------------------------ */}
      <section className="border-t-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Our side of the deal"
              title={<>What we guarantee you.</>}
            />
            <ul className="mt-10 space-y-4">
              {COMPANION_PROMISES.map((promise) => (
                <Reveal as="li" key={promise} delay={0.03}>
                  <p className="flex items-start gap-3 text-sm">
                    <BadgeCheck
                      size={18}
                      aria-hidden
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    {promise}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              eyebrow="Verification"
              title={<>What we check — and what we never share.</>}
            />
            <ol className="mt-10 space-y-6">
              {VERIFICATION_STEPS.map((step) => (
                <Reveal as="li" key={step.number} delay={0.03}>
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="font-mono text-sm text-muted"
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">{step.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            <p className="mt-8 rounded-2xl border-2 border-dashed border-line px-4 py-3 text-xs text-muted">
              Your ID is used once for verification and stored as a masked
              reference. It is never shown to clients, never published, and
              never sold.
            </p>
          </div>
        </div>
      </section>

      {/* Applicant FAQ -------------------------------------------------- */}
      <section className="tone-panel border-t-2 border-ink bg-panel text-panel-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Applicant FAQ"
            title={<>Questions before you apply.</>}
          />
          <FaqAccordion faqs={APPLICANT_FAQS} />
        </div>
      </section>

      {/* Apply ---------------------------------------------------------- */}
      <section
        id="apply"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Apply now"
              title={<>Two minutes. One message.</>}
              blurb="Fill this in and it opens WhatsApp with everything pre-written. No CV, no cover letter, no account to create."
            />
            <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-muted">
              Replies usually same day · verification in 24–48 hrs
            </p>
          </div>

          <Reveal delay={0.05}>
            <div className="rounded-3xl border-2 border-ink p-6 sm:p-8">
              <JoinForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
