import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TRUST_POINTS } from "@/content/trust";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const DETAILED_IDS = ["id-verified", "platonic", "public", "refunds"];

export function TrustWall() {
  const detailed = DETAILED_IDS.map(
    (id) => TRUST_POINTS.find((point) => point.id === id)!,
  ).filter(Boolean);

  return (
    <section className="tone-panel border-t-2 border-ink bg-panel text-panel-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Trust & safety"
          title={
            <>
              Safety is the <span className="mark">whole</span> product.
            </>
          }
          blurb="Companionship only works if you feel safe. So verification, public meetups and the platonic rule aren't the fine print here — they're the pitch."
        />

        <Reveal className="mt-12" delay={0.05}>
          <ul className="flex flex-wrap gap-3">
            {TRUST_POINTS.map((point) => (
              <li
                key={point.id}
                className="sticker rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest"
                style={{
                  transform: `rotate(${point.rotate})`,
                  backgroundColor: "var(--bg)",
                  color: "var(--ink)",
                  boxShadow: "3px 3px 0 var(--shadow)",
                }}
              >
                <point.icon size={14} aria-hidden />
                {point.sticker}
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:gap-x-16">
          {detailed.map((point, index) => (
            <Reveal as="li" key={point.id} delay={index * 0.05} className={index % 2 === 1 ? "sm:mt-12" : ""}>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-panel-ink">
                  <point.icon size={20} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm opacity-80">{point.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-14">
          <Link href="/trust" className="btn btn-accent">
            Read the full safety pledge
            <ArrowRight size={18} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
