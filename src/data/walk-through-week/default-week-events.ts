/**
 * Default real-life events per weekday — parent-configurable later.
 */

export const WEEKDAY_IDS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type WeekdayId = (typeof WEEKDAY_IDS)[number];

/** Stable event ids for voice assets — parent config can swap events later. */
export const WEEK_EVENT_IDS = [
  "school",
  "chaiShop",
  "temple",
  "park",
] as const;

export type WeekEventId = (typeof WEEK_EVENT_IDS)[number];

/** Monday-first display order for the learning path. */
export const WEEKDAY_DISPLAY_ORDER: WeekdayId[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export type WeekdayEventDefaults = {
  displayName: string;
  eventName: string;
  eventEmoji: string;
  eventId: WeekEventId;
};

export const DEFAULT_WEEK_EVENTS: Record<WeekdayId, WeekdayEventDefaults> = {
  monday: {
    displayName: "Monday",
    eventName: "School",
    eventEmoji: "🎒",
    eventId: "school",
  },
  tuesday: {
    displayName: "Tuesday",
    eventName: "School",
    eventEmoji: "🎒",
    eventId: "school",
  },
  wednesday: {
    displayName: "Wednesday",
    eventName: "School",
    eventEmoji: "🎒",
    eventId: "school",
  },
  thursday: {
    displayName: "Thursday",
    eventName: "School",
    eventEmoji: "🎒",
    eventId: "school",
  },
  friday: {
    displayName: "Friday",
    eventName: "Chai Shop",
    eventEmoji: "☕",
    eventId: "chaiShop",
  },
  saturday: {
    displayName: "Saturday",
    eventName: "Temple",
    eventEmoji: "🛕",
    eventId: "temple",
  },
  sunday: {
    displayName: "Sunday",
    eventName: "Park",
    eventEmoji: "🌳",
    eventId: "park",
  },
};

export function getWeekdayEventDefaults(
  weekdayId: WeekdayId
): WeekdayEventDefaults {
  return DEFAULT_WEEK_EVENTS[weekdayId];
}
