"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const spring = { type: "spring", stiffness: 90, damping: 16, mass: 0.9 } as const;

/**
 * Springy, in-view section entrance. Collapses to a plain fade (or nothing)
 * when the visitor prefers reduced motion.
 *
 * `eager` skips animation entirely. Use it for above-the-fold content: an
 * entrance animation holds the element at opacity 0 until hydration, which
 * pushes out Largest Contentful Paint for no visual benefit.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
  eager?: boolean;
}) {
  const reduced = useReducedMotion();

  if (eager) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0 },
      };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      transition={{ ...spring, delay }}
    >
      {children}
    </MotionTag>
  );
}
