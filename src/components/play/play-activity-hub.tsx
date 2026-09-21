"use client";

import { HomeAdventureBackdrop } from "@/components/home/home-adventure-backdrop";
import {
  ChildButton,
  ChildCard,
  ChildHeading,
  ChildShell,
  ChildText,
} from "@/components/child";
import { motion, useReducedMotion } from "motion/react";
import { adventureTransition } from "@/lib/motion/adventure-motion";
import { PlayBackHomeButton } from "@/components/play/play-back-home-button";
import { getAudioManager } from "@/lib/audio";

export type PlayActivityId = "counting" | "walkThroughWeek";

type PlayActivityHubProps = {
  onSelect: (activityId: PlayActivityId) => void;
};

const PLAY_ACTIVITIES: {
  id: PlayActivityId;
  title: string;
  subtitle: string;
  emoji: string;
  buttonVariant: "primary" | "orange";
}[] = [
  {
    id: "counting",
    title: "Counting",
    subtitle: "Touch, count, and help a friend.",
    emoji: "🔢",
    buttonVariant: "primary",
  },
  {
    id: "walkThroughWeek",
    title: "Walk Through the Week",
    subtitle: "See what today brings.",
    emoji: "🗓️",
    buttonVariant: "orange",
  },
];

function PlayActivityHub({ onSelect }: PlayActivityHubProps) {
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
            Choose an adventure
          </ChildHeading>

          <div className="flex w-full max-w-md flex-col gap-5">
            {PLAY_ACTIVITIES.map((activity) => (
              <ChildCard
                key={activity.id}
                variant="elevated"
                padding="roomy"
                className="flex flex-col items-center gap-4 text-center"
              >
                <span className="text-5xl" aria-hidden>
                  {activity.emoji}
                </span>
                <ChildHeading level={2} as="h2">
                  {activity.title}
                </ChildHeading>
                <ChildText size="large" className="text-adventure-text-muted">
                  {activity.subtitle}
                </ChildText>
                <ChildButton
                  size="large"
                  variant={activity.buttonVariant}
                  onClick={() => {
                    getAudioManager().unlockFromUserGesture();
                    onSelect(activity.id);
                  }}
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

export { PlayActivityHub };
