"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "motion/react";
import { adventureTapScale, adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

const childButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2",
    "font-[family-name:var(--font-adventure)] font-semibold",
    "text-adventure-text",
    "border-2 border-adventure-border",
    "rounded-[var(--adventure-radius-xl)]",
    "shadow-[var(--adventure-shadow-sm)]",
    "select-none whitespace-nowrap",
    "transition-[box-shadow,background-color,border-color]",
    "duration-[var(--adventure-duration-normal)]",
    "outline-none",
    "focus-visible:outline-[3px] focus-visible:outline-[var(--adventure-focus-ring)] focus-visible:outline-offset-[var(--adventure-focus-offset)]",
    "disabled:pointer-events-none disabled:opacity-45",
    "min-h-[var(--adventure-touch-min)] min-w-[var(--adventure-touch-min)]",
    "px-6 text-[length:var(--adventure-text-lg)]",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-adventure-primary border-[color-mix(in_srgb,var(--adventure-primary)_70%,var(--adventure-border))] hover:shadow-[var(--adventure-shadow-md)] active:shadow-[var(--adventure-shadow-press)]",
        secondary:
          "bg-adventure-secondary border-[color-mix(in_srgb,var(--adventure-secondary)_70%,var(--adventure-border))] hover:shadow-[var(--adventure-shadow-md)] active:shadow-[var(--adventure-shadow-press)]",
        green:
          "bg-adventure-green border-[color-mix(in_srgb,var(--adventure-green)_70%,var(--adventure-border))] hover:shadow-[var(--adventure-shadow-md)] active:shadow-[var(--adventure-shadow-press)]",
        orange:
          "bg-adventure-orange border-[color-mix(in_srgb,var(--adventure-orange)_70%,var(--adventure-border))] hover:shadow-[var(--adventure-shadow-md)] active:shadow-[var(--adventure-shadow-press)]",
        surface:
          "bg-adventure-surface hover:bg-adventure-surface-elevated active:shadow-[var(--adventure-shadow-press)]",
        success:
          "bg-[color-mix(in_srgb,var(--adventure-success)_35%,var(--adventure-surface))] border-adventure-success shadow-[0_0_0_2px_color-mix(in_srgb,var(--adventure-success)_25%,transparent)]",
      },
      size: {
        default: "h-[var(--adventure-touch-min)] px-8",
        large:
          "h-[72px] min-h-[72px] min-w-[72px] px-10 text-[length:var(--adventure-text-xl)] rounded-[var(--adventure-radius-2xl)]",
        icon: "size-[var(--adventure-touch-min)] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ChildButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof childButtonVariants> & {
    motionTap?: boolean;
  };

function ChildButton({
  className,
  variant,
  size,
  motionTap = true,
  ...props
}: ChildButtonProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className="inline-flex"
      whileTap={
        motionTap && !props.disabled
          ? { scale: adventureTapScale(reducedMotion) }
          : undefined
      }
      transition={adventureTransition.fast}
    >
      <ButtonPrimitive
        data-slot="child-button"
        className={cn(childButtonVariants({ variant, size, className }))}
        {...props}
      />
    </motion.div>
  );
}

export { ChildButton, childButtonVariants };
