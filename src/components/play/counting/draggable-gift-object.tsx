"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { pointInExpandedRect } from "@/lib/counting/hit-target";
import type { ObjectLayoutPoint } from "@/lib/counting/object-layouts";
import { cn } from "@/lib/utils";

const TAP_MOVE_THRESHOLD_PX = 14;

type DraggableGiftObjectProps = {
  emoji: string;
  index: number;
  layout: ObjectLayoutPoint;
  disabled: boolean;
  dropTargetRef: React.RefObject<HTMLElement | null>;
  onDeliver: (index: number) => boolean;
  onRejectDelivery: () => void;
};

function DraggableGiftObject({
  emoji,
  index,
  layout,
  disabled,
  dropTargetRef,
  onDeliver,
  onRejectDelivery,
}: DraggableGiftObjectProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const nodeRef = useRef<HTMLButtonElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const resetDrag = useCallback(() => {
    setDragging(false);
    setDragOffset({ x: 0, y: 0 });
    pointerStart.current = null;
  }, []);

  const tryDeliverAt = useCallback(
    (clientX: number, clientY: number, wasTap: boolean) => {
      const target = dropTargetRef.current;
      if (!target) {
        resetDrag();
        return;
      }
      const rect = target.getBoundingClientRect();
      const overTarget = pointInExpandedRect(clientX, clientY, rect, 24);

      if (!overTarget && !wasTap) {
        resetDrag();
        return;
      }

      if (wasTap || overTarget) {
        const accepted = onDeliver(index);
        if (!accepted) {
          onRejectDelivery();
        }
      }
      resetDrag();
    },
    [dropTargetRef, index, onDeliver, onRejectDelivery, resetDrag]
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStart.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging || disabled) return;
    setDragOffset({
      x: event.clientX - (pointerStart.current?.x ?? event.clientX),
      y: event.clientY - (pointerStart.current?.y ?? event.clientY),
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const start = pointerStart.current;
    const moved =
      start &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) >
        TAP_MOVE_THRESHOLD_PX;
    const wasTap = !moved;
    tryDeliverAt(event.clientX, event.clientY, wasTap);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerCancel = () => {
    resetDrag();
  };

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: layout.left, top: layout.top }}
    >
      <motion.button
        ref={nodeRef}
        type="button"
        disabled={disabled}
        className={cn(
          "relative flex items-center justify-center touch-none",
          "min-h-[var(--adventure-touch-min)] min-w-[var(--adventure-touch-min)]",
          "size-[5.5rem] sm:size-[6.25rem]",
          "rounded-[var(--adventure-radius-full)]",
          "border-[3px] border-adventure-border-strong bg-adventure-surface/90",
          "shadow-[var(--adventure-shadow-md)]",
          "outline-none focus-visible:outline-[3px] focus-visible:outline-[var(--adventure-focus-ring)] focus-visible:outline-offset-[var(--adventure-focus-offset)]",
          dragging &&
            "z-30 border-adventure-primary shadow-[var(--adventure-shadow-lg)]",
          disabled && "pointer-events-none opacity-0"
        )}
        animate={{
          x: dragOffset.x,
          y: dragOffset.y,
          scale: dragging && !reducedMotion ? 1.08 : 1,
        }}
        transition={
          dragging
            ? { duration: 0 }
            : { type: "spring", stiffness: 420, damping: 28 }
        }
        aria-label="Drag to friend"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <span className="pointer-events-none text-[3.5rem] leading-none select-none sm:text-[4rem]">
          {emoji}
        </span>
      </motion.button>
    </div>
  );
}

export { DraggableGiftObject };
