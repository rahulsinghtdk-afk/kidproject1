"use client";

import { ChildHeading, ChildShell, MusicButton } from "@/components/child";
import { useHomePlayGuidance } from "@/hooks/use-home-play-guidance";
import { HomeAdventureBackdrop } from "./home-adventure-backdrop";
import { HomeCharacter } from "./home-character";
import { HomePlayButton } from "./home-play-button";
import { ParentCornerButton } from "./parent-corner-button";

function HomeScreen() {
  const { guidanceActive, cancelGuidance } = useHomePlayGuidance();

  return (
    <ChildShell
      className="min-h-dvh"
      contentClassName="relative max-w-3xl flex-1 gap-0 p-0"
    >
      <HomeAdventureBackdrop />

      <div
        className={[
          "relative z-10 flex min-h-0 flex-1 flex-col",
          "px-[max(1.25rem,env(safe-area-inset-left))] pt-[max(1.5rem,env(safe-area-inset-top))]",
          "pb-[max(1rem,env(safe-area-inset-bottom))]",
          "pr-[max(1.25rem,env(safe-area-inset-right))]",
        ].join(" ")}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-8 pb-4 landscape:flex-row landscape:items-center landscape:justify-center landscape:gap-10 landscape:pb-6">
          <div
            className="flex w-full max-w-md flex-col items-center gap-6 text-center landscape:max-w-sm landscape:items-center landscape:gap-5"
          >
            <ChildHeading level={1} className="text-balance landscape:text-[length:var(--adventure-text-2xl)]">
              Ready to play?
            </ChildHeading>
            <HomePlayButton
              attentionActive={guidanceActive}
              onPlayPress={cancelGuidance}
            />
          </div>

          <HomeCharacter className="landscape:shrink-0" />
        </div>

        <div
          className="mt-auto flex w-full items-end justify-between gap-4 pt-2 landscape:max-w-3xl landscape:self-center"
        >
          <MusicButton />
          <ParentCornerButton />
        </div>
      </div>
    </ChildShell>
  );
}

export { HomeScreen };
