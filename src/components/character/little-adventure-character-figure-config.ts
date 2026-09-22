import type { LittleAdventureCharacterMood } from "@/components/character/little-adventure-character";

/**
 * Integration point for approved Little Adventure production character artwork.
 *
 * Shell motion, sizing, and screen layout stay unchanged — only the figure layer swaps.
 *
 * Mood-specific PNGs (optional, add when artwork exists):
 * `/character/little-adventure-{mood}.png` — e.g. `little-adventure-celebrate.png`
 *
 * Register each path in `moodPoseSrc`. Moods without an entry use `defaultPoseSrc`.
 */
const LITTLE_ADVENTURE_CHARACTER_PRODUCTION_ASSET = {
  enabled: true,
  /** Fallback if a mood is missing from `moodPoseSrc`. */
  defaultPoseSrc: "/character/little-adventure-default.png",
  moodPoseSrc: {
    idle: "/character/little-adventure-default.png",
    guiding: "/character/little-adventure-guiding.png",
    encouraging: "/character/little-adventure-encouraging.png",
    requesting: "/character/little-adventure-requesting.png",
    celebrate: "/character/little-adventure-celebrate.png",
    "gentle-full": "/character/little-adventure-gentle-full.png",
  } satisfies Record<LittleAdventureCharacterMood, string>,
} as const;

function getLittleAdventureProductionFigureSrc(
  mood: LittleAdventureCharacterMood,
): string {
  return (
    LITTLE_ADVENTURE_CHARACTER_PRODUCTION_ASSET.moodPoseSrc[mood] ??
    LITTLE_ADVENTURE_CHARACTER_PRODUCTION_ASSET.defaultPoseSrc
  );
}

export {
  getLittleAdventureProductionFigureSrc,
  LITTLE_ADVENTURE_CHARACTER_PRODUCTION_ASSET,
};
