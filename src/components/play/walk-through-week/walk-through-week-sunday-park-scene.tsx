"use client";

import { cn } from "@/lib/utils";
import {
  WALK_THROUGH_WEEK_SUNDAY_PARK_ENVIRONMENT_HEIGHT,
  WALK_THROUGH_WEEK_SUNDAY_PARK_ENVIRONMENT_SRC,
  WALK_THROUGH_WEEK_SUNDAY_PARK_ENVIRONMENT_WIDTH,
} from "./walk-through-week-sunday-park-environment";

type WalkThroughWeekSundayParkSceneProps = {
  className?: string;
  /** Edge-to-edge viewport world: cover scale, playground prioritized via object-position. */
  fillViewport?: boolean;
};

/**
 * Sunday → Park (Walk Through the Week).
 * Environment art includes the child figure — no canonical character overlay.
 */
function WalkThroughWeekSundayParkScene({
  className,
  fillViewport = false,
}: WalkThroughWeekSundayParkSceneProps) {
  if (fillViewport) {
    return (
      <div
        className={cn("absolute inset-0 overflow-hidden", className)}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static public raster artwork */}
        <img
          src={WALK_THROUGH_WEEK_SUNDAY_PARK_ENVIRONMENT_SRC}
          alt=""
          width={WALK_THROUGH_WEEK_SUNDAY_PARK_ENVIRONMENT_WIDTH}
          height={WALK_THROUGH_WEEK_SUNDAY_PARK_ENVIRONMENT_HEIGHT}
          className="size-full object-cover object-[46%_38%] max-sm:object-[40%_42%]"
          draggable={false}
          decoding="async"
          fetchPriority="high"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[1024/1536]",
        "w-[min(100%,calc(min(78dvh,52rem)*1024/1536))] max-w-full landscape:w-[min(100%,calc(min(44dvh,24rem)*1024/1536))]",
        className
      )}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static public raster artwork */}
      <img
        src={WALK_THROUGH_WEEK_SUNDAY_PARK_ENVIRONMENT_SRC}
        alt=""
        width={WALK_THROUGH_WEEK_SUNDAY_PARK_ENVIRONMENT_WIDTH}
        height={WALK_THROUGH_WEEK_SUNDAY_PARK_ENVIRONMENT_HEIGHT}
        className="block size-full object-cover object-[46%_40%] max-sm:object-[40%_44%]"
        draggable={false}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}

export { WalkThroughWeekSundayParkScene };
