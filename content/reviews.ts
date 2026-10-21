import type { ThemeName } from "@/lib/themes";

/**
 * SAMPLE DATA — clearly editable.
 * These are illustrative reviews written for launch. Replace the array below
 * with real, consented reviews; nothing here is tied to a live client.
 * Keep `alias` anonymous and never add a real full name or contact detail.
 */
export const REVIEWS_ARE_SAMPLES = true;

export interface Review {
  id: string;
  /** reviewer's chosen display name — "Anonymous" is always allowed */
  alias: string;
  occasion: string;
  /** "Ghaziabad" | "Noida" | "Delhi NCR" | "Online" */
  city: string;
  /** 1–5 */
  rating: number;
  text: string;
  /** relative stamp, so the wall never looks stale */
  dateLabel: string;
  /** each ticket gets its own colour */
  palette: ThemeName;
  shape: "ticket" | "polaroid";
  rotate: string;
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    alias: "Anika",
    occasion: "Office party",
    city: "Noida",
    rating: 5,
    text: "Took Mihir to my team's annual dinner. He remembered every name I whispered and rescued me from my boss twice. Nobody at work suspects a thing.",
    dateLabel: "2 weeks ago",
    palette: "periwinkle",
    shape: "ticket",
    rotate: "-2deg",
  },
  {
    id: "r2",
    alias: "Simran",
    occasion: "Wedding / Sangeet",
    city: "Ghaziabad",
    rating: 5,
    text: "My cousin's sangeet. Aarav carried the gift, danced badly with my chacha, and slipped out before the relatives started asking questions. Worth every rupee.",
    dateLabel: "3 weeks ago",
    palette: "pink",
    shape: "polaroid",
    rotate: "1.5deg",
  },
  {
    id: "r3",
    alias: "Riya",
    occasion: "Concert / Gig",
    city: "Delhi NCR",
    rating: 4,
    text: "Kabir knew the setlist better than I did. Great company, slightly too committed to the encore debate. Booking again next month.",
    dateLabel: "1 week ago",
    palette: "lime",
    shape: "ticket",
    rotate: "1deg",
  },
  {
    id: "r4",
    alias: "Anonymous",
    occasion: "Café hangout",
    city: "Ghaziabad",
    rating: 5,
    text: "Nikhil beat me at Catan and then fixed my entire week in one conversation. Two hours felt like twenty minutes.",
    dateLabel: "5 days ago",
    palette: "black",
    shape: "polaroid",
    rotate: "-1.5deg",
  },
  {
    id: "r5",
    alias: "Anonymous",
    occasion: "Virtual hangout",
    city: "Online",
    rating: 5,
    text: "Rohit talked me off a ledge at 1am from a completely different timezone. No judgement, no advice I didn't ask for. Just company.",
    dateLabel: "4 days ago",
    palette: "periwinkle",
    shape: "ticket",
    rotate: "2deg",
  },
  {
    id: "r6",
    alias: "Priya",
    occasion: "City tour",
    city: "Delhi NCR",
    rating: 5,
    text: "Dev took me to a bookshop I'd walked past for nine years and never noticed. Best four hours of my month.",
    dateLabel: "2 weeks ago",
    palette: "paper",
    shape: "polaroid",
    rotate: "-1deg",
  },
  {
    id: "r7",
    alias: "Kavya",
    occasion: "Movie",
    city: "Noida",
    rating: 4,
    text: "Ishaan is a good movie companion and an even better argument partner. We stood in the parking lot for forty minutes disagreeing. Peak cinema.",
    dateLabel: "6 days ago",
    palette: "pink",
    shape: "ticket",
    rotate: "-2.5deg",
  },
  {
    id: "r8",
    alias: "Anonymous",
    occasion: "Corporate event",
    city: "Delhi NCR",
    rating: 5,
    text: "Tarun handled my whole alumni reunion with grace. Three people asked how we met. I said college. He didn't blink.",
    dateLabel: "3 weeks ago",
    palette: "lime",
    shape: "polaroid",
    rotate: "1.5deg",
  },
  {
    id: "r9",
    alias: "Neha",
    occasion: "Family function",
    city: "Ghaziabad",
    rating: 5,
    text: "Hired a plus-one for my sister's engagement so the relatives would finally stop asking. It worked. My mother now wants to know where 'we' met.",
    dateLabel: "1 month ago",
    palette: "periwinkle",
    shape: "ticket",
    rotate: "2.5deg",
  },
];

export const REVIEW_STATS = {
  averageRating: 4.8,
  totalReviews: 214,
  wouldRebook: "96%",
} as const;
