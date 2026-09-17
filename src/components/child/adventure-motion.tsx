"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { adventureTapScale, adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

type AdventureMotionProps = HTMLMotionProps<"div"> & {
  /** When true, applies gentle tap scale (buttons/tiles). */
  tapFeedback?: boolean;
};

/**
 * Wrapper around `motion.div` with Soft Adventure defaults and reduced-motion safety.
 */
function AdventureMotion({
  className,
  tapFeedback = false,
  transition,
  whileTap,
  ...props
}: AdventureMotionProps) {
  const reducedMotion = useReducedMotion() ?? false;

  const resolvedWhileTap =
    whileTap ??
    (tapFeedback
      ? { scale: adventureTapScale(reducedMotion) }
      : undefined);

  return (
    <motion.div
      className={cn(className)}
      transition={transition ?? adventureTransition.normal}
      whileTap={resolvedWhileTap}
      {...props}
    />
  );
}

export { AdventureMotion, motion, useReducedMotion };
