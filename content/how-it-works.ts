export interface Step {
  number: string;
  title: string;
  blurb: string;
  detail: string;
}

export const HOW_IT_WORKS: Step[] = [
  {
    number: "01",
    title: "Say hi on WhatsApp",
    blurb: "No sign-up. No password. No 'create an account to continue'.",
    detail:
      "Tap any Book button and we drop you into a WhatsApp chat with a pre-written message. Send it. A real human replies — usually inside ten minutes.",
  },
  {
    number: "02",
    title: "Plan the occasion",
    blurb: "Tell us where, when, and how long you need company for.",
    detail:
      "Wedding in Ghaziabad, 4pm to 10pm, need someone who can handle a loud Punjabi family. We'll match the vibe, not just the slot.",
  },
  {
    number: "03",
    title: "Confirm & pay",
    blurb: "Prices agreed upfront. UPI, card, or pay after — your call.",
    detail:
      "You get the alias, the meeting point and the ground rules in writing before a single rupee moves. Free cancellation up to two hours before.",
  },
  {
    number: "04",
    title: "Enjoy the company",
    blurb: "Show up, be yourself, let someone else carry the small talk.",
    detail:
      "It's platonic, it's public, and it's entirely about you having a good time. Afterwards, leave a review — or just book the same person again.",
  },
];

export const TICKER_PHRASES = [
  "NO AWKWARD SILENCE",
  "WEDDINGS",
  "OFFICE PARTIES",
  "MOVIES",
  "CAFÉS",
  "CITY TOURS",
  "VIRTUAL CHAT",
  "GIGS",
];
