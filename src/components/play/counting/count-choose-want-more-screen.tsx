"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChildHeading, ChildShell } from "@/components/child";
import { HomeAdventureBackdrop } from "@/components/home/home-adventure-backdrop";
import { readChildDisplayName } from "@/data/child-profile";
import { useAudio } from "@/hooks/use-audio";
import { useChallengeInstruction } from "@/hooks/use-challenge-instruction";
import { wantMoreInstruction } from "@/lib/audio";
import { adventureMotionVariants, adventureTransition } from "@/lib/motion/adventure-motion";
import { PlayBackHomeButton } from "@/components/play/play-back-home-button";
import { WantMoreBalanceSignpost } from "./count-choose-want-more-balance-signpost";
import { PlayCompanionCharacter } from "./play-companion-character";
import { PlayProgressIndicator } from "./play-progress-indicator";

type CountChooseWantMoreScreenProps = {
  challengeIndex: number;
  totalChallenges: number;
  onChooseYes: () => void;
  onChooseNo: () => void;
};

function CountChooseWantMoreScreen({
  challengeIndex,
  totalChallenges,
  onChooseYes,
  onChooseNo,
}: CountChooseWantMoreScreenProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const audio = useAudio();
  const [answered, setAnswered] = useState(false);
  const childName = useMemo(() => readChildDisplayName(), []);
  const wellDoneLine = childName ? `Well Done, ${childName}!` : "Well Done!";

  const instruction = useMemo(() => wantMoreInstruction(), []);

  useChallengeInstruction(instruction, { active: !answered });

  const handleYes = useCallback(() => {
    if (answered) return;
    setAnswered(true);
    audio.playInteraction();
    onChooseYes();
  }, [answered, audio, onChooseYes]);

  const handleNo = useCallback(() => {
    if (answered) return;
    setAnswered(true);
    audio.playInteraction();
    onChooseNo();
  }, [answered, audio, onChooseNo]);

  return (
    <ChildShell
      className="min-h-dvh"
      contentClassName="relative max-w-4xl flex-1 gap-0 p-0"
    >
      <HomeAdventureBackdrop />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-[max(1.25rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pr-[max(1.25rem,env(safe-area-inset-right))] landscape:py-[max(1rem,env(safe-area-inset-top))]">
        <div className="mb-4 flex w-full justify-start landscape:mb-3">
          <PlayBackHomeButton />
        </div>

        <motion.div
          className="flex w-full flex-1 flex-col gap-6 landscape:gap-5"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={adventureTransition.normal}
        >
          <PlayProgressIndicator
            total={totalChallenges}
            currentIndex={challengeIndex}
            className="opacity-80"
          />

          <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 landscape:flex-row landscape:items-center landscape:gap-6">
            <motion.div
              className="flex w-full max-w-3xl flex-col items-center gap-4 text-center landscape:flex-1"
              variants={adventureMotionVariants.successPop}
              initial="initial"
              animate={reducedMotion ? undefined : "animate"}
            >
              <div className="flex flex-col gap-2">
                <ChildHeading level={1} as="h1" className="text-balance">
                  {wellDoneLine}
                </ChildHeading>
                <ChildHeading level={2} as="h2" className="text-balance">
                  Do you want more?
                </ChildHeading>
              </div>

              <WantMoreBalanceSignpost
                className="w-full flex-1"
                disabled={answered}
                onChooseYes={handleYes}
                onChooseNo={handleNo}
              />
            </motion.div>

            <PlayCompanionCharacter
              mood="encouraging"
              className="shrink-0 landscape:max-w-[7rem]"
            />
          </div>
        </motion.div>
      </div>
    </ChildShell>
  );
}

export { CountChooseWantMoreScreen };
