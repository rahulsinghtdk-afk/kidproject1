import { Map } from "lucide-react";
import {
  ChildCard,
  ChildHeading,
  ChildLinkButton,
  ChildShell,
  ChildText,
} from "@/components/child";

function PlayPlaceholder() {
  return (
    <ChildShell
      contentClassName="items-center justify-center gap-8"
      footer={
        <div className="mx-auto flex w-full max-w-xl justify-start">
          <ChildLinkButton href="/" variant="surface" size="default">
            Home
          </ChildLinkButton>
        </div>
      }
    >
      <ChildCard
        variant="elevated"
        padding="roomy"
        className="flex w-full max-w-md flex-col items-center gap-6 text-center"
      >
        <div
          className="adventure-float flex size-24 items-center justify-center rounded-[var(--adventure-radius-xl)] bg-adventure-green"
          aria-hidden
        >
          <Map
            className="size-12 text-adventure-text"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>
        <ChildHeading level={2} as="h2">
          Adventure ahead
        </ChildHeading>
        <ChildText size="large" className="text-balance text-adventure-text-muted">
          Fun games and surprises are on the way. Check back soon!
        </ChildText>
      </ChildCard>
    </ChildShell>
  );
}

export { PlayPlaceholder };
