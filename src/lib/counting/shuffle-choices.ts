/** Deterministic shuffle so SSR and client match; varies choice order per challenge. */
export function shuffledAnswerChoices(
  choices: readonly [number, number, number],
  seed: string
): number[] {
  const result = [...choices];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash + seed.charCodeAt(i) * (i + 1)) % 9973;
  }

  for (let i = result.length - 1; i > 0; i -= 1) {
    hash = (hash * 31 + i * 17) % 9973;
    const j = hash % (i + 1);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
}
