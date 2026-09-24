import { AUDIO_ASSET_PATHS } from "./assets";
import type { CountAndChooseChallenge } from "@/data/counting/count-and-choose/challenges";
import type { HelpAFriendChallenge } from "@/data/counting/help-a-friend/challenges";
import type { CountingObjectKind } from "@/data/counting/object-kinds";
import type { WeekdayId } from "@/data/walk-through-week/default-week-events";
import {
  getWeekdayEventDefaults,
  type WeekEventId,
} from "@/data/walk-through-week/default-week-events";
import type { InstructionAudioRef } from "./types";

const COUNT_TOUCH_EACH_VOICE: Record<CountingObjectKind, string> = {
  apple: AUDIO_ASSET_PATHS.voice.countTouchEachApple,
  star: AUDIO_ASSET_PATHS.voice.countTouchEachStar,
  balloon: AUDIO_ASSET_PATHS.voice.countTouchEachBalloon,
  ball: AUDIO_ASSET_PATHS.voice.countTouchEachBall,
  flower: AUDIO_ASSET_PATHS.voice.countTouchEachFlower,
  butterfly: AUDIO_ASSET_PATHS.voice.countTouchEachButterfly,
  strawberry: AUDIO_ASSET_PATHS.voice.countTouchEachStrawberry,
  fish: AUDIO_ASSET_PATHS.voice.countTouchEachFish,
  car: AUDIO_ASSET_PATHS.voice.countTouchEachCar,
  cake: AUDIO_ASSET_PATHS.voice.countTouchEachCake,
};

/** One clip per object kind — matches on-screen "Touch each {label}". */
export function countTouchEachInstruction(
  objectKind: CountingObjectKind
): InstructionAudioRef {
  return { src: COUNT_TOUCH_EACH_VOICE[objectKind] };
}

export function countHowManyInstruction(): InstructionAudioRef {
  return { src: AUDIO_ASSET_PATHS.voice.countHowMany };
}

/**
 * One clip per fixed Help a Friend challenge (MVP data).
 * Filename encodes quantity + object, e.g. give-me-2-apples.mp3
 */
const HELP_A_FRIEND_VOICE_BY_CHALLENGE_ID: Record<string, string> = {
  "apples-give-2": AUDIO_ASSET_PATHS.voice.giveMe2Apples,
  "stars-give-4": AUDIO_ASSET_PATHS.voice.giveMe4Stars,
  "balls-give-3": AUDIO_ASSET_PATHS.voice.giveMe3Balls,
};

export function helpAFriendRequestInstruction(
  challenge: HelpAFriendChallenge
): InstructionAudioRef | null {
  const src = HELP_A_FRIEND_VOICE_BY_CHALLENGE_ID[challenge.id];
  if (!src) {
    return null;
  }
  return { src };
}

export function countAndChooseTouchPhaseInstruction(
  challenge: CountAndChooseChallenge
): InstructionAudioRef {
  return countTouchEachInstruction(challenge.objectKind);
}

/** Spoken when the Next control is shown after a normal challenge celebration. */
export function clickHereToProceedInstruction(): InstructionAudioRef {
  return { src: AUDIO_ASSET_PATHS.voice.clickHereToProceed };
}

/** Count & Choose session checkpoint — generic voice (display name is visual only). */
export function wantMoreInstruction(): InstructionAudioRef {
  return { src: AUDIO_ASSET_PATHS.voice.wantMore };
}

/** Home screen — invites the child to tap Play. */
export function pressPlayToEnterGameZoneInstruction(): InstructionAudioRef {
  return { src: AUDIO_ASSET_PATHS.voice.pressPlay };
}

const WALK_THROUGH_WEEK_TODAY_VOICE: Record<WeekdayId, string> = {
  sunday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodaySunday,
  monday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayMonday,
  tuesday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayTuesday,
  wednesday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayWednesday,
  thursday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayThursday,
  friday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayFriday,
  saturday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodaySaturday,
};

