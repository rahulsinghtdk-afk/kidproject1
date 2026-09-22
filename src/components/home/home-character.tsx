"use client";

import { LittleAdventureCharacter } from "@/components/character/little-adventure-character";

type HomeCharacterProps = {
  className?: string;
};

function HomeCharacter({ className }: HomeCharacterProps) {
  return (
    <LittleAdventureCharacter mood="idle" size="home" className={className} />
  );
}

export { HomeCharacter };
