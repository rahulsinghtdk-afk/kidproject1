export type CountingObjectKind = "apple" | "star" | "balloon";

export type CountingPrototypeChallenge = {
  id: string;
  objectKind: CountingObjectKind;
  count: number;
  /** Three choices; one must equal `count`. */
  choices: [number, number, number];
};

export const COUNTING_PROTOTYPE_CHALLENGES: CountingPrototypeChallenge[] = [
  {
    id: "apples-2",
    objectKind: "apple",
    count: 2,
    choices: [1, 2, 3],
  },
  {
    id: "stars-4",
    objectKind: "star",
    count: 4,
    choices: [3, 4, 5],
  },
  {
    id: "balloons-5",
    objectKind: "balloon",
    count: 5,
    choices: [4, 5, 6],
  },
];

export const COUNTING_OBJECT_EMOJI: Record<CountingObjectKind, string> = {
  apple: "🍎",
  star: "⭐",
  balloon: "🎈",
};

export const COUNTING_OBJECT_LABEL: Record<CountingObjectKind, string> = {
  apple: "apple",
  star: "star",
  balloon: "balloon",
};

export function touchEachPrompt(objectKind: CountingObjectKind): string {
  const label = COUNTING_OBJECT_LABEL[objectKind];
  return `Touch each ${label}`;
}
