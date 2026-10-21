import Link from "next/link";
import type { Metadata } from "next";
import { Layers, MessageCircle } from "lucide-react";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { PromoCountdown } from "@/components/promo-countdown";
import { HowItWorks } from "@/components/how-it-works";
import { AdDeckTeaser } from "@/components/ad-deck-teaser";
import { TrustWall } from "@/components/trust-wall";
import { WhyWomenBook } from "@/components/why-women-book";
import { PricingTeaser } from "@/components/pricing-teaser";
import { FaqSection } from "@/components/faq-section";
import { CtaBand } from "@/components/cta-band";
import { HomeLoader } from "@/components/home-loader";
import { BrandArt } from "@/components/brand-art";
import { COMPANIONS } from "@/content/companions";
import { SERVED_AREAS } from "@/content/areas";
import { TICKER_PHRASES } from "@/content/how-it-works";
import { URGENT_BOOKING_MESSAGE, whatsappLink } from "@/lib/site";
import { canonical } from "@/lib/seo";

const BOOKING_TAGS = [
  "Wedding Wingman",
  "Office Party Plus-One",
  "Gig Buddy",
  "Café Talker",
  "City Explorer",
];

export const metadata: Metadata = {
  alternates: canonical("/"),
};

export default function HomePage() {
  const liveSlots = COMPANIONS.reduce(
    (total, companion) => total + companion.slotsTonight,
    0,
  );

  return (
    <>
      <HomeLoader />
      {/* ---------------------------------------------------------- Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <Reveal eager className="flex flex-wrap items-center gap-2.5">
              <span className="sticker rotate-[-2deg] rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider">
                ID verified
              </span>
              <span className="sticker rotate-[1.5deg] rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider">
                100% platonic
              </span>
              <span className="sticker rotate-[-1deg] rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider">
                Replies in 10 min
              </span>
            </Reveal>

            <Reveal eager delay={0.05}>
              <h1 className="mt-7 font-display text-hero font-extrabold uppercase leading-[0.92] tracking-tight">
                Your <span className="mark">plus-one</span>
                <br />
                for every occasion.
              </h1>
            </Reveal>

            <Reveal eager delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
                A verified, strictly-platonic companion for the wedding you
                dreaded going to alone, the office party you&apos;d rather skip, or
                just someone kind to talk to tonight. No small talk tax. No
                awkward exits.
              </p>
            </Reveal>

            <Reveal eager delay={0.15} className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/ads" className="btn btn-accent text-base">
                <Layers size={18} aria-hidden />
                Browse companions
              </Link>
              <a
                href={whatsappLink(URGENT_BOOKING_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-base"
              >
                <MessageCircle size={18} aria-hidden />
                Book on WhatsApp
              </a>
            </Reveal>

            <Reveal eager delay={0.2} className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>✓ ID-verified companions</span>
              <span>✓ Public meetups only</span>
              <span>✓ Platonic, always</span>
              <span>✓ Reply in 10 min</span>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="hidden lg:block">
            <BrandArt />
          </Reveal>

          {/* Live stat slab — impermanence, not a dashboard */}
          <Reveal delay={0.2} className="lg:pb-2">
            <div className="rounded-3xl border-2 border-ink bg-panel p-6 text-panel-ink">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                <span className="tick-dot inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
                Live right now
              </p>
              <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">
                {liveSlots} slots
              </p>
              <p className="mt-1 text-sm opacity-80">
                open across {COMPANIONS.length} verified companions tonight.
              </p>
              <ul className="mt-5 space-y-1.5 font-mono text-[11px] uppercase tracking-wider opacity-80">
                {SERVED_AREAS.map((area) => (
                  <li key={area.city}>{area.city}</li>
                ))}
              </ul>
              <p className="mt-5 text-xs opacity-70">
                Slots refresh hourly. Weekend evenings go first.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <PromoCountdown />

      <Marquee
        items={TICKER_PHRASES.map((phrase) => (
          <span key={phrase}>{phrase} ✦</span>
        ))}
        className="bg-panel text-panel-ink"
      />

      <HowItWorks />

      <AdDeckTeaser />

      <WhyWomenBook />

      <TrustWall />

      <Marquee
        items={BOOKING_TAGS.map((tag) => <span key={tag}>{tag} ✦</span>)}
        speed="slow"
        reverse
      />

      <PricingTeaser />

      <FaqSection />

      <CtaBand
        eyebrow="Tonight's free slots"
        title={
          <>
            Someone&apos;s free. <br />
            Let&apos;s make it weird-free.
          </>
        }
        blurb="Send one message and we'll match you with a companion, confirm the slot, and put the ground rules in writing. Strictly platonic, always."
        message={URGENT_BOOKING_MESSAGE}
        secondaryHref="/book"
        secondaryLabel="Use the booking wizard"
      />
    </>
  );
}
