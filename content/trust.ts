import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Ban,
  MapPin,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Undo2,
  UserCheck,
} from "lucide-react";

export interface TrustPoint {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  /** sticker-style short label shown on the wall */
  sticker: string;
  rotate: string;
}

export const TRUST_POINTS: TrustPoint[] = [
  {
    id: "id-verified",
    title: "Government ID, every time",
    blurb:
      "Every companion is verified against a government photo ID and a selfie check before their first booking. No exceptions, no 'my documents are coming'.",
    icon: BadgeCheck,
    sticker: "ID VERIFIED",
    rotate: "-2deg",
  },
  {
    id: "platonic",
    title: "100% platonic, in writing",
    blurb:
      "PlusOne is companionship. Companions agree to it, and so do you, in the booking terms. Anyone pushing boundaries is removed permanently.",
    icon: ShieldCheck,
    sticker: "100% PLATONIC",
    rotate: "1.5deg",
  },
  {
    id: "public",
    title: "Public places only",
    blurb:
      "Cafés, malls, weddings, parks, cinemas. Nobody has to go anywhere private, and no one is asked to. That rule protects both sides.",
    icon: MapPin,
    sticker: "PUBLIC PLACES ONLY",
    rotate: "-1deg",
  },
  {
    id: "privacy",
    title: "Your number stays yours",
    blurb:
      "We never share personal contact details with a companion, and reviews are posted with aliases. Your colleagues will never find out from us.",
    icon: UserCheck,
    sticker: "PRIVACY FIRST",
    rotate: "2deg",
  },
  {
    id: "whatsapp",
    title: "Verified WhatsApp Business",
    blurb:
      "All bookings run through our verified WhatsApp Business line, so you always know it's genuinely PlusOne on the other end.",
    icon: MessageCircle,
    sticker: "VERIFIED BUSINESS",
    rotate: "-1.5deg",
  },
  {
    id: "refunds",
    title: "Refund if you cancel early",
    blurb:
      "Cancel up to two hours before your slot and you get a full refund — no interrogation, no 'processing fee' nonsense.",
    icon: Undo2,
    sticker: "FULL REFUND, 2H+",
    rotate: "1deg",
  },
  {
    id: "no-strings",
    title: "Zero strings attached",
    blurb:
      "No follow-up texting unless you ask, no unsolicited 'hey how are you' three weeks later. The hour ends when it ends.",
    icon: Ban,
    sticker: "NO STRINGS",
    rotate: "-2.5deg",
  },
  {
    id: "rebook",
    title: "Easy rebooking",
    blurb:
      "Found someone you actually enjoy talking to? Save their alias and rebook them as often as you like — same vibe guaranteed.",
    icon: RotateCcw,
    sticker: "REBOOK ANYONE",
    rotate: "1.5deg",
  },
];

export const GROUND_RULES: string[] = [
  "All meetups happen in public places — always.",
  "No private residences, hotel rooms or secluded locations.",
  "Companions never share personal contact details or social handles.",
  "Physical contact beyond a greeting is off the table.",
  "Anyone requesting more than platonic company is banned, without refund.",
  "Photos are taken only with clear, spoken consent.",
  "Companions may end a session immediately if they feel unsafe.",
  "Every companion and client relationship is strictly professional.",
];

export interface VerificationStep {
  number: string;
  title: string;
  detail: string;
}

/** What actually happens before a companion's first booking. */
export const VERIFICATION_STEPS: VerificationStep[] = [
  {
    number: "01",
    title: "Government photo ID",
    detail:
      "Aadhaar, passport or driving licence. We read the number, check the photo, and store only a masked reference — never the document itself.",
  },
  {
    number: "02",
    title: "Live selfie match",
    detail:
      "A human on our team compares a live selfie to the ID. No filters, no stock photos, no borrowed documents.",
  },
  {
    number: "03",
    title: "Working WhatsApp check",
    detail:
      "We confirm an active, reachable WhatsApp number on our verified Business line, so you always know who is replying.",
  },
  {
    number: "04",
    title: "Ground rules, signed",
    detail:
      "Every companion accepts the platonic ground rules in writing before a single booking. Repeated breaches mean permanent removal.",
  },
  {
    number: "05",
    title: "First three bookings monitored",
    detail:
      "New companions are reviewed after their first three sessions — by the client's rating and by their own feedback on how it went.",
  },
];

export interface PolicyBlock {
  id: string;
  title: string;
  lines: string[];
}

export const POLICIES: PolicyBlock[] = [
  {
    id: "refunds",
    title: "Refunds & cancellations",
    lines: [
      "Cancel two hours or more before your slot for a full refund — UPI or card, back within three working days.",
      "Inside two hours we rebook you free of charge with the same companion or the closest match.",
      "No-shows are not refundable, because the companion has already held the slot.",
      "If a companion cancels on you, you always get a full refund plus a ₹200 credit towards your next booking.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy protection",
    lines: [
      "You book under an alias — we never ask for or store your legal name.",
      "Your phone number is never shared with a companion, and theirs is never shared with you.",
      "Reviews are published under an alias you choose — including 'Anonymous'.",
      "After every booking our team makes a quick verification call before the slot is confirmed.",
      "We do not sell data, run retargeting ads, or email marketing you didn't ask for.",
      "Booking details are kept for 12 months for dispute resolution, then deleted.",
    ],
  },
  {
    id: "terms",
    title: "Terms & conditions",
    lines: [
      "PlusOne provides strictly platonic companionship. Any request beyond that ends the booking without refund.",
      "All meetups happen in public places only; private locations are not allowed.",
      "Companions and clients must treat each other with respect. Abuse or harassment leads to immediate removal.",
      "Prices are estimates until confirmed on WhatsApp. Final amounts are agreed before the slot is booked.",
      "Cancellations follow the refund policy. No-shows are not refundable.",
      "By booking, you accept these terms and the ground rules listed above.",
    ],
  },
];
