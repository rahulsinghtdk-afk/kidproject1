import type { LittleAdventureCharacterMood } from "@/components/character/little-adventure-character";
import { getLittleAdventureProductionFigureSrc } from "@/components/character/little-adventure-character-figure-config";
import { FIGURE_SIZE_CLASS } from "@/components/character/little-adventure-character-figure-sizing";
import { cn } from "@/lib/utils";

type ProductionFigureSize = keyof typeof FIGURE_SIZE_CLASS;

type LittleAdventureCharacterProductionFigureProps = {
  mood: LittleAdventureCharacterMood;
  size: ProductionFigureSize;
};

function LittleAdventureCharacterProductionFigure({
  mood,
  size,
}: LittleAdventureCharacterProductionFigureProps) {
  const src = getLittleAdventureProductionFigureSrc(mood);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static public asset; swap target for production art
    <img
      key={src}
      src={src}
      alt=""
      className={cn(FIGURE_SIZE_CLASS[size], "block bg-transparent")}
      draggable={false}
      decoding="async"
    />
  );
}

export { LittleAdventureCharacterProductionFigure };
