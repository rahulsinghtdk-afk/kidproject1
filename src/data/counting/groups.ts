export const COUNTING_GROUP_IDS = {
  countAndChoose: "count-and-choose",
  helpAFriend: "help-a-friend",
} as const;

export type CountingGroupId =
  (typeof COUNTING_GROUP_IDS)[keyof typeof COUNTING_GROUP_IDS];

export type CountingGroupMeta = {
  id: CountingGroupId;
  /** Child-facing title */
  title: string;
  /** Short subtitle for the picker */
  subtitle: string;
  pickerEmoji: string;
};

export const COUNTING_GROUPS: CountingGroupMeta[] = [
  {
    id: COUNTING_GROUP_IDS.countAndChoose,
    title: "Count & Choose",
    subtitle: "Touch and count",
    pickerEmoji: "🔢",
  },
  {
    id: COUNTING_GROUP_IDS.helpAFriend,
    title: "Help a Friend",
    subtitle: "Give what they need",
    pickerEmoji: "🤝",
  },
];

export function getCountingGroup(
  id: CountingGroupId
): CountingGroupMeta | undefined {
  return COUNTING_GROUPS.find((group) => group.id === id);
}
