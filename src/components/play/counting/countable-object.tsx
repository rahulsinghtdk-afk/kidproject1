"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";
import type { ObjectLayoutPoint } from "@/lib/counting/object-layouts";

type CountableObjectProps = {
  emoji: string;
  index: number;
  layout: ObjectLayoutPoint;
  counted: boolean;
  showIdleHint: boolean;
  celebrating: boolean;
  onTap: (index: number) => void;
};

function CountableObject({
  emoji,
  index,
  layout,
  counted,
  showIdleHint,
  celebrating,
  onTap,
}: CountableObjectProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [tapFlash, setTapFlash] = useState(false);

  useEffect(() => {
    if (!tapFlash) return;
    const id = window.setTimeout(() => setTapFlash(false), 480);
    return () => window.clearTimeout(id);
  }, [tapFlash]);

  const handleClick = () => {
    if (counted || celebrating) return;
    setTapFlash(true);
    onTap(index);
  };

  return (
    <motion.button
      type="button"
      className={cn(
        "absolute flex items-center justify-center",
        "-translate-x-1/2 -translate-y-1/2",
        "min-h-[var(--adventure-touch-min)] min-w-[var(--adventure-touch-min)]",
        "size-[5.5rem] sm:size-[6.25rem]",
        "rounded-[var(--adventure-radius-full)]",
        "outline-none focus-visible:outline-[3px] focus-visible:outline-[var(--adventure-focus-ring)] focus-visible:outline-offset-[var(--adventure-focus-offset)]",
        counted
          ? "bg-[color-mix(in_srgb,var(--adventure-success)_18%,var(--adventure-surface))]"
          : "bg-adventure-surface/85",
        counted
          ? "border-[3px] border-adventure-success shadow-[0_0_0_4px_color-mix(in_srgb,var(--adventure-success)_25%,transparent),var(--adventure-shadow-md)]"
          : "border-[3px] border-adventure-border-strong shadow-[var(--adventure-shadow-md)]",
        showIdleHint &&
          !counted &&
          "shadow-[0_0_0_4px_color-mix(in_srgb,var(--adventure-primary)_35%,transparent),var(--adventure-shadow-md)]"
      )}
      style={{ left: layout.left, top: layout.top }}
      aria-label={counted ? "Already touched" : "Touch to count"}
      whileTap={
        reducedMotion || counted
          ? undefined
          : {
              scale: 0.9,
            }
      }
      animate={
        celebrating && counted && !reducedMotion
          ? { scale: [1, 1.12, 1], rotate: [0, -4, 4, 0] }
          : tapFlash && !reducedMotion
            ? { scale: [1, 1.15, 1.02] }
            : showIdleHint && !counted && !reducedMotion
              ? { y: [0, -5, 0] }
              : undefined
      }
      transition={
        tapFlash
          ? { duration: 0.4, ease: [0.34, 1.3, 0.64, 1] }
          : showIdleHint && !counted
            ? {
                duration: 2.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                delay: index * 0.15,
              }
            : adventureTransition.fast
      }
      onClick={handleClick}
    >
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-adventure-primary/45"
        initial={false}
        animate={{
          opacity: tapFlash && !reducedMotion ? [0, 0.7, 0] : 0,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        aria-hidden
      />

      <span
        className={cn(
          "relative block leading-none select-none",
          "text-[3.5rem] sm:text-[4rem]",
          counted && "drop-shadow-[0_2px_8px_color-mix(in_srgb,var(--adventure-success)_40%,transparent)]"
        )}
      >
        {emoji}
      </span>

      {counted ? (
        <span
          className="absolute -right-0.5 -top-0.5 z-[2] flex size-9 items-center justify-center rounded-full border-2 border-adventure-border bg-adventure-primary shadow-[var(--adventure-shadow-sm)]"
          aria-hidden
        >
          <Sparkles
            className="size-[1.125rem] text-adventure-orange"
            strokeWidth={2.25}
          />
        </span>
      ) : null}
    </motion.button>
  );
}

export { CountableObject };
