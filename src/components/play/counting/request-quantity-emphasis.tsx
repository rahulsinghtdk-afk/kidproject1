"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type RequestQuantityEmphasisProps = {
  value: number;
  className?: string;
};

/** How many — larger type + gentle in→out scale (same ink as the sentence, no color wash). */
function RequestQuantityEmphasis({
  value,
  className,
}: RequestQuantityEmphasisProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.span
      className={cn(
        "relative mx-0.5 inline-block align-middle font-[family-name:var(--font-adventure)] font-extrabold tabular-nums leading-none text-adventure-text",
        "text-[length:var(--adventure-text-3xl)] sm:text-[2.85rem]",
        className
      )}
      style={{ transformOrigin: "center center" }}
      aria-hidden
      animate={
        reducedMotion
          ? { scale: 1 }
          : {
              scale: [0.82, 1.16, 0.82],
            }
      }
      transition={{
        duration: 2.2,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      {value}
    </motion.span>
  );
}

export { RequestQuantityEmphasis };
