"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { adventureTapScale, adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";
import { childButtonVariants } from "./child-button";
import { AdventureMotion } from "./adventure-motion";
import type { VariantProps } from "class-variance-authority";

type ChildLinkButtonProps = Omit<
  React.ComponentProps<typeof Link>,
  "className"
> &
  VariantProps<typeof childButtonVariants> & {
    className?: string;
    motionTap?: boolean;
  };

function ChildLinkButton({
  className,
  variant,
  size,
  motionTap = true,
  children,
  ...linkProps
}: ChildLinkButtonProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <AdventureMotion
      className="inline-flex max-w-full"
      whileTap={
        motionTap ? { scale: adventureTapScale(reducedMotion) } : undefined
      }
      transition={adventureTransition.fast}
    >
      <Link
        className={cn(
          childButtonVariants({ variant, size }),
          "max-w-full text-center",
          className
        )}
        {...linkProps}
      >
        {children}
      </Link>
    </AdventureMotion>
  );
}

export { ChildLinkButton };
