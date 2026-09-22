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
  /** Fill parent flex area at natural aspect ratio (legacy / non–full-bleed). */
  fillAvailableHeight?: boolean;
  /** Edge-to-edge viewport world: cover scale, sky/path/school prioritized via object-position. */
  fillViewport?: boolean;
};

const characterFigureClassName =
  "[&_img]:!h-[min(28dvh,20rem)] [&_img]:!max-h-[min(28dvh,20rem)] [&_img]:w-auto";

/**
 * Static pilot scene: Monday → School (Walk Through the Week).
 * Portrait environment + canonical character overlay.
 */
function WalkThroughWeekMondaySchoolScene({
  className,
  fillAvailableHeight = false,
  fillViewport = false,
}: WalkThroughWeekMondaySchoolSceneProps) {
  if (fillViewport) {
    return (
      <div
        className={cn("absolute inset-0 overflow-hidden", className)}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static public raster artwork */}
        <img
          src={WALK_THROUGH_WEEK_MONDAY_SCHOOL_ENVIRONMENT_SRC}
          alt=""
          width={WALK_THROUGH_WEEK_MONDAY_SCHOOL_ENVIRONMENT_WIDTH}
          height={WALK_THROUGH_WEEK_MONDAY_SCHOOL_ENVIRONMENT_HEIGHT}
          className="size-full object-cover object-[50%_36%]"
          draggable={false}
          decoding="async"
          fetchPriority="high"
        />

        <div
          className={cn(
            "absolute z-[20]",
            "bottom-[8%] left-[16%] sm:bottom-[9%] sm:left-[17%]"
          )}
        >
          <div className="relative flex items-end justify-center">
            <LittleAdventureCharacter
              mood="guiding"
              size="home"
              className={characterFigureClassName}
            />
            <div
              className="pointer-events-none absolute bottom-[2%] left-1/2 z-0 h-3.5 w-[62%] -translate-x-1/2 rounded-[var(--adventure-radius-full)] bg-adventure-text/[0.14] blur-[3px]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    );
  }

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
          "absolute z-[20]",
          "bottom-[11%] left-[17%]",
          "landscape:bottom-[10%] landscape:left-[16%]"
        )}
      >
        <div className="relative flex items-end justify-center">
          <LittleAdventureCharacter
            mood="guiding"
            size="home"
            className={characterFigureClassName}
          />
          <div
            className="pointer-events-none absolute bottom-[2%] left-1/2 z-0 h-3 w-[60%] -translate-x-1/2 rounded-[var(--adventure-radius-full)] bg-adventure-text/[0.12] blur-[3px]"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

export { WalkThroughWeekMondaySchoolScene };
