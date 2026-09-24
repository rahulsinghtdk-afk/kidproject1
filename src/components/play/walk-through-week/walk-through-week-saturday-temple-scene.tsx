"use client";

import { cn } from "@/lib/utils";
import {
  WALK_THROUGH_WEEK_SATURDAY_TEMPLE_ENVIRONMENT_HEIGHT,
  WALK_THROUGH_WEEK_SATURDAY_TEMPLE_ENVIRONMENT_SRC,
  WALK_THROUGH_WEEK_SATURDAY_TEMPLE_ENVIRONMENT_WIDTH,
} from "./walk-through-week-saturday-temple-environment";

type WalkThroughWeekSaturdayTempleSceneProps = {
  className?: string;
  /** Edge-to-edge viewport world: cover scale, temple prioritized via object-position. */
  fillViewport?: boolean;
};

/**
 * Saturday → Temple (Walk Through the Week).
 * Environment art includes the child figure — no canonical character overlay.
 */
function WalkThroughWeekSaturdayTempleScene({
  className,
  fillViewport = false,
}: WalkThroughWeekSaturdayTempleSceneProps) {
  if (fillViewport) {
    return (
      <div
        className={cn("absolute inset-0 overflow-hidden", className)}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static public raster artwork */}
        <img
          src={WALK_THROUGH_WEEK_SATURDAY_TEMPLE_ENVIRONMENT_SRC}
          alt=""
          width={WALK_THROUGH_WEEK_SATURDAY_TEMPLE_ENVIRONMENT_WIDTH}
          height={WALK_THROUGH_WEEK_SATURDAY_TEMPLE_ENVIRONMENT_HEIGHT}
          className="size-full object-cover object-[50%_44%]"
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
        "relative mx-auto aspect-[1672/941]",
        "w-[min(100%,calc(min(78dvh,52rem)*1672/941))] max-w-full landscape:w-[min(100%,calc(min(44dvh,24rem)*1672/941))]",
        className
      )}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static public raster artwork */}
      <img
        src={WALK_THROUGH_WEEK_SATURDAY_TEMPLE_ENVIRONMENT_SRC}
        alt=""
        width={WALK_THROUGH_WEEK_SATURDAY_TEMPLE_ENVIRONMENT_WIDTH}
        height={WALK_THROUGH_WEEK_SATURDAY_TEMPLE_ENVIRONMENT_HEIGHT}
        className="block size-full object-cover object-[50%_46%]"
        draggable={false}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}

export { WalkThroughWeekSaturdayTempleScene };
