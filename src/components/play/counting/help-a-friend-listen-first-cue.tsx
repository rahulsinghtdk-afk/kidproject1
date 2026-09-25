"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { HearAgainMegaphoneIcon } from "./hear-again-megaphone-icon";

type HelpAFriendListenFirstCueProps = {
  visible: boolean;
  className?: string;
};

/** Shown while request voice is playing — minimal “listen first” affordance. */
function HelpAFriendListenFirstCue({
  visible,
  className,
}: HelpAFriendListenFirstCueProps) {
  const reducedMotion = useReducedMotion() ?? false;

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        "flex items-center justify-center gap-2 rounded-[var(--adventure-radius-full)]",
        "border-2 border-adventure-border bg-adventure-surface/95 px-4 py-2",
        "shadow-[var(--adventure-shadow-md)]",
        className
      )}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
    >
      <HearAgainMegaphoneIcon className="size-6 shrink-0 text-adventure-orange" />
      <span className="font-[family-name:var(--font-adventure)] text-[length:var(--adventure-text-sm)] font-semibold text-adventure-text">
        Listen first
      </span>
    </motion.div>
  );
}

export { HelpAFriendListenFirstCue };
