export type CountingObjectKind =
  | "apple"
  | "star"
  | "balloon"
  | "ball"
  | "flower"
  | "butterfly"
  | "strawberry"
  | "fish"
  | "car"
  | "cake";

export const COUNTING_OBJECT_EMOJI: Record<CountingObjectKind, string> = {
  apple: "🍎",
  star: "⭐",
  balloon: "🎈",
  ball: "⚽",
  flower: "🌸",
  butterfly: "🦋",
  strawberry: "🍓",
  fish: "🐟",
  car: "🚗",
  cake: "🧁",
};

export const COUNTING_OBJECT_LABEL: Record<CountingObjectKind, string> = {
  apple: "apple",
  star: "star",
  balloon: "balloon",
  ball: "ball",
  flower: "flower",
  butterfly: "butterfly",
  strawberry: "strawberry",
  fish: "fish",
  car: "car",
  cake: "cake",
};

const IRREGULAR_PLURALS: Partial<Record<CountingObjectKind, string>> = {
  butterfly: "butterflies",
  strawberry: "strawberries",
  fish: "fish",
};

export function objectLabelPlural(
  objectKind: CountingObjectKind,
  count: number
): string {
  const label = COUNTING_OBJECT_LABEL[objectKind];
  if (count === 1) return label;
  const irregular = IRREGULAR_PLURALS[objectKind];
  if (irregular) return irregular;
  if (label === "ball") return "balls";
  return `${label}s`;
}

export function touchEachPrompt(objectKind: CountingObjectKind): string {
  const label = COUNTING_OBJECT_LABEL[objectKind];
  return `Touch each ${label}`;
}

export function giveMeRequest(
  quantity: number,
  objectKind: CountingObjectKind
): string {
  return `Give me ${quantity} ${objectLabelPlural(objectKind, quantity)}!`;
}
