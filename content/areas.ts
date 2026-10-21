export interface ServedArea {
  city: string;
  /** short note on what's typically booked there */
  note: string;
  /** true = virtual only, no in-person meetups yet */
  virtualOnly?: boolean;
}

export const SERVED_AREAS: ServedArea[] = [
  {
    city: "Ghaziabad",
    note: "Weddings, family functions, café meetups, mall days out.",
  },
  {
    city: "Noida",
    note: "Office parties, corporate galas, cinema runs, Sector 18 wanderings.",
  },
  {
    city: "Delhi NCR",
    note: "City tours, gigs, bookshops, and a genuinely good plate of chaat.",
  },
  {
    city: "Virtual — Worldwide",
    note: "Text, voice and video companionship in any time zone.",
    virtualOnly: true,
  },
];

export const COMING_SOON_AREAS = ["Gurugram", "Mumbai", "Pune", "Bengaluru"];
