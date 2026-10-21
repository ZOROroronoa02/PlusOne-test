export interface PriceItem {
  id: string;
  name: string;
  /** headline price in INR; for ranged items this is the floor */
  priceINR: number;
  /** optional ceiling for "₹399–499" style ranges */
  priceMaxINR?: number;
  priceUSD?: string;
  unit: string;
  blurb: string;
  perks: string[];
}

export interface PriceGroup {
  id: string;
  eyebrow: string;
  title: string;
  note?: string;
  items: PriceItem[];
}

export const VIRTUAL_TIERS: PriceItem[] = [
  {
    id: "virtual-text",
    name: "Text Companion",
    priceINR: 149,
    priceUSD: "$8",
    unit: "per hour",
    blurb: "Chat through the boring bits — commutes, queues, waiting rooms.",
    perks: ["Unlimited messages in your hour", "Any topic, zero judgement", "Switch companion anytime"],
  },
  {
    id: "virtual-voice",
    name: "Voice Companion",
    priceINR: 199,
    priceUSD: "$12",
    unit: "per hour",
    blurb: "One call, one hour, someone actually listening on the other end.",
    perks: ["Real-time voice call", "Timezone-friendly slots", "Strictly platonic, always"],
  },
  {
    id: "virtual-video",
    name: "Video Companion",
    priceINR: 299,
    priceUSD: "$18",
    unit: "per hour",
    blurb: "Face-to-face company for dinners alone, study sessions or long nights.",
    perks: ["Private video room", "Share a meal virtually", "No recording, ever"],
  },
];

export const IN_PERSON: PriceItem[] = [
  {
    id: "in-person-standard",
    name: "In-Person Companion",
    priceINR: 399,
    priceMaxINR: 499,
    unit: "per hour",
    blurb: "Public places only — cafés, malls, events, weddings, city walks.",
    perks: [
      "ID-verified companion",
      "Two-hour minimum",
      "Free cancellation up to 2h before",
    ],
  },
];

export const ACTIVITIES: PriceItem[] = [
  {
    id: "movie",
    name: "Movie Plus-One",
    priceINR: 599,
    unit: "per show",
    blurb: "Two tickets, two opinions, one very long post-movie debrief.",
    perks: ["Includes the show", "Popcorn on us", "Snacks stop after"],
  },
  {
    id: "mall",
    name: "Mall Hangout",
    priceINR: 499,
    unit: "2 hours",
    blurb: "Shopping opinions you'll actually trust. No rushing, no 'looks fine'.",
    perks: ["Honest second opinion", "Food-court stop", "Bag-carrying included"],
  },
  {
    id: "event",
    name: "Event Plus-One",
    priceINR: 799,
    unit: "per event",
    blurb: "Weddings, office galas, receptions — arrive with someone, leave relaxed.",
    perks: ["Up to 4 hours", "Small-talk handled", "Photo consent respected"],
  },
  {
    id: "cafe-tour",
    name: "Café Tour",
    priceINR: 599,
    unit: "3 hours",
    blurb: "Three cafés, three conversations, one very caffeinated afternoon.",
    perks: ["Curated route", "Works for first-timers", "Tasting notes, obviously"],
  },
  {
    id: "city-explorer",
    name: "City Explorer",
    priceINR: 899,
    unit: "4 hours",
    blurb: "A half-day of hidden gems with someone who actually knows the city.",
    perks: ["Local route planned for you", "Metro-friendly", "Photo stops included"],
  },
  {
    id: "fitness-walk",
    name: "Fitness Walk",
    priceINR: 399,
    unit: "per hour",
    blurb: "Accountability with company — morning walks that you'll actually attend.",
    perks: ["Park or track", "Pace matched to you", "Zero gym-bro energy"],
  },
];

export const BUNDLES: PriceItem[] = [
  {
    id: "weekly-buddy",
    name: "Weekly Buddy",
    priceINR: 1499,
    unit: "per week",
    blurb: "One companion, four hours a week, same person every time.",
    perks: ["4 hours in-person or virtual", "Same companion all week", "Priority replies"],
  },
  {
    id: "monthly-buddy",
    name: "Monthly Buddy",
    priceINR: 4999,
    unit: "per month",
    blurb: "For people who want company to be a habit, not an event.",
    perks: ["16 hours/month", "Mix in-person and virtual", "One free reschedule"],
  },
  {
    id: "premium-buddy",
    name: "Premium Buddy",
    priceINR: 8999,
    unit: "per month",
    blurb: "Unlimited virtual plus a set in-person allowance, on demand.",
    perks: [
      "Unlimited virtual hours",
      "10 in-person hours",
      "Skip the wait-list on weekends",
      "Dedicated WhatsApp line",
    ],
  },
];

export const PRICE_GROUPS: PriceGroup[] = [
  {
    id: "virtual",
    eyebrow: "Virtual companionship",
    title: "Company from anywhere",
    note: "International pricing shown in USD. Payouts handled per country.",
    items: VIRTUAL_TIERS,
  },
  {
    id: "in-person",
    eyebrow: "In person",
    title: "Public places, proper etiquette",
    note: "Rates vary a little by city and occasion. Everything is confirmed on WhatsApp first.",
    items: IN_PERSON,
  },
  {
    id: "activities",
    eyebrow: "Ready-made outings",
    title: "Activities, packaged",
    items: ACTIVITIES,
  },
  {
    id: "bundles",
    eyebrow: "Bundles",
    title: "Make it a routine",
    note: "Cancel or pause any bundle with 24 hours' notice.",
    items: BUNDLES,
  },
];

export const PRICING_TEASER_IDS = [
  "virtual-voice",
  "in-person-standard",
  "event",
  "monthly-buddy",
];

export function findPriceItem(id: string): PriceItem | undefined {
  const all = [...VIRTUAL_TIERS, ...IN_PERSON, ...ACTIVITIES, ...BUNDLES];
  return all.find((item) => item.id === id);
}
