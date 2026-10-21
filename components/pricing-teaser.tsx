import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRICING_TEASER_IDS, findPriceItem } from "@/content/pricing";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { formatINR, formatINRRange } from "@/lib/format";

export function PricingTeaser() {
  const items = PRICING_TEASER_IDS.map((id) => findPriceItem(id)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <section className="border-t-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Pricing · no surprises"
          title={
            <>
              Priced like a <span className="mark">coffee</span>, not a
              contract.
            </>
          }
          blurb="Rates are shown upfront in rupees, and in dollars for virtual slots booked from abroad. You confirm the final number on WhatsApp before anything is charged."
        />

        <ul className="mt-14 divide-y-2 divide-ink border-y-2 border-ink">
          {items.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 0.04}>
              <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div className="sm:max-w-md">
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">{item.blurb}</p>
                  {item.priceUSD ? (
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                      International · {item.priceUSD} {item.unit}
                    </p>
                  ) : null}
                </div>
                <p className="shrink-0 font-mono">
                  <span className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {formatINRRange(item.priceINR, item.priceMaxINR)}
                  </span>
                  <span className="ml-2 text-[11px] uppercase tracking-wider text-muted">
                    {item.unit}
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-5">
          <Link href="/pricing" className="btn btn-accent">
            See every price
            <ArrowRight size={18} aria-hidden />
          </Link>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            Bundles from {formatINR(1499)} a week
          </p>
        </Reveal>
      </div>
    </section>
  );
}
