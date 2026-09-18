"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CELEBRATION_COMPOSITION_EASE,
  CELEBRATION_ENTRANCE_SEC,
} from "@/lib/motion/celebration-composition-motion";
import { cn } from "@/lib/utils";

type ChallengeGoodJobMessageProps = {
  visible: boolean;
  /** Renders with the celebration scene — no separate delayed entrance. */
  partOfCelebrationScene?: boolean;
};

function GoodJobRibbonBanner({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-[min(19rem,88vw)] sm:w-[20.5rem]"
      initial={
        reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.88, opacity: 0.9 }
      }
      animate={
        reducedMotion ? { scale: 1, opacity: 1 } : { scale: [0.88, 1.06, 1], opacity: 1 }
      }
      transition={
        reducedMotion
          ? { duration: 0.01 }
          : {
              duration: 0.55,
              delay: CELEBRATION_ENTRANCE_SEC.banner,
              ease: CELEBRATION_COMPOSITION_EASE,
            }
      }
    >
      <svg
        viewBox="0 0 340 96"
        className="block h-auto w-full drop-shadow-[0_8px_0_color-mix(in_srgb,var(--adventure-celebration-gold-deep)_55%,transparent),0_14px_28px_color-mix(in_srgb,var(--adventure-celebration-gold-deep)_22%,transparent)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="good-job-ribbon-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--adventure-celebration-gold-light)" />
            <stop offset="48%" stopColor="var(--adventure-celebration-gold)" />
            <stop offset="100%" stopColor="var(--adventure-celebration-gold-deep)" />
          </linearGradient>
          <linearGradient id="good-job-ribbon-tail" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--adventure-celebration-gold)" />
            <stop offset="100%" stopColor="var(--adventure-celebration-gold-deep)" />
          </linearGradient>
        </defs>

        <path
          d="M 6 46 L 38 24 L 38 36 L 24 44 Z"
          fill="url(#good-job-ribbon-tail)"
          stroke="var(--adventure-celebration-gold-border)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 334 46 L 302 24 L 302 36 L 316 44 Z"
          fill="url(#good-job-ribbon-tail)"
          stroke="var(--adventure-celebration-gold-border)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <path
          d="M 38 32 Q 170 66 302 32 L 302 58 Q 170 86 38 58 Z"
          fill="url(#good-job-ribbon-fill)"
          stroke="var(--adventure-celebration-gold-border)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        <ellipse
          cx="170"
          cy="38"
          rx="118"
          ry="16"
          fill="white"
          opacity="0.28"
        />
      </svg>

      <h1
        className={cn(
          "pointer-events-none absolute inset-x-0 top-[46%] -translate-y-1/2 text-center",
          "font-[family-name:var(--font-adventure)] text-[length:var(--adventure-text-2xl)] font-bold tracking-tight",
          "text-[var(--adventure-text)] sm:text-[length:var(--adventure-text-3xl)]"
        )}
      >
        Good Job!
      </h1>
    </motion.div>
  );
}

function ChallengeGoodJobMessage({ visible }: ChallengeGoodJobMessageProps) {
  const reducedMotion = useReducedMotion() ?? false;

  if (!visible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[10%] z-30 flex justify-center px-1 sm:top-[11%]"
      aria-live="polite"
    >
      <GoodJobRibbonBanner reducedMotion={reducedMotion} />
    </div>
  );
}

export { ChallengeGoodJobMessage };
