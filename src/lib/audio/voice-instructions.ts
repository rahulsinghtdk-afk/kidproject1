import { AUDIO_ASSET_PATHS } from "./assets";
import type { CountAndChooseChallenge } from "@/data/counting/count-and-choose/challenges";
import type { HelpAFriendChallenge } from "@/data/counting/help-a-friend/challenges";
import type { CountingObjectKind } from "@/data/counting/object-kinds";
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
