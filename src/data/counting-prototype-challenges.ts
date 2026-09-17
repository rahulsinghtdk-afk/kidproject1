/**
 * @deprecated Import from `@/data/counting/*` instead.
 * Re-exports preserve older import paths during the counting module split.
 */
export {
  COUNTING_OBJECT_EMOJI,
  COUNTING_OBJECT_LABEL,
  touchEachPrompt,
  type CountingObjectKind,
} from "@/data/counting/object-kinds";

export {
  COUNT_AND_CHOOSE_CHALLENGES as COUNTING_PROTOTYPE_CHALLENGES,
  type CountAndChooseChallenge as CountingPrototypeChallenge,
} from "@/data/counting/count-and-choose/challenges";
