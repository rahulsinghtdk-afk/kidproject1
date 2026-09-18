"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getAudioManager } from "@/lib/audio";
import { adventureTapScale, adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

type HomePlayButtonProps = {
  className?: string;
};

function HomePlayButton({ className }: HomePlayButtonProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={cn("w-full max-w-[min(100%,18rem)] sm:max-w-xs", className)}
      animate={
        reducedMotion
          ? undefined
          : {
              scale: [1, 1.02, 1],
            }
      }
      transition={
        reducedMotion
          ? undefined
          : {
              duration: 2.8,
              ease: "easeInOut",
              repeat: Infinity,
            }
      }
    >
      <motion.div
        whileTap={{ scale: adventureTapScale(reducedMotion) }}
        transition={adventureTransition.fast}
      >
        <Link
          href="/play"
          onClick={() => {
            const manager = getAudioManager();
            manager.unlockFromUserGesture();
            manager.startMusic();
          }}
          className={cn(
            "flex min-h-[5.25rem] w-full items-center justify-center gap-3",
            "rounded-[var(--adventure-radius-2xl)] border-[3px]",
            "border-[color-mix(in_srgb,var(--adventure-primary)_65%,var(--adventure-border))]",
            "bg-adventure-primary px-10",
            "text-[length:var(--adventure-text-2xl)] font-bold tracking-wide text-adventure-primary-foreground",
            "shadow-[var(--adventure-shadow-lg)]",
            "outline-none transition-[box-shadow,transform]",
            "focus-visible:outline-[3px] focus-visible:outline-[var(--adventure-focus-ring)] focus-visible:outline-offset-[var(--adventure-focus-offset)]",
            "active:shadow-[var(--adventure-shadow-press)]",
            "sm:min-h-[5.75rem] sm:text-[length:var(--adventure-text-3xl)]"
          )}
        >
          <Play
            className="size-10 shrink-0 fill-current sm:size-11"
            strokeWidth={0}
            aria-hidden
          />
          Play
        </Link>
      </motion.div>
    </motion.div>
  );
}

export { HomePlayButton };
