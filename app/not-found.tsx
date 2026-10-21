import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Layers } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { URGENT_BOOKING_MESSAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
};

const SHORTCUTS = [
  { href: "/ads", label: "Browse companions" },
  { href: "/pricing", label: "See pricing" },
  { href: "/trust", label: "Trust & safety" },
  { href: "/faq", label: "Read the FAQ" },
  { href: "/blog", label: "Read the blog" },
];

export default function NotFound() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <Reveal eager className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            404 — no such page
          </p>
          <h1 className="mt-3 font-display text-hero font-extrabold uppercase leading-[0.92] tracking-tight">
            This plus-one <span className="mark">never showed</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Nothing lives at this address — it may have moved, or the link was
            typed by hand. Here is everywhere worth going instead.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/ads" className="btn btn-accent">
              <Layers size={18} aria-hidden />
              Browse companions
            </Link>
            <Link href="/" className="btn btn-ghost">
              <Compass size={18} aria-hidden />
              Back to home
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-14">
          <ul className="flex flex-wrap gap-3">
            {SHORTCUTS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block rounded-full border-2 border-ink px-5 py-2.5 font-bold transition-colors hover:bg-accent hover:text-accent-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <div className="mt-10">
        <CtaBand
          eyebrow="Still stuck?"
          title={<>Tell us what you were looking for.</>}
          blurb="Send us the occasion and we'll point you at the right page — or just book the companion directly."
          message={URGENT_BOOKING_MESSAGE}
          secondaryHref="/book"
          secondaryLabel="Start a booking"
        />
      </div>
    </>
  );
}
