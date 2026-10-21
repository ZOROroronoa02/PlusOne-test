import type { Metadata } from "next";
import { Info } from "lucide-react";
import { ReviewWall } from "@/components/review-wall";
import { ReviewForm } from "@/components/review-form";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { REVIEWS, REVIEWS_ARE_SAMPLES, REVIEW_STATS } from "@/content/reviews";
import { URGENT_BOOKING_MESSAGE } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Reviews",
  alternates: canonical("/reviews"),
  description:
    "What PlusOne clients say after weddings, office parties, gigs and late-night calls — torn-ticket reviews from people who booked a strictly-platonic companion.",
};

const STATS = [
  { label: "Average rating", value: `${REVIEW_STATS.averageRating}/5` },
  { label: "Reviews collected", value: String(REVIEW_STATS.totalReviews) },
  { label: "Would rebook", value: REVIEW_STATS.wouldRebook },
];

export default function ReviewsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <SectionHeading
          as="h1"
          eager
          eyebrow="Reviews · pinned to the wall"
          title={
            <>
              Nothing awkward happened. <span className="mark">Ask them.</span>
            </>
          }
          blurb="Every review below comes from someone who hired a companion for a real occasion — and lived to recommend it."
        />

        <Reveal delay={0.05}>
          <ul className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-y-2 border-ink py-6">
            {STATS.map((stat) => (
              <li key={stat.label}>
                <p className="font-display text-3xl font-extrabold tracking-tight">
                  {stat.value}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {REVIEWS_ARE_SAMPLES ? (
          <Reveal delay={0.08}>
            <p className="mt-6 flex items-start gap-2 rounded-2xl border-2 border-dashed border-line px-4 py-3 text-xs text-muted">
              <Info size={14} aria-hidden className="mt-0.5 shrink-0" />
              These are illustrative sample reviews from our launch content.
              Replace them with real, consented reviews in{" "}
              <code className="font-mono">content/reviews.ts</code> — the wall
              is fully data-driven.
            </p>
          </Reveal>
        ) : null}
      </section>

      <section
        aria-label="Review wall"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6"
      >
        <ReviewWall reviews={REVIEWS} />
      </section>

      <section className="border-t-2 border-ink bg-panel text-panel-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest opacity-70">
              Been a client?
            </p>
            <h2 className="mt-3 font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
              Add your ticket to the wall.
            </h2>
            <p className="mt-5 text-lg opacity-85">
              Two minutes, no account. Fill this in and it arrives as a
              WhatsApp message — we read every one before it goes up.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest opacity-70">
              Published under an alias · contact details never shown
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-3xl border-2 border-panel-ink bg-bg p-6 text-ink sm:p-8">
              <ReviewForm />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Your turn"
        title={<>Make your own story worth reviewing.</>}
        blurb="Book a companion for the occasion you've been avoiding, and give yourself something better to talk about than 'I went alone again'."
        message={URGENT_BOOKING_MESSAGE}
        secondaryHref="/ads"
        secondaryLabel="Browse companions"
      />
    </>
  );
}
