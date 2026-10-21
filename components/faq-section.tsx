import { FAQS } from "@/content/faq";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionHeading } from "@/components/section-heading";

export function FaqSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="The questions everyone texts us"
        title={
          <>
            Asked awkwardly, answered <span className="mark">honestly</span>.
          </>
        }
        blurb="If your question isn't here, message us — we answer the same way on WhatsApp."
      />
      <FaqAccordion faqs={FAQS} />
    </section>
  );
}
