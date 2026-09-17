/**
 * Soft Adventure motion conventions — short, gentle, purposeful.
 * Use with `motion/react` components; respects reduced motion via helpers.
 */

import type { Transition, Variants } from "motion/react";

export const adventureTransition = {
  fast: {
    duration: 0.12,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  } satisfies Transition,
  normal: {
    duration: 0.22,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  } satisfies Transition,
  slow: {
    duration: 0.38,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  } satisfies Transition,
  springGentle: {
    type: "spring",
    stiffness: 380,
    damping: 28,
    mass: 0.8,
  } satisfies Transition,
} as const;

export const adventureMotionVariants = {
  /** Subtle press feedback for buttons and tiles */
  tapScale: {
    rest: { scale: 1 },
    pressed: { scale: 0.96 },
  } satisfies Variants,

  /** Small success pop — use briefly on correct completion */
  successPop: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.06, 1],
      transition: { duration: 0.35, ease: [0.34, 1.25, 0.64, 1] },
    },
  } satisfies Variants,

  /** Gentle idle float — optional decoration, not for constant play-loop motion */
  float: {
    initial: { y: 0 },
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 3.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  } satisfies Variants,

  /** Soft nudge on retry — not punitive */
  gentleNudge: {
    initial: { x: 0 },
    animate: {
      x: [0, -3, 3, -2, 2, 0],
      transition: { duration: 0.45, ease: "easeOut" },
    },
  } satisfies Variants,

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,
} as const;

/** Scale for whileTap when motion is allowed; identity when reduced. */
export function adventureTapScale(reducedMotion: boolean): number {
  return reducedMotion ? 1 : 0.96;
}
