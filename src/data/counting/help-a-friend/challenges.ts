import type { CountingObjectKind } from "@/data/counting/object-kinds";

export type HelpAFriendChallenge = {
  id: string;
  objectKind: CountingObjectKind;
  /** How many objects the character wants */
  requested: number;
  /** Objects shown in the play area (same type; count ≥ requested) */
  available: number;
};

/** Ten fixed tasks — progression is data-only; ids must be unique for React keys. */
export const HELP_A_FRIEND_CHALLENGES = [
  {
    id: "apples-give-2",
    objectKind: "apple",
    requested: 2,
    available: 3,
  },
  {
    id: "stars-give-3",
    objectKind: "star",
    requested: 3,
    available: 5,
  },
  {
    id: "balls-give-4",
    objectKind: "ball",
    requested: 4,
    available: 5,
  },
  {
    id: "apples-give-5",
    objectKind: "apple",
    requested: 5,
    available: 6,
  },
  {
    /** Same request as task 2 (3 stars); more objects in the pool */
    id: "stars-give-3-pool-6",
    objectKind: "star",
    requested: 3,
    available: 6,
  },
  {
    id: "balls-give-6",
    objectKind: "ball",
    requested: 6,
    available: 8,
  },
  {
    id: "apples-give-4",
    objectKind: "apple",
    requested: 4,
    available: 8,
  },
  {
    id: "stars-give-7",
    objectKind: "star",
    requested: 7,
    available: 9,
  },
  {
    id: "balls-give-5",
    objectKind: "ball",
    requested: 5,
    available: 10,
  },
  {
    id: "apples-give-8",
    objectKind: "apple",
    requested: 8,
    available: 10,
  },
] as const satisfies readonly HelpAFriendChallenge[];

export type HelpAFriendChallengeId =
  (typeof HELP_A_FRIEND_CHALLENGES)[number]["id"];
