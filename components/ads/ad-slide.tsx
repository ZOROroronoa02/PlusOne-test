import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  Globe2,
  Languages,
  MapPin,
  MessageCircle,
} from "lucide-react";
import type { Companion } from "@/content/companions";
import { companionBookingMessage } from "@/lib/booking";
import { formatINR } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

type Variant = "editorial" | "billboard" | "split";

const VARIANTS: Variant[] = ["editorial", "billboard", "split"];

export function variantFor(index: number): Variant {
  return VARIANTS[index % VARIANTS.length];
}

function rotationFor(index: number, seed = 0): string {
  const steps = [-2.5, 1.5, -1, 2, -1.5, 2.5];
  return `${steps[(index + seed) % steps.length]}deg`;
}

function Freshness({ companion }: { companion: Companion }) {
  const urgent = companion.slotsTonight > 0 && companion.slotsTonight <= 2;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted">
      <span>{companion.postedLabel}</span>
      <span className="flex items-center gap-2">
        {urgent ? (
          <span
            className="tick-dot inline-block h-2 w-2 rounded-full bg-accent"
            aria-hidden
          />
        ) : null}
        {companion.slotsTonight > 0
          ? `Tonight — ${companion.slotsTonight} ${
              companion.slotsTonight === 1 ? "slot" : "slots"
            } left`
          : "Fully booked tonight"}
      </span>
    </div>
  );
}

function VibeTags({
  companion,
  index,
  className = "",
}: {
  companion: Companion;
  index: number;
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {companion.vibeTags.map((tag, tagIndex) => (
        <li
          key={tag}
          className="sticker rounded-full px-4 py-2 text-sm font-bold sm:text-base"
          style={{
            transform: `rotate(${rotationFor(index, tagIndex)})`,
            backgroundColor: "var(--panel)",
            color: "var(--panel-ink)",
            borderColor: "var(--ink)",
            boxShadow: "3px 3px 0 var(--shadow)",
          }}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function BadgeRow({ companion }: { companion: Companion }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {companion.badges.map((badge) => (
        <li
          key={badge}
          className="rounded-full border-2 border-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted"
        >
          {badge}
        </li>
      ))}
    </ul>
  );
}

function Meta({ companion }: { companion: Companion }) {
  const rows = companion.virtual
    ? [
        { icon: Globe2, label: "Online worldwide", sr: "Availability" },
        { icon: CalendarClock, label: companion.modes.join(" · "), sr: "Modes" },
        {
          icon: Languages,
          label: companion.languages.join(" · "),
          sr: "Languages",
        },
      ]
    : [
        { icon: MapPin, label: companion.city, sr: "City" },
        { icon: CalendarClock, label: "In person", sr: "Modes" },
        {
          icon: Languages,
          label: companion.languages.join(" · "),
          sr: "Languages",
        },
      ];

  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted">
      {rows.map((row) => (
        <div key={row.sr} className="flex items-center gap-2">
          <row.icon size={14} aria-hidden />
          <dt className="sr-only">{row.sr}</dt>
          <dd>{row.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function PriceTag({ companion }: { companion: Companion }) {
  return (
    <p className="flex items-baseline gap-2 font-mono">
      <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        {formatINR(companion.ratePerHour)}
      </span>
      <span className="text-xs uppercase tracking-widest text-muted">
        per hour
      </span>
    </p>
  );
}

function BookCta({
  companion,
  size = "md",
}: {
  companion: Companion;
  size?: "md" | "lg";
}) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href={`/book?companion=${companion.id}`}
        className={`btn btn-accent ${size === "lg" ? "text-lg" : "text-base"}`}
      >
        <MessageCircle size={size === "lg" ? 20 : 18} aria-hidden />
        Book {companion.alias}
        <ArrowUpRight size={size === "lg" ? 20 : 16} aria-hidden />
      </Link>
      <a
        href={whatsappLink(companionBookingMessage(companion))}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center font-mono text-[11px] uppercase tracking-widest text-muted underline decoration-dotted underline-offset-4"
      >
        or message us directly
      </a>
    </div>
  );
}

export function AdSlide({
  companion,
  index,
}: {
  companion: Companion;
  index: number;
}) {
  const variant = variantFor(index);

  const backdrop = (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-display font-extrabold uppercase leading-none tracking-tighter text-ink opacity-[0.07] lg:block"
      style={{ fontSize: "clamp(8rem, 22vw, 20rem)" }}
    >
      {companion.role.split(" ")[0]}
    </span>
  );

  if (variant === "billboard") {
    return (
      <div className="relative flex min-h-full flex-col items-center justify-center text-center">
        {backdrop}
        <VibeTags
          companion={companion}
          index={index}
          className="relative justify-center"
        />
        <h2
          className="relative mt-7 font-display font-extrabold uppercase leading-[0.85] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 15vw, 11rem)" }}
        >
          {companion.alias}
        </h2>
        <p className="relative mt-2 text-xl font-semibold sm:text-2xl">
          {companion.role}
        </p>
        <div className="relative mt-5">
          <Freshness companion={companion} />
        </div>
        <p className="relative mt-7 max-w-2xl text-base text-muted sm:text-lg">
          {companion.blurb}
        </p>
        <div className="relative mt-7">
          <Meta companion={companion} />
        </div>
        <div className="relative mt-7">
          <BadgeRow companion={companion} />
        </div>
        <div className="relative mt-8 flex flex-col items-center gap-5">
          <PriceTag companion={companion} />
          <BookCta companion={companion} size="lg" />
        </div>
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div className="relative grid min-h-full gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
        {backdrop}
        <div className="relative">
          <Freshness companion={companion} />
          <VibeTags
            companion={companion}
            index={index}
            className="mt-6 max-w-xl"
          />
          <h2
            className="mt-7 font-display font-extrabold uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(3rem, 11vw, 8rem)" }}
          >
            {companion.alias}
          </h2>
          <p className="mt-2 text-xl font-semibold sm:text-2xl">
            {companion.role}
          </p>
          <div className="mt-7">
            <PriceTag companion={companion} />
          </div>
        </div>

        <div className="relative rounded-3xl border-2 border-ink bg-panel p-6 text-panel-ink sm:p-8">
          <p className="text-base leading-relaxed sm:text-lg">
            {companion.blurb}
          </p>
          <div className="mt-6">
            <Meta companion={companion} />
          </div>
          <div className="mt-6">
            <BadgeRow companion={companion} />
          </div>
          <div className="mt-8">
            <BookCta companion={companion} size="lg" />
          </div>
        </div>
      </div>
    );
  }

  // editorial (default)
  return (
    <div className="relative flex min-h-full flex-col justify-between gap-10">
      {backdrop}
      <div className="relative">
        <Freshness companion={companion} />
        <h2
          className="mt-6 font-display font-extrabold uppercase leading-[0.85] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 14vw, 10rem)" }}
        >
          {companion.alias}
        </h2>
        <p className="mt-2 text-xl font-semibold sm:text-2xl">
          {companion.role}
        </p>
        <VibeTags companion={companion} index={index} className="mt-7" />
      </div>

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-base text-muted sm:text-lg">{companion.blurb}</p>
          <div className="mt-6">
            <Meta companion={companion} />
          </div>
          <div className="mt-6">
            <BadgeRow companion={companion} />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <PriceTag companion={companion} />
          <BookCta companion={companion} size="lg" />
        </div>
      </div>
    </div>
  );
}
