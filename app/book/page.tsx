import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { BookingWizard } from "@/components/book/booking-wizard";
import { Reveal } from "@/components/reveal";
import { URGENT_BOOKING_MESSAGE, whatsappLink } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book a companion",
  alternates: canonical("/book"),
  description:
    "Four steps and one WhatsApp message: pick a companion, set the occasion, date and hours, choose in-person or virtual, and send. No accounts, no card forms — every booking is confirmed by a human on WhatsApp.",
};

export default function BookPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
        <Reveal eager>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Booking wizard · no account needed
          </p>
          <h1 className="mt-3 font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
            Four steps. <span className="mark">One message.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Fill in the details and we hand you a ready-to-send WhatsApp
            message with everything the team needs. Your progress is saved on
            this device, so you can finish later.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <BookingWizard />
      </section>

      <section className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-muted">
            Prefer to just talk? Skip the wizard —{" "}
            <Link href="/ads" className="font-bold text-ink underline">
              browse the deck
            </Link>{" "}
            or message us directly.
          </p>
          <a
            href={whatsappLink(URGENT_BOOKING_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <MessageCircle size={16} aria-hidden />
            WhatsApp us
          </a>
        </div>
      </section>
    </>
  );
}
