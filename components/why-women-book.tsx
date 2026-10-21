import { ShieldCheck, Sparkles, Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Safe by design",
    body: "ID-verified companions, public meetups only, and a written platonic agreement before every booking. You're never figuring it out alone.",
  },
  {
    icon: Users,
    title: "Someone in your corner",
    body: "A real human who remembers your cousin's name, deflects the awkward questions, and disappears politely when you're done.",
  },
  {
    icon: Sparkles,
    title: "Zero awkward exits",
    body: "No small-talk tax, no ghosting, no pressure to perform. Book the hours you need, end when you want.",
  },
];

export function WhyWomenBook() {
  return (
    <section className="border-t-2 border-ink bg-panel text-panel-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Why women book PlusOne"
          title={
            <>
              A plus-one who makes the room{" "}
              <span className="mark">easier</span>.
            </>
          }
          blurb="Built for the moments you'd rather not do alone — and for the women who'd rather not ask a friend to fake it."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.06}>
              <div className="h-full rounded-3xl border-2 border-panel-ink bg-bg p-6 text-ink transition-transform hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border-2 border-ink bg-accent text-accent-ink">
                  <reason.icon size={22} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
