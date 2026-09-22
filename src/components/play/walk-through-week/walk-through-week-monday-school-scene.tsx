"use client";

import { LittleAdventureCharacter } from "@/components/character/little-adventure-character";
import { cn } from "@/lib/utils";
import {
  WALK_THROUGH_WEEK_MONDAY_SCHOOL_ENVIRONMENT_HEIGHT,
  WALK_THROUGH_WEEK_MONDAY_SCHOOL_ENVIRONMENT_SRC,
  WALK_THROUGH_WEEK_MONDAY_SCHOOL_ENVIRONMENT_WIDTH,
} from "./walk-through-week-monday-school-environment";

type WalkThroughWeekMondaySchoolSceneProps = {
  className?: string;
  /** When true, fill the parent flex area (portrait WTW layout). */
  fillAvailableHeight?: boolean;
};

/**
 * Static pilot scene: Monday → School (Walk Through the Week).
 * Portrait artwork at natural aspect ratio + canonical character overlay.
 */
function WalkThroughWeekMondaySchoolScene({
  className,
  fillAvailableHeight = false,
}: WalkThroughWeekMondaySchoolSceneProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[1105/1424]",
        fillAvailableHeight
          ? "h-full max-h-full w-auto max-w-full min-h-0"
          : "w-[min(100%,calc(min(78dvh,52rem)*1105/1424))] max-w-full landscape:w-[min(100%,calc(min(44dvh,24rem)*1105/1424))]",
        className
      )}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static public raster artwork */}
      <img
        src={WALK_THROUGH_WEEK_MONDAY_SCHOOL_ENVIRONMENT_SRC}
        alt=""
        width={WALK_THROUGH_WEEK_MONDAY_SCHOOL_ENVIRONMENT_WIDTH}
        height={WALK_THROUGH_WEEK_MONDAY_SCHOOL_ENVIRONMENT_HEIGHT}
        className="block size-full"
        draggable={false}
        decoding="async"
        fetchPriority="high"
      />

      <div
        className={cn(
          "absolute z-[20] flex flex-col items-center",
          "bottom-[10%] left-[4%]",
          "landscape:bottom-[8%] landscape:left-[5%]"
        )}
      >
        <div
          className="mb-0.5 h-2 w-[min(18vw,4.5rem)] rounded-[var(--adventure-radius-full)] bg-adventure-text/10 blur-[2px]"
          aria-hidden
        />
        <LittleAdventureCharacter
          mood="guiding"
          size="home"
          className={cn(
            "[&_img]:h-[min(26vw,8.75rem)] [&_img]:max-h-[8.75rem]",
            "sm:[&_img]:h-[9rem]",
            "landscape:[&_img]:h-[7rem]"
          )}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[30] h-[12%] bg-gradient-to-t from-adventure-background via-adventure-background/55 to-transparent"
        aria-hidden
      />
    </div>
  );
}

export { WalkThroughWeekMondaySchoolScene };
