import type { Companion } from "@/content/companions";
import {
  IN_PERSON_FALLBACK_RATE,
  IN_PERSON_MIN_HOURS,
  PROMO_CODE,
  PROMO_DISCOUNT_INR,
  VIRTUAL_RATES,
  type VirtualMode,
} from "@/content/booking-options";
import { formatINR } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

export type BookingFormat = "in-person" | "virtual";

/**
 * The quick, direct WhatsApp message for booking a specific companion —
 * used by the ad previews and the deck's inline CTA.
 */
export function companionBookingMessage(companion: Companion): string {
  return [
    "Hi PlusOne 👋 I'd like to book a companion.",
    "",
    `Companion: ${companion.alias} (${companion.role})`,
    `Where: ${companion.city}`,
    `Rate shown: ${formatINR(companion.ratePerHour)}/hr`,
    `Modes: ${companion.modes.join(", ")}`,
    "",
    "My plan:",
  ].join("\n");
}

export interface BookingDraft {
  /** null means "let PlusOne match me" */
  companionId: string | null;
  occasion: string;
  /** yyyy-mm-dd */
  date: string;
  /** HH:mm */
  time: string;
  hours: number;
  format: BookingFormat | null;
  city: string;
  virtualMode: VirtualMode;
  name: string;
  notes: string;
  promo: string;
  /** client-side timestamp used to expire stale drafts (ms since epoch) */
  savedAt?: number;
}

export const EMPTY_DRAFT: BookingDraft = {
  companionId: null,
  occasion: "",
  date: "",
  time: "",
  hours: 2,
  format: null,
  city: "",
  virtualMode: "Voice",
  name: "",
  notes: "",
  promo: "",
  savedAt: undefined,
};

export const BOOKING_DRAFT_KEY = "plusone:booking-draft";

export function isPromoValid(code: string): boolean {
  return code.trim().toUpperCase() === PROMO_CODE;
}

/** Estimated headline cost — always framed as an estimate, confirmed on WhatsApp. */
export function estimateTotal(
  draft: BookingDraft,
  companion: Companion | undefined,
): { subtotal: number; discount: number; total: number; perHour: number } {
  const hours =
    draft.format === "in-person"
      ? Math.max(draft.hours, IN_PERSON_MIN_HOURS)
      : draft.hours;

  const perHour =
    draft.format === "virtual"
      ? VIRTUAL_RATES[draft.virtualMode]
      : (companion?.ratePerHour ?? IN_PERSON_FALLBACK_RATE);

  const subtotal = perHour * hours;
  const discount = isPromoValid(draft.promo) ? PROMO_DISCOUNT_INR : 0;
  const total = Math.max(subtotal - discount, 0);

  return { subtotal, discount, total, perHour };
}

export function formatBookingDate(date: string): string {
  if (!date) return "date not set";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function formatTime(time: string): string {
  if (!time) return "time not set";
  const [hours, minutes] = time.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time;
  const suffix = hours < 12 ? "am" : "pm";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${minutes.toString().padStart(2, "0")}${suffix}`;
}

/**
 * The structured, pre-filled WhatsApp message. This is the whole "backend" of
 * v1 — everything the team needs to confirm a slot in one glance.
 */
export function buildBookingMessage(
  draft: BookingDraft,
  companion: Companion | undefined,
): string {
  const { total, discount, perHour } = estimateTotal(draft, companion);
  const hours =
    draft.format === "in-person"
      ? Math.max(draft.hours, IN_PERSON_MIN_HOURS)
      : draft.hours;

  const lines: string[] = [
    "Hi PlusOne 👋 I'd like to book a companion.",
    "",
    companion
      ? `Companion: ${companion.alias} (${companion.role})`
      : "Companion: Let PlusOne match me",
    `Occasion: ${draft.occasion || "not set"}`,
    `When: ${formatBookingDate(draft.date)}, ${formatTime(draft.time)} — ${hours} ${
      hours === 1 ? "hour" : "hours"
    }`,
    draft.format === "virtual"
      ? `Format: Virtual (${draft.virtualMode}) — online worldwide`
      : `Format: In person — ${draft.city || "city not set"}`,
    `Rate shown: ${formatINR(perHour)}/hr`,
    `Estimated total: ${formatINR(total)}${
      discount > 0 ? ` (after ${PROMO_CODE} −${formatINR(discount)})` : ""
    }`,
    draft.name ? `Name: ${draft.name}` : "",
  ];

  if (draft.notes.trim()) {
    lines.push("", `Notes: ${draft.notes.trim()}`);
  }

  lines.push(
    "",
    "Please confirm availability and share the ground rules. Thanks!",
  );

  return lines.filter((line) => line !== "").join("\n");
}

export function bookingWhatsappLink(
  draft: BookingDraft,
  companion: Companion | undefined,
): string {
  return whatsappLink(buildBookingMessage(draft, companion));
}

/* ------------------------------------------------------------------ */
/*  Draft persistence                                                  */
/* ------------------------------------------------------------------ */

const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function loadDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BOOKING_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<BookingDraft>;
    if (parsed.savedAt && Date.now() - parsed.savedAt > DRAFT_TTL_MS) {
      window.localStorage.removeItem(BOOKING_DRAFT_KEY);
      return null;
    }
    // Basic shape validation to avoid restoring garbage.
    if (typeof parsed.hours !== "number" || parsed.hours < 1) {
      parsed.hours = EMPTY_DRAFT.hours;
    }
    if (parsed.format !== "in-person" && parsed.format !== "virtual" && parsed.format !== null) {
      parsed.format = null;
    }
    return { ...EMPTY_DRAFT, ...parsed };
  } catch {
    return null;
  }
}

export function saveDraft(draft: BookingDraft): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      BOOKING_DRAFT_KEY,
      JSON.stringify({ ...draft, savedAt: Date.now() }),
    );
  } catch {
    /* private mode — the wizard still works for this session */
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(BOOKING_DRAFT_KEY);
  } catch {
    /* ignore */
  }
}
