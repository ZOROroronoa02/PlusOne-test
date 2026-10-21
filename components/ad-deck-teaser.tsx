import Link from "next/link";
import { Layers } from "lucide-react";
import { COMPANIONS } from "@/content/companions";
import { CompanionAdPreview } from "@/components/companion-ad-preview";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const TEASER_IDS = [
  "aarav-wedding-wingman",
  "meher-office-party-pro",
  "kabir-gig-buddy",
];

export function AdDeckTeaser() {
  const ads = TEASER_IDS.map(
    (id) => COMPANIONS.find((companion) => companion.id === id)!,
  ).filter(Boolean);

  return (
    <section className="border-t-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="The ad deck · signature feature"
          title={
            <>
              Browse <span className="mark">people</span>, not listings.
            </>
          }
          blurb="No endless grid of identical cards. Each companion gets a full personal ad with their own colours, their own vibe tags, and their own reasons you'd want them at your table."
        />

        <div className="mt-14 grid gap-7 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5 lg:pt-6">
            <CompanionAdPreview companion={ads[0]} rotate="-2deg" size="lg" />
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-4">
            <CompanionAdPreview companion={ads[1]} rotate="1.5deg" />
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-3 lg:pt-16">
            <CompanionAdPreview companion={ads[2]} rotate="-1deg" />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14 flex flex-wrap items-center gap-4">
          <Link href="/ads" className="btn btn-accent">
            <Layers size={18} aria-hidden />
            Open the full deck
          </Link>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {COMPANIONS.length} companions live right now
          </p>
        </Reveal>
      </div>
    </section>
  );
}
