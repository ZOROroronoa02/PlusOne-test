import { CalendarClock, Languages, MapPin, MessageCircle } from "lucide-react";
import type { Companion } from "@/content/companions";
import { companionBookingMessage } from "@/lib/booking";
import { formatINR } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

/**
 * A "personal ad" preview. The card scopes itself to the companion's palette
 * via data-theme, so every child uses the same audited token contract as the
 * site (no inline hexes, no opacity dimming below AA).
 */
export function CompanionAdPreview({
  companion,
  rotate = "0deg",
  size = "md",
}: {
  companion: Companion;
  rotate?: string;
  size?: "md" | "lg";
}) {
  const bookingMessage = companionBookingMessage(companion);
  const urgent = companion.slotsTonight > 0 && companion.slotsTonight <= 2;

  return (
    <article
      data-theme={companion.palette}
      className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink bg-bg p-6 text-ink sm:p-7"
      style={{
        transform: `rotate(${rotate})`,
        boxShadow: "6px 6px 0 var(--ink)",
      }}
    >
      <header className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-muted">
        <span>{companion.postedLabel}</span>
        <span className="flex items-center gap-1.5">
          {urgent ? (
            <span
              className="tick-dot inline-block h-2 w-2 rounded-full bg-ink"
              aria-hidden
            />
          ) : null}
          {companion.slotsTonight > 0
            ? `Tonight — ${companion.slotsTonight} slots left`
            : "Fully booked tonight"}
        </span>
      </header>

      <div className="mt-3 flex items-center gap-2">
        <span className="sticker rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-ink">
          ✓ Verified
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Booked by women like you
        </span>
      </div>

      <h3
        className="mt-5 font-display font-extrabold uppercase leading-[0.9] tracking-tight"
        style={{ fontSize: size === "lg" ? "clamp(2.5rem, 7vw, 4.5rem)" : "clamp(2rem, 5vw, 3rem)" }}
      >
        {companion.alias}
      </h3>
      <p className="mt-1 text-lg font-semibold">{companion.role}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {companion.vibeTags.slice(0, size === "lg" ? 3 : 2).map((tag, index) => (
          <span
            key={tag}
            className="sticker rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-bg"
            style={{
              transform: `rotate(${index % 2 === 0 ? -2 : 1.5}deg)`,
              boxShadow: "3px 3px 0 var(--accent)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Mutual-turn-ons style microcopy — PURE's "shared interests" moment */}
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
        Shared vibe · {companion.vibeTags.slice(0, 2).join(" + ")}
      </p>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        {companion.blurb}
      </p>

      <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted">
        <div className="flex items-center gap-1.5">
          <MapPin size={13} aria-hidden />
          <dt className="sr-only">Location</dt>
          <dd>{companion.city}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Languages size={13} aria-hidden />
          <dt className="sr-only">Languages</dt>
          <dd>{companion.languages.join(" · ")}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarClock size={13} aria-hidden />
          <dt className="sr-only">Modes</dt>
          <dd>{companion.modes.join(" · ")}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-2">
          {companion.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-ink px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <p className="font-mono">
            <span className="block font-display text-3xl font-extrabold tracking-tight">
              {formatINR(companion.ratePerHour)}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-muted">
              per hour
            </span>
          </p>
          <a
            href={whatsappLink(bookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "4px 4px 0 var(--ink)" }}
          >
            <MessageCircle size={16} aria-hidden />
            Book {companion.alias} · {formatINR(companion.ratePerHour)}/hr
          </a>
        </div>
      </div>
    </article>
  );
}
