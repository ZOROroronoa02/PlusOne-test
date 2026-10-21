import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { FAQS } from "@/content/faq";
import { faqPageSchema } from "@/lib/seo";
import { URGENT_BOOKING_MESSAGE, whatsappLink } from "@/lib/site";
import { canonical } from "@/lib/seo";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ",
  alternates: canonical("/faq"),
  description:
    "Is PlusOne actually platonic? Is hiring a companion weird? How verification works, what happens if you cancel, whether your family will find out, and how payment works — answered honestly.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} id="plusone-faq" />
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <SectionHeading
          as="h1"
          eager
          eyebrow="Frequently asked, honestly answered"
          title={
            <>
              The questions everyone <span className="mark">texts</span> us at
              1am.
            </>
          }
          blurb="No corporate hedging. If something here is unclear, message us and we'll answer the same way in chat."
        />

        <FaqAccordion faqs={FAQS} headingLevel={2} />

        <Reveal delay={0.05} className="mt-12">
          <div className="rounded-3xl border-2 border-ink bg-panel p-6 text-panel-ink sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Still unsure? Ask us anything.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted">
              Awkward questions welcome. We&apos;d rather over-explain now than
              have you wondering mid-wedding.
            </p>
            <a
              href={whatsappLink(
                "Hi PlusOne 👋 I have a question about booking a companion:",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent mt-6"
            >
              <MessageCircle size={18} aria-hidden />
              Ask on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <div className="mt-20">
        <CtaBand
          eyebrow="Convinced?"
          title={<>Let&apos;s find you a plus-one.</>}
          blurb="Browse the ad deck, or send your occasion and we'll match a companion to the vibe."
          message={URGENT_BOOKING_MESSAGE}
          secondaryHref="/ads"
          secondaryLabel="Browse the deck"
        />
      </div>
    </>
  );
}
