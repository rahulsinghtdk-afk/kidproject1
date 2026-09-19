"use client";

import { useCallback, useState } from "react";
import { HomeAdventureBackdrop } from "@/components/home/home-adventure-backdrop";
import { ChildShell } from "@/components/child";
import { COUNT_AND_CHOOSE_CHALLENGES } from "@/data/counting/count-and-choose/challenges";
import {
  COUNT_AND_CHOOSE_SESSION_CHALLENGE_COUNT,
  countAndChooseChallengeWithQuantity,
  countAndChooseSessionQuantity,
  createCountAndChooseSessionState,
  type CountAndChooseSessionState,
} from "@/lib/counting/count-and-choose-session";
import { AdventureCompleteScreen } from "./adventure-complete-screen";
import { AdventureIntroScreen } from "./adventure-intro-screen";
import { CountChooseWantMoreScreen } from "./count-choose-want-more-screen";
import { CountingChallengeView } from "./counting-challenge-view";
import { PlayBackHomeButton } from "@/components/play/play-back-home-button";

type PlayPhase = "intro" | "challenge" | "want-more" | "complete";

type CountAndChooseAdventureProps = {
  onExitToPicker: () => void;
};

function CountAndChooseAdventure({ onExitToPicker }: CountAndChooseAdventureProps) {
  const [phase, setPhase] = useState<PlayPhase>("intro");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [sessionState, setSessionState] = useState<CountAndChooseSessionState>(
    () => createCountAndChooseSessionState()
  );
  const [hasAskedMoreQuestion, setHasAskedMoreQuestion] = useState(false);

  const sessionChallengeCount = COUNT_AND_CHOOSE_SESSION_CHALLENGE_COUNT;

  const beginSession = useCallback(() => {
    setChallengeIndex(0);
    setHasAskedMoreQuestion(false);
    setSessionState(createCountAndChooseSessionState());
    setPhase("challenge");
  }, []);

  const handleChallengeComplete = useCallback(() => {
    if (challengeIndex >= sessionChallengeCount - 1) {
      setPhase("complete");
      return;
    }
    if (
      !hasAskedMoreQuestion &&
      challengeIndex === sessionState.wantMoreAfterIndex
    ) {
      setPhase("want-more");
      return;
    }
    setChallengeIndex((index) => index + 1);
  }, [
    challengeIndex,
    hasAskedMoreQuestion,
    sessionChallengeCount,
    sessionState.wantMoreAfterIndex,
  ]);

  const handleWantMoreYes = useCallback(() => {
    setHasAskedMoreQuestion(true);
    setChallengeIndex((index) => index + 1);
    setPhase("challenge");
  }, []);

  const handleWantMoreNo = useCallback(() => {
    setHasAskedMoreQuestion(true);
    setPhase("complete");
  }, []);

  if (phase === "intro") {
    return (
      <AdventureIntroScreen
        onStart={beginSession}
        title="Count & Choose"
        description="Touch each one, then pick the number."
      />
    );
  }

  if (phase === "complete") {
    return <AdventureCompleteScreen onPlayAgain={onExitToPicker} />;
  }

  if (phase === "want-more") {
    return (
      <CountChooseWantMoreScreen
        challengeIndex={challengeIndex}
        totalChallenges={sessionChallengeCount}
        onChooseYes={handleWantMoreYes}
        onChooseNo={handleWantMoreNo}
      />
    );
  }

  const challengeTemplate = COUNT_AND_CHOOSE_CHALLENGES[challengeIndex];
  const sessionQuantity = countAndChooseSessionQuantity(
    sessionState,
    challengeIndex
  );
  const challenge =
    sessionQuantity === undefined
      ? challengeTemplate
      : countAndChooseChallengeWithQuantity(challengeTemplate, sessionQuantity);

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
          totalChallenges={sessionChallengeCount}
          isLastChallenge={challengeIndex >= sessionChallengeCount - 1}
          onComplete={handleChallengeComplete}
        />
      </div>
    </ChildShell>
  );
}

export { CountAndChooseAdventure };
