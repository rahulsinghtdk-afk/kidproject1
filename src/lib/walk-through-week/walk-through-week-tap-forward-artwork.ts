import type { WeekEventId } from "@/data/walk-through-week/default-week-events";

/** Contextual “Tap to move forward” artwork per illustrated-world event (when available). */
type WalkThroughWeekTapForwardArtwork =
  | "roadSign"
  | "chaiCup"
  | "temple"
  | "park";

function walkThroughWeekTapForwardArtworkForEvent(
  eventId: WeekEventId
): WalkThroughWeekTapForwardArtwork {
  switch (eventId) {
    case "chaiShop":
      return "chaiCup";
    case "temple":
      return "temple";
    case "park":
      return "park";
    case "school":
      return "roadSign";
    default:
      return "roadSign";
  }
}

export { walkThroughWeekTapForwardArtworkForEvent };
export type { WalkThroughWeekTapForwardArtwork };
