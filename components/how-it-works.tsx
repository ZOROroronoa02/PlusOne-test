import { ArrowRight } from "lucide-react";
import { HOW_IT_WORKS } from "@/content/how-it-works";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { URGENT_BOOKING_MESSAGE, whatsappLink } from "@/lib/site";

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            Four taps from <span className="mark">alone</span> to
            accompanied.
          </>
        }
        blurb="No accounts, no forms, no waiting for an approval email. Everything happens in a chat you already know how to use."
      />

      <ol className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-x-16">
        {HOW_IT_WORKS.map((step, index) => (
          <Reveal
            as="li"
            key={step.number}
            delay={index * 0.05}
            className={index % 2 === 1 ? "lg:mt-16" : ""}
          >
            <div className="flex items-start gap-5">
              <span
                className="inline-flex items-center justify-center rounded-2xl bg-accent px-4 py-1 font-display text-5xl font-extrabold leading-none tracking-tight text-accent-ink shadow-[3px_3px_0_var(--shadow)] sm:text-6xl"
                aria-hidden
              >
                {step.number}
              </span>
              <div className="border-l-2 border-dashed border-line pl-5">
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-base font-semibold">{step.blurb}</p>
                <p className="mt-3 text-sm text-muted">{step.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1} className="mt-14">
        <a
          href={whatsappLink(URGENT_BOOKING_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent"
        >
          Start step one
          <ArrowRight size={18} aria-hidden />
        </a>
      </Reveal>
    </section>
  );
}
