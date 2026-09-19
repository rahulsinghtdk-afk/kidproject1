/** 0-based index of the counting challenge after which the want-more question may appear (challenges 4–9). */
export const WANT_MORE_INSERTION_AFTER_CHALLENGE_INDICES = [3, 4, 5, 6, 7, 8] as const;

export function pickWantMoreInsertionIndex(): number {
  const options = WANT_MORE_INSERTION_AFTER_CHALLENGE_INDICES;
  return options[Math.floor(Math.random() * options.length)]!;
}
