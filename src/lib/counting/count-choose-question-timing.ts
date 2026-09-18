/**
 * Timing for Count & Choose question → answer reveal.
 * `COUNT_CHOOSE_QUESTION_VOICE_MS` matches `count-how-many.mp3` (~0.91s).
 */
export const COUNT_CHOOSE_QUESTION_VOICE_MS = 915;

/** Brief pause after the question voice before answer choices appear. */
export const COUNT_CHOOSE_POST_QUESTION_PAUSE_MS = 320;

/** When to show the pointer cue after the question phase begins (during the voice). */
export const COUNT_CHOOSE_ANSWER_CUE_DELAY_MS = 280;

export function countChooseAnswerRevealDelayMs(): number {
  return COUNT_CHOOSE_QUESTION_VOICE_MS + COUNT_CHOOSE_POST_QUESTION_PAUSE_MS;
}
