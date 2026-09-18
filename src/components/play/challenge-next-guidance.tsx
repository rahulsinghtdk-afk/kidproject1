"use client";

import { ChallengeNextSignpost } from "./challenge-next-signpost";

type ChallengeNextGuidanceProps = {
  onNext: () => void;
};

function ChallengeNextGuidance({ onNext }: ChallengeNextGuidanceProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4">
      <div className="pointer-events-auto">
        <ChallengeNextSignpost onNext={onNext} />
      </div>
    </div>
  );
}

export { ChallengeNextGuidance };
