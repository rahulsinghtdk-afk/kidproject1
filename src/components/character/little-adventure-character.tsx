"use client";

import { motion, useReducedMotion } from "motion/react";
import { LittleAdventureCharacterFigure } from "@/components/character/little-adventure-character-figure";
import {
  bodyClapScaleX,
  bodyClapScaleY,
  bodyClapY,
  clapTransition,
} from "@/components/character/little-adventure-character-figure-placeholder";
import { adventureMotionVariants } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

type LittleAdventureCharacterMood =
  | "idle"
  | "guiding"
  | "encouraging"
  | "requesting"
  | "celebrate"
  | "gentle-full";

type LittleAdventureCharacterSize = "home" | "play";

type LittleAdventureCharacterProps = {
  mood?: LittleAdventureCharacterMood;
  clapping?: boolean;
  size?: LittleAdventureCharacterSize;
  className?: string;
};

function LittleAdventureCharacter({
  mood = "idle",
  clapping = false,
  size = "play",
  className,
}: LittleAdventureCharacterProps) {
  const reducedMotion = useReducedMotion() ?? false;

  if (size === "home") {
    return (
      <motion.div
        className={cn("relative flex justify-center", className)}
        aria-hidden
        variants={adventureMotionVariants.float}
        initial="initial"
        animate={reducedMotion ? undefined : "animate"}
      >
        <LittleAdventureCharacterFigure
          mood={mood}
          clapping={clapping}
          reducedMotion={reducedMotion}
          size="home"
        />
      </motion.div>
    );
  }

  const isClapping = clapping && !reducedMotion;

  return (
    <div className={cn("relative flex shrink-0 justify-center", className)}>
      <motion.div
        className="relative flex justify-center"
        aria-hidden
        variants={isClapping ? undefined : adventureMotionVariants.float}
        initial="initial"
        animate={isClapping ? undefined : reducedMotion ? undefined : "animate"}
      >
        <motion.div
          animate={
            isClapping
              ? {
                  y: bodyClapY,
                  scaleX: bodyClapScaleX,
                  scaleY: bodyClapScaleY,
                }
              : clapping && reducedMotion
                ? { scale: [1, 1.05, 1] }
                : undefined
          }
          transition={isClapping ? clapTransition : { duration: 0.5 }}
          style={{ transformOrigin: "center bottom" }}
        >
          <LittleAdventureCharacterFigure
            mood={mood}
            clapping={clapping}
            reducedMotion={reducedMotion}
            size="play"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export { LittleAdventureCharacter };
export type {
  LittleAdventureCharacterMood,
  LittleAdventureCharacterProps,
  LittleAdventureCharacterSize,
};
