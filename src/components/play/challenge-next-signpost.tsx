"use client";

import { adventureTapScale, adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

type ChallengeNextSignpostProps = {
  onNext: () => void;
};

/** Rounded body + right-pointing tip — single opaque tap target. */
const ARROW_SHAPE_PATH =
  "M 28 14 H 196 Q 208 14 216 22 L 288 44 L 216 66 Q 208 74 196 74 H 28 Q 16 74 16 62 V 26 Q 16 14 28 14 Z";

function ChallengeNextSignpost({ onNext }: ChallengeNextSignpostProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const gradientId = useId().replace(/:/g, "");

  return (
    <motion.button
      type="button"
      onClick={onNext}
      className={cn(
        "challenge-next-arrow group relative block min-h-[var(--adventure-touch-min)] w-[min(100%,19rem)] shrink-0 border-0 bg-transparent p-0 sm:w-[20.5rem]",
        "outline-none focus-visible:outline-[3px] focus-visible:outline-[var(--adventure-focus-ring)] focus-visible:outline-offset-[var(--adventure-focus-offset)]"
      )}
      aria-label="Next"
      initial={{ opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={adventureTransition.slow}
      whileTap={
        reducedMotion ? undefined : { scale: adventureTapScale(reducedMotion) }
      }
    >
      <motion.div
        className="relative h-[4.25rem] w-full sm:h-[4.75rem]"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 5, 0],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <svg
          className="absolute inset-0 size-full drop-shadow-[0_6px_0_var(--adventure-next-arrow-shadow)]"
          viewBox="0 0 304 88"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--adventure-next-arrow-light)" />
              <stop offset="48%" stopColor="var(--adventure-next-arrow-mid)" />
              <stop offset="100%" stopColor="var(--adventure-next-arrow-deep)" />
            </linearGradient>
          </defs>
          <path
            d={ARROW_SHAPE_PATH}
            fill={`url(#${gradientId})`}
            stroke="var(--adventure-next-arrow-border)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>

        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-1.5 pr-6",
            "font-[family-name:var(--font-adventure)] text-[length:var(--adventure-text-2xl)] font-bold leading-none",
            "text-[var(--adventure-next-arrow-ink)] sm:text-[length:var(--adventure-text-3xl)]"
          )}
        >
          Next
          <span aria-hidden className="text-[length:var(--adventure-text-xl)] sm:text-[length:var(--adventure-text-2xl)]">
            →
          </span>
        </span>
      </motion.div>
    </motion.button>
  );
}

export { ChallengeNextSignpost };
