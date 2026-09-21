"use client";

import { HomeAdventureBackdrop } from "@/components/home/home-adventure-backdrop";
import { ChildShell } from "@/components/child";
import { getCurrentWeekdayId } from "@/lib/walk-through-week/get-current-weekday";
import { PlayBackHomeButton } from "@/components/play/play-back-home-button";
import { WalkThroughWeekLearningView } from "./walk-through-week-learning-view";

function WalkThroughWeekAdventure() {
  const currentWeekdayId = getCurrentWeekdayId();

  return (
    <ChildShell
      className="min-h-dvh"
      contentClassName="relative max-w-3xl flex-1 gap-0 p-0"
    >
      <HomeAdventureBackdrop />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-[max(1.25rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pr-[max(1.25rem,env(safe-area-inset-right))]">
        <div className="mb-4 flex w-full justify-start landscape:mb-3">
          <PlayBackHomeButton />
        </div>

        <WalkThroughWeekLearningView currentWeekdayId={currentWeekdayId} />
      </div>
    </ChildShell>
  );
}

export { WalkThroughWeekAdventure };
