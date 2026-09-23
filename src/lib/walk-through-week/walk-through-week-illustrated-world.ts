import type { WeekEventId } from "@/data/walk-through-week/default-week-events";

/** Weekdays/events that use a full-bleed illustrated environment (not the generic card layout). */
const WALK_THROUGH_WEEK_ILLUSTRATED_WORLD_EVENT_IDS: WeekEventId[] = [
  "school",
  "chaiShop",
];

function isWalkThroughWeekIllustratedWorldEvent(
  eventId: WeekEventId
): boolean {
  return WALK_THROUGH_WEEK_ILLUSTRATED_WORLD_EVENT_IDS.includes(eventId);
}

export {
  isWalkThroughWeekIllustratedWorldEvent,
  WALK_THROUGH_WEEK_ILLUSTRATED_WORLD_EVENT_IDS,
};
