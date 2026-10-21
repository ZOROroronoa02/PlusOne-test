export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "Is this... actually platonic?",
    answer:
      "Yes, and we're not being coy about it. PlusOne is a companionship service: someone to sit with, talk to, walk into a wedding with. Companions agree to our platonic ground rules in writing, and so do you before a booking is confirmed. Anyone — client or companion — who tries to push past that is removed, permanently and without a refund.",
  },
  {
    question: "Isn't hiring a companion a bit weird?",
    answer:
      "A wedding you don't want to attend alone isn't weird. A work dinner where you're the only one without a plus-one isn't weird. Missing a gig because none of your friends were free isn't weird. Paying for company is just a shortcut past the part where you have to explain yourself to everyone.",
  },
  {
    question: "How do you verify companions?",
    answer:
      "Every companion submits a government photo ID plus a live selfie check. We match the two by hand before their first booking, then confirm a working WhatsApp number. Badges like ID VERIFIED on an ad only appear once that check has passed.",
  },
  {
    question: "Will my family or colleagues find out?",
    answer:
      "Only if you tell them. Companions never receive your personal number, reviews are posted under aliases, and we don't run ads that retarget you. If you book for a family event, your companion knows the story you want to tell — and sticks to it.",
  },
  {
    question: "What happens if I need to cancel?",
    answer:
      "Cancel up to two hours before your slot for a full refund, no questions asked. Inside two hours we'll try to rebook you with the same companion or another one, free of charge. No-shows are the only thing we can't refund.",
  },
  {
    question: "Can I choose who I book?",
    answer:
      "That's the whole point. Browse the ad deck, read the vibe tags, and book by alias. Found someone whose conversation you liked? Save them and rebook the same person whenever you want.",
  },
  {
    question: "Do you cover my city?",
    answer:
      "We currently operate across Ghaziabad, Noida and Delhi NCR for in-person bookings, with new cities opening as verified companions join. Virtual companionship — text, voice and video — is available worldwide, across every time zone.",
  },
  {
    question: "How do I pay?",
    answer:
      "UPI, cards, or pay after the session if you prefer. Nothing is charged until you've confirmed your companion, slot and rate in writing on WhatsApp. For international virtual bookings, pricing is shown in USD at checkout.",
  },
];
