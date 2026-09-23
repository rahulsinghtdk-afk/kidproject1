"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
  adventureTapScale,
  adventureTransition,
} from "@/lib/motion/adventure-motion";
import { motion, useReducedMotion } from "motion/react";
import {
  WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_ARTWORK_HEIGHT,
  WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_ARTWORK_SRC,
  WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_ARTWORK_WIDTH,
} from "./walk-through-week-tap-to-move-forward-artwork";
import {
  WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_CHAI_ARTWORK_HEIGHT,
  WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_CHAI_ARTWORK_SRC,
  WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_CHAI_ARTWORK_WIDTH,
} from "./walk-through-week-tap-to-move-forward-chai-artwork";

type WalkThroughWeekTapForwardArtwork = "roadSign" | "chaiCup";

type WalkThroughWeekTapToMoveForwardSignProps = {
  /** Sign is on screen (tap-forward instruction has started for this step). */
  visible: boolean;
  /** Voice finished — sign is tappable (existing WTW contract). */
  tappable: boolean;
  onTap: () => void;
  /** Composited over full-bleed illustrated world (school days). */
  inWorld?: boolean;
  /** School days use the road sign; Friday Chai Shop uses the chai-cup artwork. */
  artwork?: WalkThroughWeekTapForwardArtwork;
  className?: string;
  ariaLabel: string;
};

/**
 * Illustrated road-sign tap target for Walk Through the Week progression.
 * Presentational only — parent owns audio timing and walk state.
 */
function WalkThroughWeekTapToMoveForwardSign({
  visible,
  tappable,
  onTap,
  inWorld = false,
  artwork = "roadSign",
  className,
  ariaLabel,
}: WalkThroughWeekTapToMoveForwardSignProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const isChaiCup = artwork === "chaiCup";
  const defaultArtworkWidth = isChaiCup
    ? WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_CHAI_ARTWORK_WIDTH
    : WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_ARTWORK_WIDTH;
  const defaultArtworkHeight = isChaiCup
    ? WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_CHAI_ARTWORK_HEIGHT
    : WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_ARTWORK_HEIGHT;
  const artworkSrc = isChaiCup
    ? WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_CHAI_ARTWORK_SRC
    : WALK_THROUGH_WEEK_TAP_TO_MOVE_FORWARD_ARTWORK_SRC;

  const [artworkWidth, setArtworkWidth] = useState(defaultArtworkWidth);
  const [artworkHeight, setArtworkHeight] = useState(defaultArtworkHeight);

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

  if (!visible) {
    return null;
  }

  return (
    <motion.button
      type="button"
      onClick={tappable ? onTap : undefined}
      aria-label={ariaLabel}
      aria-disabled={!tappable}
      tabIndex={tappable ? 0 : -1}
      whileTap={
        tappable && !reducedMotion
          ? { scale: adventureTapScale(reducedMotion) }
          : undefined
      }
      initial={
        isChaiCup && !reducedMotion ? { opacity: 0, scale: 0.96 } : false
      }
      animate={
        isChaiCup && !reducedMotion ? { opacity: 1, scale: 1 } : undefined
      }
      transition={
        isChaiCup && !reducedMotion ? adventureTransition.normal : undefined
      }
      className={cn(
        "adventure-wtw-tap-forward-sign touch-manipulation",
        inWorld && "adventure-wtw-tap-forward-sign--in-world",
        isChaiCup && "adventure-wtw-tap-forward-sign--chai",
        tappable
          ? "adventure-wtw-tap-forward-sign--ready"
          : "adventure-wtw-tap-forward-sign--waiting",
        !tappable && "pointer-events-none cursor-default",
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
        className="adventure-wtw-tap-forward-sign-artwork"
        draggable={false}
        decoding="async"
        onLoad={handleArtworkLoad}
      />
    </motion.button>
  );
}

export { WalkThroughWeekTapToMoveForwardSign };
export type { WalkThroughWeekTapForwardArtwork };
