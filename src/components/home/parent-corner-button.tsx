"use client";

import { Lock } from "lucide-react";
import { ChildLinkButton } from "@/components/child";

type ParentCornerButtonProps = {
  className?: string;
};

function ParentCornerButton({ className }: ParentCornerButtonProps) {
  return (
    <ChildLinkButton
      href="/parent"
      variant="surface"
      size="default"
      className={className}
    >
      <Lock className="size-5 shrink-0 opacity-80" strokeWidth={2} aria-hidden />
      <span className="text-[length:var(--adventure-text-sm)] font-medium text-adventure-text-muted">
        Parent
      </span>
    </ChildLinkButton>
  );
}

export { ParentCornerButton };
