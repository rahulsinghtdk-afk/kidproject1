"use client";

import { motion, useReducedMotion } from "motion/react";
import { adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

type GiftQuantityCounterProps = {
  given: number;
  requested: number;
  emphasize?: boolean;
  className?: string;
};

/** Progress: how many gifts delivered vs how many were asked for. */
function GiftQuantityCounter({
  given,
  requested,
  emphasize = false,
  className,
}: GiftQuantityCounterProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const complete = given >= requested;

  return (
    <div
      className={cn("flex flex-col items-center gap-1", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <motion.div
        key={`${given}-${requested}`}
        className={cn(
          "flex min-h-[5.5rem] min-w-[8.5rem] items-center justify-center px-4",
          "rounded-[var(--adventure-radius-2xl)] border-[3px]",
          "bg-adventure-surface/90 shadow-[var(--adventure-shadow-md)]",
          complete
            ? "border-adventure-success/70"
            : given > 0
              ? "border-adventure-primary/60"
              : "border-adventure-border/80"
        )}
        initial={false}
        animate={
          emphasize && !reducedMotion
            ? { scale: [1, 1.08, 1] }
            : given > 0 && !reducedMotion
              ? { scale: [1, 1.05, 1] }
              : { scale: 1 }
        }
        transition={
          emphasize || given > 0
            ? { duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }
            : adventureTransition.normal
        }
      >
        <span
          className={cn(
            "font-[family-name:var(--font-adventure)] tabular-nums leading-none text-adventure-text",
            "text-[length:var(--adventure-text-2xl)] sm:text-[length:var(--adventure-text-3xl)]"
          )}
        >
          {given} / {requested}
        </span>
      </motion.div>
    </div>
  );
}

export { GiftQuantityCounter };
