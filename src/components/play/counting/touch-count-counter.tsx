"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { adventureTransition } from "@/lib/motion/adventure-motion";

type TouchCountCounterProps = {
  count: number;
  emphasize?: boolean;
  className?: string;
};

/** Large touch-count display — “how many I’ve touched”, not a score. */
function TouchCountCounter({
  count,
  emphasize = false,
  className,
}: TouchCountCounterProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1",
        className
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <motion.div
        key={count}
        className={cn(
          "flex min-h-[5.5rem] min-w-[5.5rem] items-center justify-center",
          "rounded-[var(--adventure-radius-2xl)] border-[3px]",
          "bg-adventure-surface/90 shadow-[var(--adventure-shadow-md)]",
          count > 0
            ? "border-adventure-primary/60"
            : "border-adventure-border/80"
        )}
        initial={false}
        animate={
          emphasize && !reducedMotion
            ? { scale: [1, 1.08, 1] }
            : count > 0 && !reducedMotion
              ? { scale: [1, 1.05, 1] }
              : { scale: 1 }
        }
        transition={
          emphasize || count > 0
            ? { duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }
            : adventureTransition.normal
        }
      >
        <span
          className={cn(
            "font-[family-name:var(--font-adventure)] tabular-nums leading-none text-adventure-text",
            count > 0 ? "text-[length:var(--adventure-text-3xl)]" : "text-[length:var(--adventure-text-2xl)] text-adventure-text-muted/50"
          )}
        >
          {count}
        </span>
      </motion.div>
    </div>
  );
}

export { TouchCountCounter };
