"use client";

import { HomeAdventureBackdrop } from "@/components/home/home-adventure-backdrop";
import {
  ChildButton,
  ChildCard,
  ChildHeading,
  ChildShell,
  ChildText,
} from "@/components/child";
import {
  COUNTING_GROUPS,
  type CountingGroupId,
} from "@/data/counting/groups";
import { motion, useReducedMotion } from "motion/react";
import { adventureTransition } from "@/lib/motion/adventure-motion";
import { PlayBackHomeButton } from "@/components/play/play-back-home-button";

type CountingGroupPickerProps = {
  onSelect: (groupId: CountingGroupId) => void;
};

function CountingGroupPicker({ onSelect }: CountingGroupPickerProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <ChildShell
      className="min-h-dvh"
      contentClassName="relative max-w-3xl flex-1 gap-0 p-0"
    >
      <HomeAdventureBackdrop />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-[max(1.25rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pr-[max(1.25rem,env(safe-area-inset-right))]">
        <div className="mb-4 flex w-full justify-start landscape:mb-3">
          <PlayBackHomeButton />
        </div>

        <motion.div
          className="flex min-h-0 flex-1 flex-col items-center justify-center gap-8"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={adventureTransition.slow}
        >
          <ChildHeading level={1} as="h1" className="text-center text-balance">
            Counting
          </ChildHeading>

          <div className="flex w-full max-w-md flex-col gap-5">
            {COUNTING_GROUPS.map((group, index) => (
              <ChildCard
                key={group.id}
                variant="elevated"
                padding="roomy"
                className="flex flex-col items-center gap-4 text-center"
              >
                <span className="text-5xl" aria-hidden>
                  {group.pickerEmoji}
                </span>
                <ChildHeading level={2} as="h2">
                  {group.title}
                </ChildHeading>
                <ChildText
                  size="large"
                  className="text-adventure-text-muted"
                >
                  {group.subtitle}
                </ChildText>
                <ChildButton
                  size="large"
                  variant={index === 0 ? "primary" : "orange"}
                  onClick={() => onSelect(group.id)}
                >
                  Play
                </ChildButton>
              </ChildCard>
            ))}
          </div>
        </motion.div>
      </div>
    </ChildShell>
  );
}

export { CountingGroupPicker };
