import type { Metadata } from "next";
import { PricingTable } from "@/components/pricing-table";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { PRICE_GROUPS } from "@/content/pricing";
import { URGENT_BOOKING_MESSAGE } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  alternates: canonical("/pricing"),
  description:
    "PlusOne rates: virtual company from ₹149/hr (text), ₹199/hr (voice), ₹299/hr (video) or $8/$12/$18 international. In-person ₹399–499/hr, activity packages from ₹399, and weekly or monthly bundles.",
};

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <Reveal eager>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Transparent pricing · no hidden fees
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
            Rent a plus-one for less than a <span className="mark">dinner</span>{" "}
            for two.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Every rate below is the companion&apos;s time, nothing else. You
            confirm the final amount in writing on WhatsApp before anything is
            charged — and you can cancel up to two hours before for a full
            refund.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6">
        <PricingTable groups={PRICE_GROUPS} />
      </section>

      <CtaBand
        eyebrow="Ready when you are"
        title={<>Pick a slot before someone else does.</>}
        blurb="Send one message with your occasion, date and hours. We'll confirm the rate, the companion and the ground rules in the same chat."
        message={URGENT_BOOKING_MESSAGE}
        secondaryHref="/book"
        secondaryLabel="Open the wizard"
      />
    </>
  );
}
