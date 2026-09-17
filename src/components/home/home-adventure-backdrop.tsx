"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type HomeAdventureBackdropProps = {
  className?: string;
};

function Cloud({
  className,
  drift,
  reducedMotion,
}: {
  className?: string;
  drift: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-[var(--adventure-radius-full)] bg-adventure-surface/90 shadow-[var(--adventure-shadow-sm)]",
        className
      )}
      aria-hidden
      animate={
        reducedMotion
          ? undefined
          : {
              x: [0, drift, 0],
            }
      }
      transition={
        reducedMotion
          ? undefined
          : {
              duration: 48,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }
      }
    />
  );
}

function HomeAdventureBackdrop({ className }: HomeAdventureBackdropProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <motion.div
        className="absolute left-[12%] top-[6%] size-16 rounded-full bg-adventure-primary shadow-[0_0_40px_color-mix(in_srgb,var(--adventure-primary)_55%,transparent)] sm:size-20 landscape:top-[4%]"
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.03, 1],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
              }
        }
      >
        <div className="absolute inset-[18%] rounded-full bg-adventure-orange/80" />
      </motion.div>

      <Cloud
        reducedMotion={reducedMotion}
        drift={18}
        className="left-[8%] top-[14%] h-10 w-24 opacity-90 sm:h-12 sm:w-28"
      />
      <Cloud
        reducedMotion={reducedMotion}
        drift={-14}
        className="right-[10%] top-[10%] h-9 w-20 opacity-85 sm:h-11 sm:w-24"
      />
      <Cloud
        reducedMotion={reducedMotion}
        drift={12}
        className="left-[55%] top-[18%] h-8 w-16 opacity-75 max-sm:hidden landscape:top-[12%]"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-t from-adventure-green/55 to-transparent"
        aria-hidden
      />
      <div
        className="absolute -bottom-6 left-[-8%] h-32 w-[55%] rounded-[var(--adventure-radius-full)] bg-adventure-green/70 sm:h-40"
        aria-hidden
      />
      <div
        className="absolute -bottom-10 right-[-12%] h-36 w-[62%] rounded-[var(--adventure-radius-full)] bg-[color-mix(in_srgb,var(--adventure-green)_75%,var(--adventure-secondary)_25%)]/65 sm:h-44"
        aria-hidden
      />
      <div
        className="absolute bottom-8 left-[18%] size-4 rounded-full bg-adventure-orange/50 sm:size-5"
        aria-hidden
      />
      <div
        className="absolute bottom-14 right-[22%] size-3 rounded-full bg-adventure-secondary/60 sm:size-4"
        aria-hidden
      />
    </div>
  );
}

export { HomeAdventureBackdrop };
