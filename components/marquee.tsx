"use client";

import type { ReactNode } from "react";
import { useState } from "react";

interface MarqueeProps {
  items: ReactNode[];
  /** "normal" or "slow" — maps to CSS animation duration */
  speed?: "normal" | "slow";
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite ticker strip. The track is rendered twice so the -50% keyframe
 * loops seamlessly. Pauses entirely under prefers-reduced-motion.
 */
export function Marquee({
  items,
  speed = "normal",
  reverse = false,
  className = "",
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const track = (
    <div
      className={`marquee ${speed === "slow" ? "marquee-slow" : ""} ${
        reverse ? "marquee-reverse" : ""
      } items-center`}
      aria-hidden="true"
      style={{ animationPlayState: paused ? "paused" : "running" }}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {items.map((item, index) => (
            <span
              key={`${copy}-${index}`}
              className="flex items-center gap-8 px-8 font-display text-xl uppercase tracking-tight sm:text-2xl"
            >
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden border-y-2 border-ink py-4 ${className}`}>
      <span className="sr-only">
        {items.map((item, index) => (
          <span key={index}>{item} · </span>
        ))}
      </span>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        className="absolute right-2 top-2 z-10 rounded-full border-2 border-ink bg-bg px-2 py-1 font-mono text-[10px] uppercase"
        aria-label={paused ? "Play ticker" : "Pause ticker"}
      >
        {paused ? "Play" : "Pause"}
      </button>
      {track}
    </div>
  );
}
