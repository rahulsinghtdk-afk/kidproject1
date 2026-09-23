"use client";

import { useCallback, useState } from "react";
import type { WeekdayId } from "@/data/walk-through-week/default-week-events";
import { cn } from "@/lib/utils";
import {
  WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_HEIGHT,
  WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_SRC,
  WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_WIDTH,
  getWalkThroughWeekFinishedBannerSrc,
} from "./walk-through-week-finished-banner-artwork";

type WalkThroughWeekBannerInteraction = "locked" | "ready";

type WalkThroughWeekStorybookDayBannerProps = {
  weekdayId: WeekdayId;
  /** Minimal styling when composited over full-bleed environment. */
  inWorld?: boolean;
  /**
   * locked — voice playing; calm, not inviting tap.
   * ready — tap-to-move-forward finished; gentle glow (parent owns the tap).
   */
  interaction?: WalkThroughWeekBannerInteraction;
  className?: string;
};

/**
 * Walk Through the Week day/event banner — finished transparent artwork only.
 * Interaction glow is applied in CSS, not baked into the PNG.
 */
function WalkThroughWeekStorybookDayBanner({
  weekdayId,
  inWorld = false,
  interaction = "locked",
  className,
}: WalkThroughWeekStorybookDayBannerProps) {
  const finishedSrc = getWalkThroughWeekFinishedBannerSrc(weekdayId);
  const [legacyFallback, setLegacyFallback] = useState(false);
  const artworkSrc = legacyFallback
    ? WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_SRC
    : finishedSrc;

  const [artworkWidth, setArtworkWidth] = useState(
    WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_WIDTH
  );
  const [artworkHeight, setArtworkHeight] = useState(
    WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_HEIGHT
  );

  const handleArtworkLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setArtworkWidth(img.naturalWidth);
        setArtworkHeight(img.naturalHeight);
      }
    },
    []
  );

  const handleArtworkError = useCallback(() => {
    setLegacyFallback(true);
    setArtworkWidth(WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_WIDTH);
    setArtworkHeight(WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_HEIGHT);
  }, []);

  return (
    <div
      className={cn(
        "adventure-wtw-storybook-banner flex w-full flex-col items-center",
        inWorld && "adventure-wtw-storybook-banner--in-world",
        interaction === "ready"
          ? "adventure-wtw-storybook-banner--ready"
          : "adventure-wtw-storybook-banner--locked",
        className
      )}
      style={{
        aspectRatio: `${artworkWidth} / ${artworkHeight}`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static public raster artwork */}
      <img
        key={artworkSrc}
        src={artworkSrc}
        alt=""
        width={artworkWidth}
        height={artworkHeight}
        className="adventure-wtw-storybook-banner-artwork"
        draggable={false}
        decoding="async"
        onLoad={handleArtworkLoad}
        onError={handleArtworkError}
      />
    </div>
  );
}

export { WalkThroughWeekStorybookDayBanner };
export type { WalkThroughWeekBannerInteraction };
