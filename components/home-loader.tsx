"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LOADER_VIDEOS = ["/loader.mp4", "/loader2.mp4"];

export function HomeLoader() {
  const [visible, setVisible] = useState(true);
  const [src, setSrc] = useState(LOADER_VIDEOS[0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setSrc(LOADER_VIDEOS[Math.floor(Math.random() * LOADER_VIDEOS.length)]);
  }, []);

  useEffect(() => {
    const hide = () => setVisible(false);
    const fallback = window.setTimeout(hide, 5000);
    return () => window.clearTimeout(fallback);
  }, []);

  const handleReady = () => {
    if (timerRef.current) return;
    timerRef.current = window.setTimeout(() => setVisible(false), 3000);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="home-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg"
          aria-hidden
        >
        <video
          ref={videoRef}
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleReady}
          onError={() => setVisible(false)}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="relative flex flex-col items-center gap-6 px-6 text-center">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl"
          >
            Plus<span className="text-accent">One</span>
          </motion.span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="h-1 bg-accent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
          >
            Loading the devilish vibe…
          </motion.p>
        </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
