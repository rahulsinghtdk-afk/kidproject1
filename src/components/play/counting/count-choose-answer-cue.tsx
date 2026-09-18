"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

type CountChooseAnswerCueProps = {
  visible: boolean;
  className?: string;
};

function CountChooseAnswerCue({ visible, className }: CountChooseAnswerCueProps) {
  const reducedMotion = useReducedMotion() ?? false;

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      className={cn("flex flex-col items-center gap-0.5", className)}
      initial={{ opacity: 0, y: reducedMotion ? 0 : -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={adventureTransition.normal}
      aria-hidden
    >
      <motion.div
        className={cn(
          "flex size-[3.25rem] items-center justify-center rounded-[var(--adventure-radius-full)]",
          "border-2 border-adventure-border bg-adventure-surface/95 shadow-[var(--adventure-shadow-sm)]"
        )}
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, 5, 0],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 1.35,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }
        }
      >
        <ChevronDown
          className="size-9 text-adventure-orange"
          strokeWidth={2.5}
          aria-hidden
        />
      </motion.div>
      <span
        className="size-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-adventure-surface/95"
        aria-hidden
      />
    </motion.div>
  );
}

export { CountChooseAnswerCue };
