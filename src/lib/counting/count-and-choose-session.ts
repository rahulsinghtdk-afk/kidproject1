import {
  COUNT_AND_CHOOSE_CHALLENGES,
  type CountAndChooseChallenge,
} from "@/data/counting/count-and-choose/challenges";
import {
  COUNT_CHOOSE_CLUSTER_7,
  COUNT_CHOOSE_ROW_2,
  COUNT_CHOOSE_ROW_3,
  COUNT_CHOOSE_SCATTER_10,
  COUNT_CHOOSE_SCATTER_4,
  COUNT_CHOOSE_SCATTER_5_BALLOONS,
  COUNT_CHOOSE_SCATTER_6,
  COUNT_CHOOSE_SCATTER_8,
  COUNT_CHOOSE_SCATTER_9,
} from "@/data/counting/count-and-choose/positions";
import type { ObjectLayoutPoint } from "@/lib/counting/object-layouts";
import { getObjectLayout } from "@/lib/counting/object-layouts";
import { pickWantMoreInsertionIndex } from "@/lib/counting/count-and-choose-want-more";

const GROUP_1_QUANTITIES = [2, 3, 4, 5] as const;
const GROUP_2_QUANTITIES = [6, 7, 8, 9, 10] as const;

export type CountAndChooseSessionState = {
  quantityOrder: number[];
  wantMoreAfterIndex: number;
};

function shuffleInPlace<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j]!;
    result[j] = temp!;
  }
  return result;
}

function shuffledGroup2Quantities(): number[] {
  let group2 = shuffleInPlace([...GROUP_2_QUANTITIES]);
  while (group2[group2.length - 1] === 10) {
    group2 = shuffleInPlace([...GROUP_2_QUANTITIES]);
  }
  return group2;
}

export function createCountAndChooseSessionState(): CountAndChooseSessionState {
  return {
    quantityOrder: [
      ...shuffleInPlace([...GROUP_1_QUANTITIES]),
      ...shuffledGroup2Quantities(),
    ],
    wantMoreAfterIndex: pickWantMoreInsertionIndex(),
  };
}

export const COUNT_AND_CHOOSE_SESSION_CHALLENGE_COUNT =
  COUNT_AND_CHOOSE_CHALLENGES.length;

/** Quantities 2–10 (one each) on challenges 0–8; challenge 9 (cakes) always uses count 10. */
export function countAndChooseSessionQuantity(
  sessionState: CountAndChooseSessionState,
  challengeIndex: number
): number | undefined {
  if (challengeIndex >= sessionState.quantityOrder.length) {
    return undefined;
  }
  return sessionState.quantityOrder[challengeIndex];
}

const POSITIONS_BY_COUNT: Partial<Record<number, ObjectLayoutPoint[]>> = {
  2: COUNT_CHOOSE_ROW_2,
  3: COUNT_CHOOSE_ROW_3,
  4: COUNT_CHOOSE_SCATTER_4,
  5: COUNT_CHOOSE_SCATTER_5_BALLOONS,
  6: COUNT_CHOOSE_SCATTER_6,
  7: COUNT_CHOOSE_CLUSTER_7,
  8: COUNT_CHOOSE_SCATTER_8,
  9: COUNT_CHOOSE_SCATTER_9,
  10: COUNT_CHOOSE_SCATTER_10,
};

function choicesForCount(count: number): [number, number, number] {
  return [count - 1, count, count + 1];
}

function positionsForCount(count: number): ObjectLayoutPoint[] {
  return POSITIONS_BY_COUNT[count] ?? getObjectLayout(count);
}

/** Apply a session quantity to a fixed challenge template (object kind, id). */
export function countAndChooseChallengeWithQuantity(
  template: CountAndChooseChallenge,
  count: number
): CountAndChooseChallenge {
  return {
    ...template,
    count,
    choices: choicesForCount(count),
    positions: positionsForCount(count),
  };
}
