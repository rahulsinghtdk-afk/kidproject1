"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import {
  CELEBRATION_COMPOSITION_EASE,
  CELEBRATION_ENTRANCE_SEC,
} from "@/lib/motion/celebration-composition-motion";
import { cn } from "@/lib/utils";

type ChallengeGoodJobMessageProps = {
  visible: boolean;
  partOfCelebrationScene?: boolean;
};

function GoodJobRibbonBanner({ reducedMotion }: { reducedMotion: boolean }) {
  const id = useId().replace(/:/g, "");
  const fillId = `good-job-ribbon-fill-${id}`;
  const tailDarkId = `good-job-ribbon-tail-dark-${id}`;
  const tailMidId = `good-job-ribbon-tail-mid-${id}`;

  return (
    <motion.div
      className="relative mx-auto w-[min(22rem,92vw)] sm:w-[23.5rem]"
      style={{ transformOrigin: "50% 40%" }}
      initial={
        reducedMotion
          ? { scale: 1, opacity: 1, y: 0, rotate: 0 }
          : { scale: 0.9, opacity: 0, y: 10, rotate: -1.5 }
      }
      animate={
        reducedMotion
          ? { scale: 1, opacity: 1, y: 0, rotate: 0 }
          : {
              scale: 1,
              opacity: 1,
              y: [0, -5, -8, -5, 0],
              rotate: [-1.5, 1.2, -1, 1, -1.5],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0.01 }
          : {
              opacity: { duration: 0.45, delay: CELEBRATION_ENTRANCE_SEC.banner },
              scale: {
                duration: 0.55,
                delay: CELEBRATION_ENTRANCE_SEC.banner,
                ease: CELEBRATION_COMPOSITION_EASE,
              },
              y: {
                duration: 5.8,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              rotate: {
                duration: 7.2,
                delay: 0.55,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }
      }
    >
      <svg
        viewBox="0 0 420 118"
        className="block h-auto w-full drop-shadow-[0_10px_0_color-mix(in_srgb,var(--adventure-celebration-gold-deep)_50%,transparent),0_16px_32px_color-mix(in_srgb,var(--adventure-celebration-gold-deep)_24%,transparent)]"
        aria-hidden
      >
        <defs>
          <linearGradient id={fillId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--adventure-celebration-gold-light)" />
            <stop offset="45%" stopColor="var(--adventure-celebration-gold)" />
            <stop offset="100%" stopColor="var(--adventure-celebration-gold-deep)" />
          </linearGradient>
          <linearGradient id={tailDarkId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--adventure-celebration-gold-deep)" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--adventure-celebration-gold-deep) 70%, var(--adventure-text))" />
          </linearGradient>
          <linearGradient id={tailMidId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--adventure-celebration-gold)" />
            <stop offset="100%" stopColor="var(--adventure-celebration-gold-deep)" />
          </linearGradient>
        </defs>

        <path
          d="M 4 58 L 52 22 L 52 40 L 34 54 Z"
          fill={`url(#${tailDarkId})`}
          stroke="var(--adventure-celebration-gold-border)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 416 58 L 368 22 L 368 40 L 386 54 Z"
          fill={`url(#${tailDarkId})`}
          stroke="var(--adventure-celebration-gold-border)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <path
          d="M 52 36 Q 210 62 368 36 L 382 64 Q 210 92 38 64 Z"
          fill={`url(#${fillId})`}
          stroke="var(--adventure-celebration-gold-border)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        <path
          d="M 52 36 Q 130 28 210 32 Q 290 28 368 36"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.35"
          strokeLinecap="round"
        />

        <path
          d="M 58 48 L 72 58 L 58 68 Z"
          fill={`url(#${tailMidId})`}
          opacity="0.85"
        />
        <path
          d="M 362 48 L 348 58 L 362 68 Z"
          fill={`url(#${tailMidId})`}
          opacity="0.85"
        />
      </svg>

      <h1
        className={cn(
          "pointer-events-none absolute inset-x-0 top-[48%] -translate-y-1/2 text-center",
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
      className="pointer-events-none absolute inset-x-0 top-[14%] z-30 flex justify-center px-1 sm:top-[15%]"
      aria-live="polite"
    >
      <GoodJobRibbonBanner reducedMotion={reducedMotion} />
    </div>
  );
}

export { ChallengeGoodJobMessage };
