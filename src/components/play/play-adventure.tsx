"use client";

import { useCallback, useState } from "react";
import { HomeAdventureBackdrop } from "@/components/home/home-adventure-backdrop";
import { ChildShell } from "@/components/child";
import { COUNTING_PROTOTYPE_CHALLENGES } from "@/data/counting-prototype-challenges";
import { AdventureCompleteScreen } from "./counting/adventure-complete-screen";
import { AdventureIntroScreen } from "./counting/adventure-intro-screen";
import { CountingChallengeView } from "./counting/counting-challenge-view";
import { PlayBackHomeButton } from "./play-back-home-button";

type PlayPhase = "intro" | "challenge" | "complete";

function PlayAdventure() {
  const [phase, setPhase] = useState<PlayPhase>("intro");
  const [challengeIndex, setChallengeIndex] = useState(0);

  const handleChallengeComplete = useCallback(() => {
    if (challengeIndex >= COUNTING_PROTOTYPE_CHALLENGES.length - 1) {
      setPhase("complete");
      return;
    }
    setChallengeIndex((index) => index + 1);
  }, [challengeIndex]);

  if (phase === "intro") {
    return <AdventureIntroScreen onStart={() => setPhase("challenge")} />;
  }

  if (phase === "complete") {
    return <AdventureCompleteScreen />;
  }

  const challenge = COUNTING_PROTOTYPE_CHALLENGES[challengeIndex];

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
        <CountingChallengeView
          key={challenge.id}
          challenge={challenge}
          challengeIndex={challengeIndex}
          totalChallenges={COUNTING_PROTOTYPE_CHALLENGES.length}
          onComplete={handleChallengeComplete}
        />
      </div>
    </ChildShell>
  );
}

export { PlayAdventure };
