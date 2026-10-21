export const OCCASIONS: string[] = [
  "Wedding / Sangeet",
  "Office party",
  "Corporate event",
  "Movie",
  "Café hangout",
  "City tour",
  "Concert / Gig",
  "Shopping / Mall",
  "Family function",
  "Virtual hangout",
  "Something else",
];

export const DURATIONS: number[] = [1, 2, 3, 4, 6, 8];

export const VIRTUAL_MODES = ["Text", "Voice", "Video"] as const;
export type VirtualMode = (typeof VIRTUAL_MODES)[number];

export const IN_PERSON_CITIES = ["Ghaziabad", "Noida", "Gurugram", "Delhi NCR"] as const;

export const PROMO_CODE = "FIRST100";
export const PROMO_DISCOUNT_INR = 100;

/** Virtual tiers mirror content/pricing.ts — kept here so the wizard has no UI deps. */
export const VIRTUAL_RATES: Record<VirtualMode, number> = {
  Text: 149,
  Voice: 199,
  Video: 299,
};

/** In-person fallback rate when the visitor hasn't picked a companion. */
export const IN_PERSON_FALLBACK_RATE = 399;

/** In-person bookings have a two-hour minimum. */
export const IN_PERSON_MIN_HOURS = 2;
