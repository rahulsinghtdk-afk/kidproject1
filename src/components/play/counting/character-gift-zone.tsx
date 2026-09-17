"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { PlayCompanionCharacter } from "./play-companion-character";
import { RequestQuantityEmphasis } from "./request-quantity-emphasis";

type CharacterGiftZoneProps = {
  mood: "requesting" | "encouraging" | "gentle-full" | "celebrate";
  requestQuantity: number;
  /** e.g. `stars!` or `apples!` */
  requestObjectPhrase: string;
  requestAriaLabel: string;
  collectedEmojis: string[];
  className?: string;
};

const CharacterGiftZone = forwardRef<HTMLDivElement, CharacterGiftZoneProps>(
  function CharacterGiftZone(
    {
      mood,
      requestQuantity,
      requestObjectPhrase,
      requestAriaLabel,
      collectedEmojis,
      className,
    },
    ref
  ) {
    const reducedMotion = useReducedMotion() ?? false;

    return (
      <div
        className={cn(
          "flex flex-col items-center gap-3",
          className
        )}
      >
        <motion.div
          className={cn(
            "relative max-w-[min(100%,20rem)] rounded-[var(--adventure-radius-2xl)]",
            "border-[3px] border-adventure-border-strong bg-adventure-surface/95",
            "px-5 py-3 text-center shadow-[var(--adventure-shadow-md)]",
            "font-[family-name:var(--font-adventure)] text-[length:var(--adventure-text-xl)] font-semibold text-adventure-text"
          )}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          aria-label={requestAriaLabel}
        >
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 leading-snug">
            <span>Give me</span>
            <RequestQuantityEmphasis value={requestQuantity} />
            <span>{requestObjectPhrase}</span>
          </p>
          <span
            className="absolute -bottom-2 left-1/2 size-0 -translate-x-1/2 border-x-[10px] border-t-[12px] border-x-transparent border-t-adventure-surface"
            aria-hidden
          />
        </motion.div>

        <div
          ref={ref}
          className={cn(
            "relative flex flex-col items-center gap-2 rounded-[var(--adventure-radius-2xl)]",
            "border-[3px] border-dashed px-4 pb-3 pt-2 transition-colors duration-300",
            "border-adventure-border/90 bg-adventure-surface/60"
          )}
        >
          <PlayCompanionCharacter mood={mood} />

          <div
            className="flex min-h-[3.25rem] min-w-[10rem] flex-wrap items-center justify-center gap-1.5 rounded-[var(--adventure-radius-xl)] bg-[color-mix(in_srgb,var(--adventure-secondary)_12%,var(--adventure-surface))] px-3 py-2"
            aria-label="Gifts collected"
          >
            {collectedEmojis.length === 0 ? (
              <span
                className="text-[length:var(--adventure-text-lg)] text-adventure-text-muted/40"
                aria-hidden
              >
                ···
              </span>
            ) : (
              collectedEmojis.map((emoji, index) => (
                <motion.span
                  key={`collected-${index}-${emoji}`}
                  className="text-[2.25rem] leading-none"
                  initial={
                    reducedMotion ? false : { scale: 0.4, opacity: 0 }
                  }
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
                  aria-hidden
                >
                  {emoji}
                </motion.span>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
);

export { CharacterGiftZone };
