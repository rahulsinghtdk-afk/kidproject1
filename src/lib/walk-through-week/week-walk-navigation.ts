import {
  WEEKDAY_DISPLAY_ORDER,
  type WeekdayId,
} from "@/data/walk-through-week/default-week-events";

/** Number of forward taps in one full weekly cycle (returns to real TODAY once). */
export const WALK_CYCLE_TAP_COUNT = 7;

/** Next day in the Monday → Sunday path, wrapping Sunday → Monday. */
export function getNextWeekdayInWalkOrder(weekdayId: WeekdayId): WeekdayId {
  const index = WEEKDAY_DISPLAY_ORDER.indexOf(weekdayId);
  if (index < 0) {
    return WEEKDAY_DISPLAY_ORDER[0];
  }
  return (
    WEEKDAY_DISPLAY_ORDER[
      (index + 1) % WEEKDAY_DISPLAY_ORDER.length
    ] ?? WEEKDAY_DISPLAY_ORDER[0]
  );
}

/** True after the child has walked forward seven times and returned to real TODAY. */
export function isWalkCycleComplete(walkStep: number): boolean {
  return walkStep >= WALK_CYCLE_TAP_COUNT;
}

export function canAdvanceWalk(walkStep: number): boolean {
  return walkStep < WALK_CYCLE_TAP_COUNT;
}

/** Immediate next calendar day after `weekdayId` in the learning walk order. */
export function getTomorrowWeekdayId(weekdayId: WeekdayId): WeekdayId {
  return getNextWeekdayInWalkOrder(weekdayId);
}
