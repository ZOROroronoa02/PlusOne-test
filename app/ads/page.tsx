import type { Metadata } from "next";
import { BadgeCheck, Clock, Sparkles, Tag } from "lucide-react";
import { canonical } from "@/lib/seo";
import { AdDeck } from "@/components/ads/ad-deck";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { COMPANIONS } from "@/content/companions";
import { URGENT_BOOKING_MESSAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Browse companions",
  alternates: canonical("/ads"),
  description:
    "Flip through PlusOne's personal ads one at a time — verified, strictly-platonic companions for weddings, office parties, movies, city tours or virtual company. Each ad opens the colour palette with it.",
};

const LEGEND = [
  {
    icon: Tag,
    label: "Vibe tags",
    detail: "Lead with the personality, not a spec sheet.",
  },
  {
    icon: Clock,
    label: "Freshness",
    detail: "Ads are stamped and rotate as slots fill.",
  },
  {
    icon: BadgeCheck,
    label: "Badges",
    detail: "Only earned stickers show — ID, platonic, reply speed.",
  },
  {
    icon: Sparkles,
    label: "Palette",
    detail: "Every companion repaints the whole site as you swipe.",
  },
];

export default function AdsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-2 pt-12 sm:px-6 sm:pt-16">
        <Reveal eager>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {COMPANIONS.length} ads live · refreshed hourly
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
            One companion at a time. <span className="mark">No grid.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Companions stay anonymous — aliases and a face only after you book.
            So we replaced the face with personality: read the vibe tags, check
            the freshness stamp, then tap Book to start a WhatsApp chat.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="mt-10 grid gap-4 border-y-2 border-ink py-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEGEND.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <item.icon size={18} aria-hidden className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-label="Companion ad deck" className="mt-8">
        <AdDeck companions={COMPANIONS} />
      </section>

      <div className="mt-16">
        <CtaBand
          eyebrow="Seen someone?"
          title={
            <>
              Don&apos;t lose the slot.
            </>
          }
          blurb="Weekend evenings fill first. Send the pre-filled message and we'll lock the companion, the time and the ground rules in one chat."
          message={URGENT_BOOKING_MESSAGE}
          secondaryHref="/pricing"
          secondaryLabel="Check the rates"
        />
      </div>
    </>
  );
}
