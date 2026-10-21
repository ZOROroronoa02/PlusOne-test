/**
 * Site-wide constants a non-dev can safely edit.
 * The WhatsApp number is read from env so it is never hard-coded in copy.
 */
export const SITE = {
  name: "PlusOne",
  tagline: "Rent a plus-one. Keep the memories.",
  description:
    "PlusOne books verified, 100% platonic companions for weddings, office parties, movies, café hangouts and city tours — or virtual company anywhere in the world.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://plusone.in",
  email: "hello@plusone.in",
  instagram: "https://instagram.com/plusone",
} as const;

/**
 * Digits only, with country code, e.g. "919999999999".
 * People paste numbers as "+91 99999 99999", so strip every non-digit rather
 * than letting a broken wa.me link ship to production. Falls back to a
 * placeholder when the env var is missing or empty.
 */
const FALLBACK_WHATSAPP_NUMBER = "919999999999";

export const WHATSAPP_NUMBER =
  (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "") ||
  FALLBACK_WHATSAPP_NUMBER;

/** Builds a wa.me deep link with a URL-encoded, pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const URGENT_BOOKING_MESSAGE =
  "Hi PlusOne 👋 I'd like to book a companion. Here are my details:";
