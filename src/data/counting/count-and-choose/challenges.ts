import type { CountingObjectKind } from "@/data/counting/object-kinds";

export type CountAndChooseChallenge = {
  id: string;
  objectKind: CountingObjectKind;
  count: number;
  /** Three choices; one must equal `count`. */
  choices: [number, number, number];
};

export const COUNT_AND_CHOOSE_CHALLENGES: CountAndChooseChallenge[] = [
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
