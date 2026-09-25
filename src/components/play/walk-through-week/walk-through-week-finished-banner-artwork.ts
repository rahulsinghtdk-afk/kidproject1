import type { WeekdayId } from "@/data/walk-through-week/default-week-events";
import {
  WALK_THROUGH_WEEK_DAY_BANNER_ARTWORK_HEIGHT,
  WALK_THROUGH_WEEK_DAY_BANNER_ARTWORK_SRC,
  WALK_THROUGH_WEEK_DAY_BANNER_ARTWORK_WIDTH,
} from "./walk-through-week-day-banner-artwork";

/** Finished transparent banners — one PNG per weekday/event pair. */
const WALK_THROUGH_WEEK_FINISHED_BANNER_DIR =
  "/environments/walk-through-week/banners";

/**
 * Fixed seven-state map (Mon–Sun). Filenames match supplied production art.
 * Place files under `public/environments/walk-through-week/banners/`.
 */
const WALK_THROUGH_WEEK_FINISHED_BANNER_FILENAME: Record<WeekdayId, string> = {
  monday: "monday-school.png",
  tuesday: "tuesday-school.png",
  wednesday: "wednesday-school.png",
  thursday: "thursday-school.png",
  friday: "friday-chaishop.png",
  saturday: "saturday-temple-banner.png",
  sunday: "sunday-banner.png",
};

function getWalkThroughWeekFinishedBannerSrc(weekdayId: WeekdayId): string {
  return `${WALK_THROUGH_WEEK_FINISHED_BANNER_DIR}/${WALK_THROUGH_WEEK_FINISHED_BANNER_FILENAME[weekdayId]}`;
}

/** Temporary frame-only fallback until all seven finished assets ship. */
const WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_SRC =
  WALK_THROUGH_WEEK_DAY_BANNER_ARTWORK_SRC;

const WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_WIDTH =
  WALK_THROUGH_WEEK_DAY_BANNER_ARTWORK_WIDTH;

const WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_HEIGHT =
  WALK_THROUGH_WEEK_DAY_BANNER_ARTWORK_HEIGHT;

export {
  WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_HEIGHT,
  WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_SRC,
  WALK_THROUGH_WEEK_BANNER_LEGACY_FALLBACK_WIDTH,
  WALK_THROUGH_WEEK_FINISHED_BANNER_DIR,
  WALK_THROUGH_WEEK_FINISHED_BANNER_FILENAME,
  getWalkThroughWeekFinishedBannerSrc,
};
