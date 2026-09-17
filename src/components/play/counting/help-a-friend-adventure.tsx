"use client";

import { useCallback, useState } from "react";
import { HomeAdventureBackdrop } from "@/components/home/home-adventure-backdrop";
import { ChildShell } from "@/components/child";
import { HELP_A_FRIEND_CHALLENGES } from "@/data/counting/help-a-friend/challenges";
import { AdventureCompleteScreen } from "./adventure-complete-screen";
import { AdventureIntroScreen } from "./adventure-intro-screen";
import { HelpAFriendChallengeView } from "./help-a-friend-challenge-view";
import { PlayBackHomeButton } from "@/components/play/play-back-home-button";

type PlayPhase = "intro" | "challenge" | "complete";

type HelpAFriendAdventureProps = {
  onExitToPicker: () => void;
};

function HelpAFriendAdventure({ onExitToPicker }: HelpAFriendAdventureProps) {
  const [phase, setPhase] = useState<PlayPhase>("intro");
  const [challengeIndex, setChallengeIndex] = useState(0);

  const handleChallengeComplete = useCallback(() => {
    if (challengeIndex >= HELP_A_FRIEND_CHALLENGES.length - 1) {
      setPhase("complete");
      return;
    }
    setChallengeIndex((index) => index + 1);
  }, [challengeIndex]);

  if (phase === "intro") {
    return (
      <AdventureIntroScreen
        onStart={() => setPhase("challenge")}
        title="Help a Friend"
        description="Give your friend what they ask for."
      />
    );
  }

  if (phase === "complete") {
    return <AdventureCompleteScreen onPlayAgain={onExitToPicker} />;
  }

  const challenge = HELP_A_FRIEND_CHALLENGES[challengeIndex];

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
        <HelpAFriendChallengeView
          key={challenge.id}
          challenge={challenge}
          challengeIndex={challengeIndex}
          totalChallenges={HELP_A_FRIEND_CHALLENGES.length}
          onComplete={handleChallengeComplete}
        />
      </div>
    </ChildShell>
  );
}

export { HelpAFriendAdventure };
