/**
 * The live promo: ₹100 off the first booking, code FIRST100.
 * The deadline is always "the coming Sunday at 23:59 local time" — computed,
 * never hard-coded, so the countdown can't quietly go stale.
 */
export const PROMO = {
  code: "FIRST100",
  headline: "FIRST100",
  benefit: "₹100 off your first booking",
  detail: "New clients only. Applied to any in-person or virtual slot.",
  /** keeps ticking; the offer rolls to the next week once it lapses */
  rolling: true,
} as const;

const DEADLINE_HOUR = 23;
const DEADLINE_MINUTE = 59;

/**
 * Next Sunday 23:59:59.999 in the visitor's local timezone.
 * If it's Sunday and the deadline hasn't passed yet, today counts.
 */
export function nextPromoDeadline(now: Date = new Date()): Date {
  const target = new Date(now);
  target.setHours(DEADLINE_HOUR, DEADLINE_MINUTE, 59, 999);

  const daysUntilSunday = (7 - now.getDay()) % 7;
  if (daysUntilSunday === 0 && now.getTime() >= target.getTime()) {
    target.setDate(target.getDate() + 7);
  } else {
    target.setDate(target.getDate() + daysUntilSunday);
  }

  return target;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export function splitCountdown(from: Date, to: Date): CountdownParts {
  const diff = to.getTime() - from.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
}

export function formatDeadline(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