/** Walk Through the Week Learning Mode — "Today is [day]." only. */
export function walkThroughWeekTodayInstruction(
  weekdayId: WeekdayId
): InstructionAudioRef {
  return { src: WALK_THROUGH_WEEK_TODAY_VOICE[weekdayId] };
}

const WALK_THROUGH_WEEK_EVENT_VOICE: Record<WeekEventId, string> = {
  school: AUDIO_ASSET_PATHS.voice.walkThroughWeekEventSchool,
  chaiShop: AUDIO_ASSET_PATHS.voice.walkThroughWeekEventChaiShop,
  temple: AUDIO_ASSET_PATHS.voice.walkThroughWeekEventTemple,
  park: AUDIO_ASSET_PATHS.voice.walkThroughWeekEventPark,
};

/** Walk Through the Week Learning Mode — event line from weekday config. */
export function walkThroughWeekEventInstruction(
  weekdayId: WeekdayId
): InstructionAudioRef {
  const { eventId } = getWeekdayEventDefaults(weekdayId);
  return { src: WALK_THROUGH_WEEK_EVENT_VOICE[eventId] };
}

/** Walk Through the Week Learning Mode — after today's line. */
export function walkThroughWeekTapToMoveForwardInstruction(): InstructionAudioRef {
  return { src: AUDIO_ASSET_PATHS.voice.walkThroughWeekTapToMoveForward };
}

const WALK_THROUGH_WEEK_THIS_IS_VOICE: Record<WeekdayId, string> = {
  sunday: AUDIO_ASSET_PATHS.voice.walkThroughWeekThisIsSunday,
  monday: AUDIO_ASSET_PATHS.voice.walkThroughWeekThisIsMonday,
  tuesday: AUDIO_ASSET_PATHS.voice.walkThroughWeekThisIsTuesday,
  wednesday: AUDIO_ASSET_PATHS.voice.walkThroughWeekThisIsWednesday,
  thursday: AUDIO_ASSET_PATHS.voice.walkThroughWeekThisIsThursday,
  friday: AUDIO_ASSET_PATHS.voice.walkThroughWeekThisIsFriday,
  saturday: AUDIO_ASSET_PATHS.voice.walkThroughWeekThisIsSaturday,
};

/** Walk Through the Week Learning Mode — visiting a day after the real today. */
export function walkThroughWeekThisIsInstruction(
  weekdayId: WeekdayId
): InstructionAudioRef {
  return { src: WALK_THROUGH_WEEK_THIS_IS_VOICE[weekdayId] };
}

const WALK_THROUGH_WEEK_TODAY_TOMORROW_VOICE: Record<WeekdayId, string> = {
  sunday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayTomorrowSunday,
  monday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayTomorrowMonday,
  tuesday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayTomorrowTuesday,
  wednesday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayTomorrowWednesday,
  thursday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayTomorrowThursday,
  friday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayTomorrowFriday,
  saturday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTodayTomorrowSaturday,
};

/** Walk Through the Week — first step after real TODAY (today → tomorrow teaching). */
export function walkThroughWeekTodayTomorrowInstruction(
  realTodayWeekdayId: WeekdayId
): InstructionAudioRef {
  return { src: WALK_THROUGH_WEEK_TODAY_TOMORROW_VOICE[realTodayWeekdayId] };
}

const WALK_THROUGH_WEEK_TOMORROW_VOICE: Record<WeekdayId, string> = {
  sunday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTomorrowSunday,
  monday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTomorrowMonday,
  tuesday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTomorrowTuesday,
  wednesday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTomorrowWednesday,
  thursday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTomorrowThursday,
  friday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTomorrowFriday,
  saturday: AUDIO_ASSET_PATHS.voice.walkThroughWeekTomorrowSaturday,
};

/** Walk Through the Week — tomorrow step: "Tomorrow is [day]." (names the active/next day). */
export function walkThroughWeekTomorrowInstruction(
  weekdayId: WeekdayId
): InstructionAudioRef {
  return { src: WALK_THROUGH_WEEK_TOMORROW_VOICE[weekdayId] };
}
