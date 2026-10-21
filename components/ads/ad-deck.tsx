"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Hand,
  MoveHorizontal,
  Shuffle,
} from "lucide-react";
import type { Companion } from "@/content/companions";
import { AdSlide } from "@/components/ads/ad-slide";
import { useTheme } from "@/components/theme-provider";
import {
  DEFAULT_THEME,
  isThemeName,
  THEME_STORAGE_KEY,
  type ThemeName,
} from "@/lib/themes";

const SWIPE_THRESHOLD = 90;

function readSavedTheme(): ThemeName | null {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeName(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function AdDeck({ companions }: { companions: Companion[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const { setTheme, ready } = useTheme();

  const originalTheme = useRef<ThemeName | null>(null);

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir);
      setIndex(() => {
        const total = companions.length;
        return ((next % total) + total) % total;
      });
    },
    [companions.length],
  );

  const next = useCallback(
    () => goTo(index + 1, 1),
    [goTo, index],
  );
  const prev = useCallback(
    () => goTo(index - 1, -1),
    [goTo, index],
  );
  const shuffle = useCallback(() => {
    if (companions.length < 2) return;
    let target = index;
    while (target === index) {
      target = Math.floor(Math.random() * companions.length);
    }
    goTo(target, target > index ? 1 : -1);
  }, [companions.length, goTo, index]);

  // Each ad flips the whole site palette — transiently, without touching the
  // visitor's saved choice. Gated on `ready` so the provider's hydration has
  // already happened and won't overwrite the first ad's palette.
  useEffect(() => {
    if (!ready) return;
    if (originalTheme.current === null) {
      originalTheme.current = readSavedTheme() ?? DEFAULT_THEME;
    }
    const palette = companions[index]?.palette;
    if (!palette) return;
    setTheme(palette, { persist: false });
  }, [ready, companions, index, setTheme]);

  // Hand the palette back to whatever it was when the visitor leaves the deck.
  useEffect(() => {
    return () => {
      const original = originalTheme.current;
      if (original) {
        setTheme(original, { persist: false });
      }
    };
  }, [setTheme]);

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0, -1);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(companions.length - 1, 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, companions.length]);

  const companion = companions[index];
  if (!companion) return null;

  const variants: Variants = reduced
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 90 : -90 }),
        center: { opacity: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -90 : 90 }),
      };

  return (
    <div className="relative">
      {/* Deck chrome ---------------------------------------------------- */}
      <div className="border-b-2 border-ink">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            The Ad Deck ·{" "}
            <span className="tabular-nums text-ink">
              {String(index + 1).padStart(2, "0")} / {String(
                companions.length,
              ).padStart(2, "0")}
            </span>
          </p>
          <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-muted">
            <span className="hidden items-center gap-1.5 sm:flex">
              <MoveHorizontal size={14} aria-hidden />
              Arrows or swipe
            </span>
            <span className="flex items-center gap-1.5 sm:hidden">
              <Hand size={14} aria-hidden />
              Swipe
            </span>
            <button
              type="button"
              onClick={shuffle}
              className="flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 uppercase tracking-widest transition-colors hover:bg-ink hover:text-bg"
            >
              <Shuffle size={13} aria-hidden />
              Shuffle
            </button>
          </p>
        </div>
      </div>

      {/* The ad -------------------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={companion.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reduced ? 0.15 : 0.32,
              ease: "easeOut",
            }}
            drag={reduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_event, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) next();
              else if (info.offset.x > SWIPE_THRESHOLD) prev();
            }}
            className="min-h-[68vh] cursor-grab active:cursor-grabbing"
          >
            <AdSlide companion={companion} index={index} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls ------------------------------------------------------ */}
      <div className="sticky bottom-0 border-t-2 border-ink bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous ad"
            className="flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2.5 font-bold transition-colors hover:bg-ink hover:text-bg"
          >
            <ChevronLeft size={18} aria-hidden />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <ul
            className="flex flex-wrap items-center justify-center gap-2"
            aria-label="Choose an ad"
          >
            {companions.map((item, dotIndex) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(dotIndex, dotIndex > index ? 1 : -1)}
                  aria-label={`Go to ad ${dotIndex + 1}: ${item.alias}, ${item.role}`}
                  aria-current={dotIndex === index ? "true" : undefined}
                  className="grid h-6 min-w-6 place-items-center px-1"
                >
                  <span
                    className="block h-2.5 rounded-full border border-ink transition-all"
                    style={{
                      width: dotIndex === index ? "1.75rem" : "0.625rem",
                      backgroundColor:
                        dotIndex === index ? "var(--accent)" : "transparent",
                    }}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={next}
            aria-label="Next ad"
            className="flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2.5 font-bold transition-colors hover:bg-ink hover:text-bg"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Ad {index + 1} of {companions.length}: {companion.alias},{" "}
        {companion.role}. {companion.blurb}
      </p>
    </div>
  );
}
