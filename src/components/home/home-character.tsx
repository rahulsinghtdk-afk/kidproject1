"use client";

import { motion, useReducedMotion } from "motion/react";
import { adventureMotionVariants } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

type HomeCharacterProps = {
  className?: string;
};

/**
 * Simple placeholder mascot — swap the SVG for art later without changing layout hooks.
 */
function HomeCharacter({ className }: HomeCharacterProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={cn("relative flex justify-center", className)}
      aria-hidden
      variants={adventureMotionVariants.float}
      initial="initial"
      animate={reducedMotion ? undefined : "animate"}
    >
      <svg
        viewBox="0 0 120 140"
        className="h-[min(28vw,9rem)] w-auto drop-shadow-[var(--adventure-shadow-md)] sm:h-[10rem] landscape:h-[8.5rem]"
        role="img"
        aria-label=""
      >
        <ellipse
          cx="60"
          cy="118"
          rx="42"
          ry="10"
          fill="color-mix(in srgb, var(--adventure-text) 8%, transparent)"
        />
        <ellipse cx="60" cy="78" rx="38" ry="42" fill="var(--adventure-secondary)" />
        <ellipse
          cx="60"
          cy="78"
          rx="38"
          ry="42"
          fill="none"
          stroke="var(--adventure-border-strong)"
          strokeWidth="2.5"
        />
        <circle cx="48" cy="72" r="5" fill="var(--adventure-text)" />
        <circle cx="72" cy="72" r="5" fill="var(--adventure-text)" />
        <path
          d="M 48 88 Q 60 98 72 88"
          fill="none"
          stroke="var(--adventure-text)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="60" cy="38" rx="34" ry="30" fill="var(--adventure-orange)" />
        <ellipse
          cx="60"
          cy="38"
          rx="34"
          ry="30"
          fill="none"
          stroke="var(--adventure-border-strong)"
          strokeWidth="2.5"
        />
        <circle cx="48" cy="36" r="4.5" fill="var(--adventure-text)" />
        <circle cx="72" cy="36" r="4.5" fill="var(--adventure-text)" />
        <path
          d="M 50 48 Q 60 56 70 48"
          fill="none"
          stroke="var(--adventure-text)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <ellipse cx="28" cy="82" rx="10" ry="16" fill="var(--adventure-primary)" />
        <ellipse cx="92" cy="82" rx="10" ry="16" fill="var(--adventure-primary)" />
        <rect
          x="52"
          y="22"
          width="16"
          height="10"
          rx="4"
          fill="var(--adventure-green)"
          stroke="var(--adventure-border-strong)"
          strokeWidth="2"
        />
      </svg>
    </motion.div>
  );
}

export { HomeCharacter };
