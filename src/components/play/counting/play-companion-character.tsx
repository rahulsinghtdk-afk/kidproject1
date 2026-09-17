"use client";

import { motion, useReducedMotion } from "motion/react";
import { adventureMotionVariants } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

type CompanionMood = "curious" | "encouraging" | "celebrate";

type PlayCompanionCharacterProps = {
  mood: CompanionMood;
  className?: string;
};

function PlayCompanionCharacter({ mood, className }: PlayCompanionCharacterProps) {
  const reducedMotion = useReducedMotion() ?? false;

  const mouthPath =
    mood === "celebrate"
      ? "M 46 88 Q 60 102 74 88"
      : mood === "encouraging"
        ? "M 50 90 Q 60 96 70 90"
        : "M 48 88 Q 60 98 72 88";

  return (
    <motion.div
      className={cn("relative flex shrink-0 justify-center", className)}
      aria-hidden
      variants={adventureMotionVariants.float}
      initial="initial"
      animate={reducedMotion ? undefined : "animate"}
    >
      <motion.div
        animate={
          mood === "celebrate" && !reducedMotion
            ? { scale: [1, 1.06, 1], rotate: [0, -2, 2, 0] }
            : undefined
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 120 140"
          className="h-[min(22vw,7.5rem)] w-auto drop-shadow-[var(--adventure-shadow-md)] sm:h-[8rem] landscape:h-[7rem]"
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
            d={mouthPath}
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
    </motion.div>
  );
}

export { PlayCompanionCharacter };
