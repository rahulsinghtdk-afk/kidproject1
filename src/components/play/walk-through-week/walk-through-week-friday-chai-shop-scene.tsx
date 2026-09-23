"use client";

import { cn } from "@/lib/utils";
import {
  WALK_THROUGH_WEEK_FRIDAY_CHAI_SHOP_ENVIRONMENT_HEIGHT,
  WALK_THROUGH_WEEK_FRIDAY_CHAI_SHOP_ENVIRONMENT_SRC,
  WALK_THROUGH_WEEK_FRIDAY_CHAI_SHOP_ENVIRONMENT_WIDTH,
} from "./walk-through-week-friday-chai-shop-environment";

type WalkThroughWeekFridayChaiShopSceneProps = {
  className?: string;
  /** Edge-to-edge viewport world: cover scale, stall/table prioritized via object-position. */
  fillViewport?: boolean;
};

/**
 * Friday → Chai Shop (Walk Through the Week).
 * Environment art includes the child figure — no canonical character overlay.
 */
function WalkThroughWeekFridayChaiShopScene({
  className,
  fillViewport = false,
}: WalkThroughWeekFridayChaiShopSceneProps) {
  if (fillViewport) {
    return (
      <div
        className={cn("absolute inset-0 overflow-hidden", className)}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static public raster artwork */}
        <img
          src={WALK_THROUGH_WEEK_FRIDAY_CHAI_SHOP_ENVIRONMENT_SRC}
          alt=""
          width={WALK_THROUGH_WEEK_FRIDAY_CHAI_SHOP_ENVIRONMENT_WIDTH}
          height={WALK_THROUGH_WEEK_FRIDAY_CHAI_SHOP_ENVIRONMENT_HEIGHT}
          className="size-full object-cover object-[50%_46%]"
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
        "relative mx-auto aspect-[1254/959]",
        "w-[min(100%,calc(min(78dvh,52rem)*1254/959))] max-w-full landscape:w-[min(100%,calc(min(44dvh,24rem)*1254/959))]",
        className
      )}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static public raster artwork */}
      <img
        src={WALK_THROUGH_WEEK_FRIDAY_CHAI_SHOP_ENVIRONMENT_SRC}
        alt=""
        width={WALK_THROUGH_WEEK_FRIDAY_CHAI_SHOP_ENVIRONMENT_WIDTH}
        height={WALK_THROUGH_WEEK_FRIDAY_CHAI_SHOP_ENVIRONMENT_HEIGHT}
        className="block size-full object-cover object-[50%_46%]"
        draggable={false}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}

export { WalkThroughWeekFridayChaiShopScene };
