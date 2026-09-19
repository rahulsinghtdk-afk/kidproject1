"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getAudioManager } from "@/lib/audio";
import { adventureTapScale, adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

const PLAY_BUTTON_REST_SHADOW = "var(--adventure-shadow-lg)";

/** Distinct halo accents — cycle gently so Play stands out from the yellow button. */
const PLAY_BUTTON_GLOW_SKY =
  "0 0 44px color-mix(in srgb, var(--adventure-celebration-bubble-sky) 58%, transparent), 0 0 20px color-mix(in srgb, var(--adventure-secondary) 48%, transparent), var(--adventure-shadow-lg)";

const PLAY_BUTTON_GLOW_WARM =
  "0 0 44px color-mix(in srgb, var(--adventure-celebration-bubble-orange) 55%, transparent), 0 0 22px color-mix(in srgb, var(--adventure-celebration-bubble-green) 50%, transparent), var(--adventure-shadow-lg)";

const PLAY_BUTTON_GLOW_BERRY =
  "0 0 44px color-mix(in srgb, var(--adventure-celebration-bubble-violet) 52%, transparent), 0 0 22px color-mix(in srgb, var(--adventure-celebration-bubble-pink) 46%, transparent), var(--adventure-shadow-lg)";

const PLAY_BUTTON_GLOW_RAINBOW_PEAK =
  "0 0 38px color-mix(in srgb, var(--adventure-celebration-bubble-sky) 42%, transparent), 0 0 30px color-mix(in srgb, var(--adventure-celebration-bubble-orange) 40%, transparent), 0 0 22px color-mix(in srgb, var(--adventure-celebration-bubble-green) 38%, transparent), 0 0 14px color-mix(in srgb, var(--adventure-celebration-bubble-violet) 34%, transparent), var(--adventure-shadow-lg)";

const PLAY_BUTTON_GLOW_KEYFRAMES = [
  PLAY_BUTTON_REST_SHADOW,
  PLAY_BUTTON_GLOW_SKY,
  PLAY_BUTTON_GLOW_RAINBOW_PEAK,
  PLAY_BUTTON_GLOW_WARM,
  PLAY_BUTTON_GLOW_BERRY,
  PLAY_BUTTON_REST_SHADOW,
] as const;

const PLAY_BUTTON_ATTENTION_CYCLE_S = 2.8;

type HomePlayButtonProps = {
  className?: string;
  /** When false, breathing/glow attention animation stops (e.g. after Play is pressed). */
  attentionActive?: boolean;
  onPlayPress?: () => void;
};

function HomePlayButton({
  className,
  attentionActive = true,
  onPlayPress,
}: HomePlayButtonProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const showAttention = attentionActive && !reducedMotion;

  return (
    <motion.div
      className={cn("w-full max-w-[min(100%,18rem)] sm:max-w-xs", className)}
      animate={
        showAttention
          ? {
              scale: [1, 1.06, 1],
            }
          : { scale: 1 }
      }
      transition={
        showAttention
          ? {
              duration: PLAY_BUTTON_ATTENTION_CYCLE_S,
              ease: "easeInOut",
              repeat: Infinity,
            }
          : adventureTransition.fast
      }
    >
      <motion.div
        whileTap={{ scale: adventureTapScale(reducedMotion) }}
        transition={adventureTransition.fast}
      >
        <motion.div
          animate={
            showAttention
              ? {
                  boxShadow: [...PLAY_BUTTON_GLOW_KEYFRAMES],
                }
              : { boxShadow: PLAY_BUTTON_REST_SHADOW }
          }
          transition={
            showAttention
              ? {
                  duration: PLAY_BUTTON_ATTENTION_CYCLE_S,
                  ease: "easeInOut",
                  repeat: Infinity,
                }
              : adventureTransition.fast
          }
          className="rounded-[var(--adventure-radius-2xl)]"
        >
          <motion.div
            animate={
              showAttention
                ? { filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"] }
                : { filter: "brightness(1)" }
            }
            transition={
              showAttention
                ? {
                    duration: PLAY_BUTTON_ATTENTION_CYCLE_S,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }
                : adventureTransition.fast
            }
            className="rounded-[var(--adventure-radius-2xl)]"
          >
          <Link
            href="/play"
            onClick={() => {
              onPlayPress?.();
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
              "outline-none transition-[transform]",
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
      </motion.div>
    </motion.div>
  );
}

export { HomePlayButton };
