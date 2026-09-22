"use client";

import {
  LittleAdventureCharacter,
  type LittleAdventureCharacterMood,
} from "@/components/character/little-adventure-character";

type CompanionMood =
  | "curious"
  | "encouraging"
  | "celebrate"
  | "requesting"
  | "gentle-full";

type PlayCompanionCharacterProps = {
  mood: CompanionMood;
  /** True after a correct answer — mascot claps in celebration. */
  clapping?: boolean;
  className?: string;
};

function toSharedMood(mood: CompanionMood): LittleAdventureCharacterMood {
  return mood === "curious" ? "idle" : mood;
}

function PlayCompanionCharacter({
  mood,
  clapping = false,
  className,
}: PlayCompanionCharacterProps) {
  return (
    <LittleAdventureCharacter
      mood={toSharedMood(mood)}
      clapping={clapping}
      size="play"
      className={className}
    />
  );
}

export { PlayCompanionCharacter };
