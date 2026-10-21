"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import type { Faq } from "@/content/faq";

export function FaqAccordion({
  faqs,
  headingLevel = 3,
}: {
  faqs: Faq[];
  headingLevel?: 2 | 3;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const baseId = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <ul className="mt-12 border-t-2 border-current">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <li key={faq.question} className="border-b-2 border-current">
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {faq.question}
                </span>
                <span
                  className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-current"
                  aria-hidden
                >
                  {open ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </Heading>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={
                    reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }
                  }
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0.15 : 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pr-10 text-base text-muted">
                    {faq.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
