"use client";

import { motion } from "framer-motion";

export function BrandArt() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto aspect-square w-full max-w-sm"
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--ink)" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="url(#ring)"
          strokeWidth="3"
        />
        <motion.path
          d="M100 150 C60 120 40 95 40 75 C40 55 55 45 72 45 C85 45 95 52 100 62 C105 52 115 45 128 45 C145 45 160 55 160 75 C160 95 140 120 100 150 Z"
          fill="var(--accent)"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "100px 100px" }}
        />
        <circle cx="100" cy="42" r="6" fill="var(--ink)" />
      </svg>
    </motion.div>
  );
}
