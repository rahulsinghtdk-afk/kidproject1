import type { CountingObjectKind } from "@/data/counting/object-kinds";

export type HelpAFriendChallenge = {
  id: string;
  objectKind: CountingObjectKind;
  /** How many objects the character wants */
  requested: number;
  /** Objects shown in the play area (always greater than `requested`) */
  available: number;
};

export const HELP_A_FRIEND_CHALLENGES: HelpAFriendChallenge[] = [
  {
    id: "apples-give-2",
    objectKind: "apple",
    requested: 2,
    available: 3,
  },
  {
    id: "stars-give-4",
    objectKind: "star",
    requested: 4,
    available: 6,
  },
  {
    id: "balls-give-3",
    objectKind: "ball",
    requested: 3,
    available: 5,
  },
];
