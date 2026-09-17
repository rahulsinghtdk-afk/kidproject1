"use client";

import { Hand } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type CountingTapHintProps = {
  className?: string;
};

function CountingTapHint({ className }: CountingTapHintProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <motion.div
        className={cn(
          "flex items-center justify-center gap-3 rounded-[var(--adventure-radius-full)]",
          "border-2 border-adventure-border bg-adventure-surface/95 px-5 py-2.5",
          "shadow-[var(--adventure-shadow-md)]"
        )}
        aria-hidden
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -3, 0],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 1.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }
        }
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  rotate: [0, -10, 0],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 1.1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
        >
          <Hand
            className="size-8 text-adventure-orange"
            strokeWidth={2.25}
            aria-hidden
          />
        </motion.div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((step) => (
            <motion.span
              key={step}
              className="size-2.5 rounded-full bg-adventure-secondary"
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: [0.4, 1, 0.4],
                      scale: [0.9, 1.15, 0.9],
                    }
              }
              transition={
                reducedMotion
                  ? undefined
                  : {
                      duration: 1.1,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: step * 0.18,
                    }
              }
            />
          ))}
        </div>
      </motion.div>
      <span
        className="size-0 border-x-[7px] border-t-[9px] border-x-transparent border-t-adventure-surface/95 drop-shadow-[0_1px_0_var(--adventure-border)]"
        aria-hidden
      />
    </div>
  );
}

export { CountingTapHint };
