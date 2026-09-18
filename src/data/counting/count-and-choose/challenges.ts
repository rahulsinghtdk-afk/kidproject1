import type { CountingObjectKind } from "@/data/counting/object-kinds";
import type { ObjectLayoutPoint } from "@/lib/counting/object-layouts";
import {
  COUNT_CHOOSE_CLUSTER_5_FLOWERS,
  COUNT_CHOOSE_CLUSTER_7,
  COUNT_CHOOSE_ROW_2,
  COUNT_CHOOSE_ROW_3,
  COUNT_CHOOSE_SCATTER_10,
  COUNT_CHOOSE_SCATTER_4,
  COUNT_CHOOSE_SCATTER_5_BALLOONS,
  COUNT_CHOOSE_SCATTER_6,
  COUNT_CHOOSE_SCATTER_8,
  COUNT_CHOOSE_SCATTER_9,
} from "./positions";

export type CountAndChooseChallenge = {
  id: string;
  objectKind: CountingObjectKind;
  count: number;
  /** Three choices; one must equal `count`. */
  choices: [number, number, number];
  /** When set, overrides default layout for this count. */
  positions?: ObjectLayoutPoint[];
};

export const COUNT_AND_CHOOSE_CHALLENGES: CountAndChooseChallenge[] = [
  {
    id: "apples-2",
    objectKind: "apple",
    count: 2,
    choices: [1, 2, 3],
    positions: COUNT_CHOOSE_ROW_2,
  },
  {
    id: "balls-3",
    objectKind: "ball",
    count: 3,
    choices: [2, 3, 4],
    positions: COUNT_CHOOSE_ROW_3,
  },
  {
    id: "stars-4",
    objectKind: "star",
    count: 4,
    choices: [3, 4, 5],
    positions: COUNT_CHOOSE_SCATTER_4,
  },
  {
    id: "balloons-5",
    objectKind: "balloon",
    count: 5,
    choices: [4, 5, 6],
    positions: COUNT_CHOOSE_SCATTER_5_BALLOONS,
  },
  {
    id: "flowers-5",
    objectKind: "flower",
    count: 5,
    choices: [4, 5, 6],
    positions: COUNT_CHOOSE_CLUSTER_5_FLOWERS,
  },
  {
    id: "butterflies-6",
    objectKind: "butterfly",
    count: 6,
    choices: [5, 6, 7],
    positions: COUNT_CHOOSE_SCATTER_6,
  },
  {
    id: "strawberries-7",
    objectKind: "strawberry",
    count: 7,
    choices: [6, 7, 8],
    positions: COUNT_CHOOSE_CLUSTER_7,
  },
  {
    id: "fish-8",
    objectKind: "fish",
    count: 8,
    choices: [7, 8, 9],
    positions: COUNT_CHOOSE_SCATTER_8,
  },
  {
    id: "cars-9",
    objectKind: "car",
    count: 9,
    choices: [8, 9, 10],
    positions: COUNT_CHOOSE_SCATTER_9,
  },
  {
    id: "cakes-10",
    objectKind: "cake",
    count: 10,
    choices: [9, 10, 11],
    positions: COUNT_CHOOSE_SCATTER_10,
  },
];
