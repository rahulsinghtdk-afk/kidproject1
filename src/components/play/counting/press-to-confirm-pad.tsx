"use client";

import { useCallback, useState } from "react";
import { Hand } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { adventureMotionVariants } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

type PressToConfirmPadProps = {
  disabled?: boolean;
  /** Soft wiggle when pressed before the count matches. */
  nudge?: boolean;
  onPress: () => void;
  className?: string;
};

const PLUNGER_REST_Y = 0;
const PLUNGER_PRESSED_Y = 14;

function PressToConfirmPad({
  disabled = false,
  nudge = false,
  onPress,
  className,
}: PressToConfirmPadProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [depressed, setDepressed] = useState(false);

  const releasePlunger = useCallback(() => {
    setDepressed(false);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDepressed(true);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setDepressed(false);
    onPress();
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerCancel = () => {
    releasePlunger();
  };

  const plungerY = depressed
    ? reducedMotion
      ? PLUNGER_PRESSED_Y * 0.65
      : PLUNGER_PRESSED_Y
    : PLUNGER_REST_Y;

  return (
    <motion.div
      className={cn("flex flex-col items-center gap-3", className)}
      variants={nudge ? adventureMotionVariants.gentleNudge : undefined}
      initial="initial"
      animate={nudge ? "animate" : undefined}
    >
      <button
        type="button"
        disabled={disabled}
        aria-label="Press to confirm"
        className={cn(
          "relative touch-none select-none",
          "h-[7.25rem] w-[7.75rem] min-h-[var(--adventure-touch-min)] min-w-[var(--adventure-touch-min)] sm:h-[7.75rem] sm:w-[8.25rem]",
          "outline-none focus-visible:outline-[3px] focus-visible:outline-[var(--adventure-focus-ring)] focus-visible:outline-offset-[var(--adventure-focus-offset)]",
          "disabled:pointer-events-none disabled:opacity-45"
        )}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={depressed ? releasePlunger : undefined}
      >
        {/* Recessed socket / base ring */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[3.1rem] rounded-[50%] border-[3px] border-adventure-border-strong bg-adventure-surface shadow-[inset_0_5px_14px_rgb(55_65_81_/_0.14),var(--adventure-shadow-md)] sm:h-[3.35rem]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-[0.35rem] bottom-[0.35rem] h-[2.35rem] rounded-[50%] bg-[color-mix(in_srgb,var(--adventure-border)_35%,var(--adventure-surface))] shadow-[inset_0_3px_10px_rgb(55_65_81_/_0.18)] sm:inset-x-2"
          aria-hidden
        />

        {/* Glossy green plunger */}
        <motion.div
          className="pointer-events-none absolute left-1/2 bottom-[1.55rem] z-10 flex size-[5.35rem] -translate-x-1/2 items-center justify-center rounded-[var(--adventure-radius-full)] sm:bottom-[1.65rem] sm:size-[5.65rem]"
          style={{
            background: depressed
              ? `linear-gradient(
                  168deg,
                  color-mix(in srgb, var(--adventure-celebration-bubble-green) 70%, #1a3d22) 0%,
                  var(--adventure-celebration-bubble-green-edge) 55%,
                  color-mix(in srgb, var(--adventure-celebration-bubble-green-edge) 85%, #1a3d22) 100%
                )`
              : `linear-gradient(
                  155deg,
                  color-mix(in srgb, var(--adventure-celebration-bubble-green) 55%, white) 0%,
                  var(--adventure-celebration-bubble-green) 42%,
                  var(--adventure-celebration-bubble-green-edge) 100%
                )`,
            boxShadow: depressed
              ? "inset 0 4px 10px rgb(26 61 34 / 0.35), 0 2px 4px rgb(55 65 81 / 0.12)"
              : "0 5px 0 color-mix(in srgb, var(--adventure-celebration-bubble-green-edge) 90%, #1a3d22), 0 10px 18px rgb(55 65 81 / 0.2), inset 0 -3px 6px rgb(26 61 34 / 0.12), inset 0 3px 8px rgb(255 255 255 / 0.35)",
          }}
          animate={{ y: plungerY }}
          transition={
            reducedMotion
              ? { duration: 0.08 }
              : { type: "spring", stiffness: 520, damping: 32, mass: 0.75 }
          }
          aria-hidden
        >
          <span
            className="absolute inset-x-[18%] top-[10%] h-[38%] rounded-[50%] bg-white/45 blur-[1px]"
            aria-hidden
          />
          <span
            className="absolute inset-x-[8%] bottom-[8%] h-[22%] rounded-[50%] bg-[rgb(26_61_34_/_0.18)] blur-[2px]"
            aria-hidden
          />
          <Hand
            className="relative z-[1] size-9 text-white drop-shadow-[0_1px_2px_rgb(26_61_34_/_0.45)] sm:size-10"
            strokeWidth={2.35}
          />
        </motion.div>
      </button>

      <p
        className={cn(
          "max-w-[9rem] text-center font-[family-name:var(--font-adventure)]",
          "text-[length:var(--adventure-text-sm)] font-semibold leading-snug text-adventure-text"
        )}
      >
        Press to confirm
      </p>
    </motion.div>
  );
}

export { PressToConfirmPad };
