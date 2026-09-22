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
  const [schoolWorldVisible, setSchoolWorldVisible] = useState(false);

  return (
    <ChildShell
      className={cn(
        schoolWorldVisible &&
          "bg-transparent [&_.adventure-child-shell__glow]:hidden"
      )}
      contentClassName={cn(
        "relative flex-1 gap-0",
        schoolWorldVisible
          ? "mx-0 max-w-none min-h-dvh w-full !p-0"
          : "max-w-3xl p-0"
      )}
    >
      {!schoolWorldVisible ? <HomeAdventureBackdrop /> : null}

      {schoolWorldVisible ? (
        <div className="relative min-h-dvh w-full flex-1 overflow-hidden">
          <WalkThroughWeekLearningView
            className="absolute inset-0 min-h-dvh"
            currentWeekdayId={currentWeekdayId}
            onMondaySchoolSceneVisibleChange={setSchoolWorldVisible}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-50 flex justify-start"
            style={{
              paddingTop: "max(0.75rem, env(safe-area-inset-top))",
              paddingLeft: "max(1rem, env(safe-area-inset-left))",
            }}
          >
            <div className="pointer-events-auto">
              <PlayBackHomeButton className="shrink-0" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative z-10 flex min-h-0 flex-1 flex-col px-[max(1.25rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pr-[max(1.25rem,env(safe-area-inset-right))]"
          )}
        >
          <div className="mb-2 flex w-full items-start justify-between gap-3 landscape:mb-1.5">
            <PlayBackHomeButton className="shrink-0" />
            <div
              className="pointer-events-none shrink-0 opacity-0"
              aria-hidden
            >
              <PlayBackHomeButton />
            </div>
          </div>

          <WalkThroughWeekLearningView
            className="min-h-0 flex-1"
            currentWeekdayId={currentWeekdayId}
            onMondaySchoolSceneVisibleChange={setSchoolWorldVisible}
          />
        </div>
      )}
    </ChildShell>
  );
}

export { WalkThroughWeekAdventure };
