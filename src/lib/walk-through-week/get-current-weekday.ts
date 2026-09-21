import {
  WEEKDAY_IDS,
  type WeekdayId,
} from "@/data/walk-through-week/default-week-events";

const JS_DAY_TO_WEEKDAY: WeekdayId[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/** Device-local calendar weekday (browser `Date`). */
export function getCurrentWeekdayId(date: Date = new Date()): WeekdayId {
  const index = date.getDay();
  return JS_DAY_TO_WEEKDAY[index] ?? WEEKDAY_IDS[0];
}
