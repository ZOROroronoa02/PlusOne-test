/**
 * PlusOne companion "personal ads".
 *
 * Anti-grid rule: each ad carries its OWN palette, so browsing the deck
 * repaints the whole site. No photos anywhere — alias, type and stickers
 * are the brand.
 */
import type { ThemeName } from "@/lib/themes";

export interface Companion {
  /** stable slug used in links and the booking wizard */
  id: string;
  /** gamified anonymity — companions never publish a real name */
  alias: string;
  /** the one-line role headline on the ad */
  role: string;
  /** huge vibe-tag stickers that sit ABOVE the fold */
  vibeTags: string[];
  /** "Ghaziabad" | "Noida" | "Delhi NCR" | "Virtual" */
  city: string;
  virtual: boolean;
  /** headline rate per hour, in INR */
  ratePerHour: number;
  /** ∈ 0–5, drives the live scarcity counter */
  slotsTonight: number;
  /** e.g. "Text", "Voice", "Video", "In-person" */
  modes: string[];
  badges: string[];
  blurb: string;
  languages: string[];
  /** short freshness stamp */
  postedLabel: string;
  /** palette this ad flips the site to while it is on screen */
  palette: ThemeName;
}

export const COMPANIONS: Companion[] = [
  {
    id: "aarav-wedding-wingman",
    alias: "Aarav",
    role: "Wedding Wingman",
    vibeTags: ["Wedding Wingman", "Sangeet Survivor", "Bhangra Encourager"],
    city: "Ghaziabad",
    virtual: false,
    ratePerHour: 499,
    slotsTonight: 2,
    modes: ["In-person"],
    badges: ["ID VERIFIED", "100% PLATONIC", "REPLIES IN 10 MIN"],
    blurb:
      "I've survived 40+ weddings and I know exactly when to laugh at an uncle's joke. I'll carry the gift, remember the cousin's name, and disappear politely the moment your family gets boring.",
    languages: ["Hindi", "English"],
    postedLabel: "ad posted 2h ago",
    palette: "pink",
  },
  {
    id: "meher-office-party-pro",
  alias: "Mihir",
  role: "Office Party Pro",
  vibeTags: [
    "Plus-One for Office Parties",
    "Small-Talk Sniper",
    "Networking Wingman",
  ],
    city: "Noida",
    virtual: false,
    ratePerHour: 449,
    slotsTonight: 3,
    modes: ["In-person"],
    badges: ["ID VERIFIED", "100% PLATONIC", "REPLIES IN 10 MIN"],
    blurb:
      "Your team's annual dinner doesn't have to be a hostage situation. I do the introductions, deflect the 'when are you settling down' question, and make sure you leave with three new contacts and zero regrets.",
    languages: ["English", "Hindi"],
    postedLabel: "ad posted 35m ago",
    palette: "periwinkle",
  },
  {
    id: "kabir-gig-buddy",
    alias: "Kabir",
    role: "Gig Buddy",
    vibeTags: ["Gig Buddy", "Front-Row Energy", "Knows Every Lyric"],
    city: "Delhi NCR",
    virtual: false,
    ratePerHour: 399,
    slotsTonight: 1,
    modes: ["In-person"],
    badges: ["ID VERIFIED", "100% PLATONIC", "1 SLOT LEFT TONIGHT"],
    blurb:
      "None of your friends would come to a Tuesday gig in a basement in Okhla. I will. I know the setlist, I won't film the whole thing, and I'll argue about the encore with you on the way home.",
    languages: ["Hindi", "English", "Punjabi"],
    postedLabel: "ad posted 5h ago",
    palette: "lime",
  },
  {
    id: "naina-cafe-talker",
  alias: "Nikhil",
  role: "Café Talker",
    vibeTags: ["Café Talker", "Board-Game Rival", "Third-Wave Snob"],
    city: "Ghaziabad",
    virtual: false,
    ratePerHour: 399,
    slotsTonight: 4,
    modes: ["In-person"],
    badges: ["ID VERIFIED", "100% PLATONIC", "REPLIES IN 10 MIN"],
    blurb:
      "Two hours, one corner table, no agenda. Bring your weirdest current obsession — I'll bring opinions about filter coffee and an unbeatable Catan strategy.",
    languages: ["English", "Hindi"],
    postedLabel: "ad posted 8m ago",
    palette: "black",
  },
  {
    id: "rhea-late-night-voice",
  alias: "Rohit",
  role: "Late-Night Voice",
    vibeTags: ["Late-Night Voice", "Zero Judgement", "Good Listener"],
    city: "Virtual",
    virtual: true,
    ratePerHour: 199,
    slotsTonight: 5,
    modes: ["Voice", "Text"],
    badges: ["ID VERIFIED", "100% PLATONIC", "AVAILABLE NOW"],
    blurb:
      "Decompression for people whose brain won't switch off. We talk about the thing on your mind, or absolutely nothing. Available across time zones — your 2am is my 2pm.",
    languages: ["English", "Hindi", "Marathi"],
    postedLabel: "ad posted 12m ago",
    palette: "periwinkle",
  },
  {
    id: "dev-city-explorer",
    alias: "Dev",
    role: "City Explorer",
    vibeTags: ["City Explorer", "Metro Navigator", "Hidden-Gem Finder"],
    city: "Delhi NCR",
    virtual: false,
    ratePerHour: 449,
    slotsTonight: 2,
    modes: ["In-person"],
    badges: ["ID VERIFIED", "100% PLATONIC", "PUBLIC PLACES ONLY"],
    blurb:
      "Give me four hours and I'll show you the Delhi you keep meaning to visit. Chandni Chowk breakfast, a bookshop that no one knows, and not one single tourist trap.",
    languages: ["Hindi", "English"],
    postedLabel: "ad posted 1d ago",
    palette: "paper",
  },
  {
    id: "ishaan-movie-plus-one",
    alias: "Ishaan",
    role: "Movie Plus-One",
    vibeTags: ["Movie Plus-One", "No Spoilers", "Post-Credits Debater"],
    city: "Noida",
    virtual: false,
    ratePerHour: 599,
    slotsTonight: 1,
    modes: ["In-person"],
    badges: ["ID VERIFIED", "100% PLATONIC", "1 SLOT LEFT TONIGHT"],
    blurb:
      "Popcorn is on me, hot takes are on you. We watch the 10:30pm show, then stand in the parking lot for an hour deciding whether it was actually good.",
    languages: ["English", "Hindi"],
    postedLabel: "ad posted 3h ago",
    palette: "pink",
  },
  {
    id: "tara-event-plus-one",
  alias: "Tarun",
  role: "Event Plus-One",
  vibeTags: ["Event Plus-One", "Suit-Approved", "Camera-Shy (You Shine)"],
    city: "Ghaziabad",
    virtual: false,
    ratePerHour: 799,
    slotsTonight: 2,
    modes: ["In-person"],
    badges: ["ID VERIFIED", "100% PLATONIC", "REPLIES IN 10 MIN"],
    blurb:
      "Corporate galas, cousins' receptions, alumni reunions. I'm genuinely good with strangers, I remember names, and I will never post a single photo without asking.",
    languages: ["English", "Hindi"],
    postedLabel: "ad posted 6h ago",
    palette: "lime",
  },
];

export function getCompanion(id: string): Companion | undefined {
  return COMPANIONS.find((companion) => companion.id === id);
}
