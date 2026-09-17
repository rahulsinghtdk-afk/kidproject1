"use client";

import { HomeAdventureBackdrop } from "@/components/home/home-adventure-backdrop";
import { HomeCharacter } from "@/components/home/home-character";
import {
  ChildButton,
  ChildCard,
  ChildHeading,
  ChildLinkButton,
  ChildShell,
} from "@/components/child";
import { motion, useReducedMotion } from "motion/react";
import {
  adventureMotionVariants,
  adventureTransition,
} from "@/lib/motion/adventure-motion";
import { PlayBackHomeButton } from "@/components/play/play-back-home-button";

type AdventureCompleteScreenProps = {
  onPlayAgain?: () => void;
};

function AdventureCompleteScreen({ onPlayAgain }: AdventureCompleteScreenProps) {
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

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-8 landscape:flex-row landscape:gap-10">
        <motion.div
          className="flex w-full max-w-md flex-col items-center gap-6 text-center landscape:max-w-sm"
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={adventureTransition.slow}
        >
          <ChildCard
            variant="elevated"
            padding="roomy"
            className="flex w-full flex-col items-center gap-8"
          >
            <motion.div
              variants={adventureMotionVariants.successPop}
              initial="initial"
              animate={reducedMotion ? undefined : "animate"}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-5xl" aria-hidden>
                ✨
              </span>
              <ChildHeading level={1} as="h1" className="text-balance">
                Adventure Complete!
              </ChildHeading>
            </motion.div>

            <div className="flex w-full flex-col gap-4">
              {onPlayAgain ? (
                <ChildButton
                  variant="orange"
                  size="large"
                  className="w-full"
                  onClick={onPlayAgain}
                >
                  More counting
                </ChildButton>
              ) : null}
              <ChildLinkButton href="/" variant="primary" size="large">
                Back Home
              </ChildLinkButton>
            </div>
          </ChildCard>
        </motion.div>

        <HomeCharacter className="landscape:shrink-0" />
        </div>
      </div>
    </ChildShell>
  );
}

export { AdventureCompleteScreen };
