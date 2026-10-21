import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { Marquee } from "@/components/marquee";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { COMING_SOON_AREAS, SERVED_AREAS } from "@/content/areas";
import { URGENT_BOOKING_MESSAGE } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Areas we serve",
  alternates: canonical("/areas"),
  description:
    "PlusOne runs in-person companion bookings across Ghaziabad, Noida and Delhi NCR, with virtual text, voice and video companionship available worldwide in every time zone.",
};

export default function AreasPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <SectionHeading
          as="h1"
          eager
          eyebrow="Coverage"
          title={
            <>
              In person around Delhi NCR. <span className="mark">Online</span>{" "}
              everywhere else.
            </>
          }
          blurb="No pushpins, no map widgets. Here's exactly where we can show up, and where we can only call."
        />
      </section>

      <section
        aria-label="Served areas"
        className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6"
      >
        <ul className="border-y-2 border-ink">
          {SERVED_AREAS.map((area, index) => (
            <Reveal as="li" key={area.city} delay={index * 0.05}>
              <Link
                href={area.virtualOnly ? "/pricing" : "/book"}
                className="group flex flex-col gap-3 border-b-2 border-ink px-1 py-8 transition-colors last:border-b-0 hover:bg-accent hover:text-accent-ink sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:px-4"
              >
                <span className="flex flex-wrap items-baseline gap-4">
                  <span
                    className="font-mono text-xs text-muted"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl">
                    {area.city}
                  </span>
                </span>

                <span className="flex items-center gap-6 sm:max-w-md sm:justify-end">
                  <span className="text-sm text-muted group-hover:text-accent-ink sm:text-right">
                    {area.note}
                  </span>
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform group-hover:translate-x-1 group-hover:translate-y-[-2px]"
                    aria-hidden
                  >
                    {area.virtualOnly ? (
                      <Globe2 size={18} />
                    ) : (
                      <ArrowUpRight size={20} />
                    )}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-14">
          <div className="rounded-3xl border-2 border-ink bg-panel p-6 text-panel-ink sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Opening next
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {COMING_SOON_AREAS.map((city, index) => (
                <li
                  key={city}
                  className="rounded-full border-2 border-panel-ink px-4 py-2 font-display text-lg font-bold tracking-tight"
                  style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
                >
                  {city}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-2xl text-sm text-muted">
              New cities open as soon as we have verified companions there. If
              you want to be the first companion in your city, join the team —
              you set your own hours.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/join" className="btn btn-accent">
                Become a companion
              </Link>
              <Link href="/pricing" className="btn border-panel-ink bg-panel-ink text-panel">
                See virtual rates
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Marquee
        items={[...SERVED_AREAS.map((area) => area.city), ...COMING_SOON_AREAS].map(
          (city) => <span key={city}>{city} ✦</span>,
        )}
        speed="slow"
        className="bg-panel text-panel-ink"
      />

      <div className="mt-20">
        <CtaBand
          eyebrow="Your city, your slot"
          title={<>Wherever you are, someone can join.</>}
          blurb="Tell us the city and the occasion in one message — we'll confirm whether it's an in-person slot or a virtual call within minutes."
          message={URGENT_BOOKING_MESSAGE}
          secondaryHref="/book"
          secondaryLabel="Open the wizard"
        />
      </div>
    </>
  );
}
