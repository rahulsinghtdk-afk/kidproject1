"use client";

import { ChildAudioToggle } from "@/components/child/child-audio-toggle";

type PlayChildAudioOverlayProps = {
  children: React.ReactNode;
};

/**
 * Fixed top-right audio toggle for all /play child surfaces (hub, games, completion).
 * Does not alter game layout or logic.
 */
function PlayChildAudioOverlay({ children }: PlayChildAudioOverlayProps) {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-end"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingRight: "max(1.25rem, env(safe-area-inset-right))",
        }}
      >
        <div className="pointer-events-auto">
          <ChildAudioToggle />
        </div>
      </div>
      {children}
    </>
  );
}

export { PlayChildAudioOverlay };
