"use client";

import { LITTLE_ADVENTURE_CHARACTER_PRODUCTION_ASSET } from "@/components/character/little-adventure-character-figure-config";
import { LittleAdventureCharacterProductionFigure } from "@/components/character/little-adventure-character-figure-production";
import {
  HomeCharacterFigure,
  PlayCharacterFigure,
  type PlaceholderFigureMood,
} from "@/components/character/little-adventure-character-figure-placeholder";
import { FIGURE_SIZE_CLASS } from "@/components/character/little-adventure-character-figure-sizing";

type LittleAdventureCharacterFigureSize = keyof typeof FIGURE_SIZE_CLASS;

type LittleAdventureCharacterFigureProps = {
  mood: PlaceholderFigureMood;
  clapping: boolean;
  reducedMotion: boolean;
  size: LittleAdventureCharacterFigureSize;
};

function LittleAdventureCharacterFigure({
  mood,
  clapping,
  reducedMotion,
  size,
}: LittleAdventureCharacterFigureProps) {
  if (LITTLE_ADVENTURE_CHARACTER_PRODUCTION_ASSET.enabled) {
    return (
      <LittleAdventureCharacterProductionFigure mood={mood} size={size} />
    );
  }

  if (size === "home") {
    return <HomeCharacterFigure />;
  }

  return (
    <PlayCharacterFigure
      mood={mood}
      clapping={clapping}
      reducedMotion={reducedMotion}
    />
  );
}

export { LittleAdventureCharacterFigure };
export type { LittleAdventureCharacterFigureSize };
