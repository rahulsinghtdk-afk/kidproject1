"use client";

import { useState } from "react";
import { HomeAdventureBackdrop } from "@/components/home/home-adventure-backdrop";
import { ChildShell } from "@/components/child";
import { getCurrentWeekdayId } from "@/lib/walk-through-week/get-current-weekday";
import { PlayBackHomeButton } from "@/components/play/play-back-home-button";
import { cn } from "@/lib/utils";
import { WalkThroughWeekLearningView } from "./walk-through-week-learning-view";

function WalkThroughWeekAdventure() {
  const currentWeekdayId = getCurrentWeekdayId();
  const [mondaySchoolSceneVisible, setMondaySchoolSceneVisible] = useState(false);

  return (
    <ChildShell
      className="min-h-dvh"
      contentClassName="relative max-w-3xl flex-1 gap-0 p-0"
    >
      {!mondaySchoolSceneVisible ? <HomeAdventureBackdrop /> : null}

      <div
        className={cn(
          "relative z-10 flex min-h-0 flex-1 flex-col px-[max(1.25rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pr-[max(1.25rem,env(safe-area-inset-right))]",
          mondaySchoolSceneVisible && "pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        )}
      >
        <div className="mb-2 flex w-full items-start justify-between gap-3 landscape:mb-1.5">
          <PlayBackHomeButton className="shrink-0" />
          {/* Balances fixed top-right audio toggle from PlayChildAudioOverlay */}
          <div
            className="pointer-events-none shrink-0 opacity-0"
            aria-hidden
          >
            <PlayBackHomeButton />
          </div>
        </div>

        <WalkThroughWeekLearningView
          currentWeekdayId={currentWeekdayId}
          onMondaySchoolSceneVisibleChange={setMondaySchoolSceneVisible}
        />
      </div>
    </ChildShell>
  );
}

export { WalkThroughWeekAdventure };
