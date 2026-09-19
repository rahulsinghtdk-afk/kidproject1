"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { adventureTransition } from "@/lib/motion/adventure-motion";
import { cn } from "@/lib/utils";

const BEAM_TILT_DEG = 11;

/** Arrow plaque pointing left (NO — left side). */
const LEFT_ARROW_PLAQUE =
  "M 148 14 H 52 Q 34 14 22 28 L 4 52 L 22 76 Q 34 90 52 90 H 148 Q 168 90 168 68 V 36 Q 168 14 148 14 Z";

const LEFT_ARROW_FACE =
  "M 140 22 H 56 Q 42 22 32 32 L 18 52 L 32 72 Q 42 82 56 82 H 140 Q 154 82 154 68 V 36 Q 154 22 140 22 Z";

/** Arrow plaque pointing right (YES — right side). */
const RIGHT_ARROW_PLAQUE =
  "M 20 14 H 116 Q 134 14 146 28 L 164 52 L 146 76 Q 134 90 116 90 H 20 Q 0 90 0 68 V 36 Q 0 14 20 14 Z";

const RIGHT_ARROW_FACE =
  "M 28 22 H 112 Q 126 22 136 32 L 150 52 L 136 72 Q 126 82 112 82 H 28 Q 14 82 14 68 V 36 Q 14 22 28 22 Z";

type WantMoreBalanceSignpostProps = {
  disabled: boolean;
  onChooseYes: () => void;
  onChooseNo: () => void;
  className?: string;
};

function WantMoreBalanceSignpost({
  disabled,
  onChooseYes,
  onChooseNo,
  className,
}: WantMoreBalanceSignpostProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [tilt, setTilt] = useState<"level" | "yes" | "no">("level");

  /** YES is on the right — right up = clockwise. NO is on the left. */
  const beamRotate =
    tilt === "yes" ? BEAM_TILT_DEG : tilt === "no" ? -BEAM_TILT_DEG : 0;

  const resetTilt = useCallback(() => {
    if (!disabled) {
      setTilt("level");
    }
  }, [disabled]);

  const handleYes = useCallback(() => {
    if (disabled) return;
    setTilt("yes");
    onChooseYes();
  }, [disabled, onChooseYes]);

  const handleNo = useCallback(() => {
    if (disabled) return;
    setTilt("no");
    onChooseNo();
  }, [disabled, onChooseNo]);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[min(100%,42rem)] select-none",
        disabled && "pointer-events-none opacity-55",
        className
      )}
      onPointerLeave={resetTilt}
    >
      <svg
        viewBox="0 0 520 268"
        className="h-auto w-full overflow-visible drop-shadow-[0_10px_24px_rgb(55_65_81_/_0.14)]"
        aria-hidden
      >
        <ellipse cx="260" cy="258" rx="98" ry="12" fill="var(--adventure-green)" opacity="0.55" />
        <path
          d="M 220 238 Q 228 210 236 238 M 248 236 Q 260 202 272 236 M 284 238 Q 292 214 300 238"
          fill="none"
          stroke="var(--adventure-green)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <ellipse cx="310" cy="252" rx="9" ry="5" fill="var(--adventure-border-strong)" />

        <rect
          x="238"
          y="72"
          width="44"
          height="182"
          rx="12"
          fill="#c58b55"
          stroke="#8f5a33"
          strokeWidth="3"
        />
        <rect x="244" y="80" width="8" height="166" rx="4" fill="#ddb088" opacity="0.45" />

        <path
          d="M 224 62 Q 260 50 296 62 M 224 72 Q 260 84 296 72"
          fill="none"
          stroke="#d9c4a0"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 232 56 L 288 76 M 288 56 L 232 76"
          fill="none"
          stroke="#c9ae84"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <motion.g
          style={{ transformOrigin: "260px 62px", transformBox: "fill-box" }}
          animate={{ rotate: reducedMotion ? 0 : beamRotate }}
          transition={adventureTransition.normal}
        >
          <path
            d="M 4 48 Q 260 34 516 48 Q 524 50 524 58 Q 524 66 516 68 Q 260 82 4 68 Q -4 66 -4 58 Q -4 50 4 48 Z"
            fill="#c58b55"
            stroke="#8f5a33"
            strokeWidth="3"
          />

          {/* NO — left, arrow points left */}
          <g transform="translate(8, 78)">
            <path
              d="M 72 0 Q 78 0 78 8 L 78 24 Q 78 32 72 32 L 64 32"
              fill="none"
              stroke="#d9c4a0"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 96 0 Q 102 0 102 8 L 102 28 Q 102 36 96 36 L 88 36"
              fill="none"
              stroke="#d9c4a0"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path d={LEFT_ARROW_PLAQUE} fill="#8f5a33" stroke="#6d4528" strokeWidth="2" />
            <path
              d={LEFT_ARROW_FACE}
              fill="#f5b4b4"
              stroke="#6d4528"
              strokeWidth="2"
            />
            <circle cx="34" cy="36" r="3" fill="#c97a7a" />
            <circle cx="34" cy="68" r="3" fill="#c97a7a" />
            <circle cx="132" cy="36" r="3" fill="#c97a7a" />
            <circle cx="132" cy="68" r="3" fill="#c97a7a" />
            <text
              x="84"
              y="62"
              textAnchor="middle"
              className="fill-[#8b3a3a] font-[family-name:var(--font-adventure)] text-[34px] font-bold"
            >
              NO
            </text>
          </g>

          {/* YES — right, arrow points right */}
          <g transform="translate(344, 78)">
            <path
              d="M 72 0 Q 78 0 78 8 L 78 24 Q 78 32 72 32 L 64 32"
              fill="none"
              stroke="#d9c4a0"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 96 0 Q 102 0 102 8 L 102 28 Q 102 36 96 36 L 88 36"
              fill="none"
              stroke="#d9c4a0"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path d={RIGHT_ARROW_PLAQUE} fill="#8f5a33" stroke="#6d4528" strokeWidth="2" />
            <path
              d={RIGHT_ARROW_FACE}
              fill="var(--adventure-green)"
              stroke="#6d4528"
              strokeWidth="2"
            />
            <circle cx="26" cy="36" r="3" fill="#5a9a5a" />
            <circle cx="26" cy="68" r="3" fill="#5a9a5a" />
            <circle cx="124" cy="36" r="3" fill="#5a9a5a" />
            <circle cx="124" cy="68" r="3" fill="#5a9a5a" />
            <text
              x="72"
              y="62"
              textAnchor="middle"
              className="fill-[#2f5c3a] font-[family-name:var(--font-adventure)] text-[34px] font-bold"
            >
              YES
            </text>
          </g>
        </motion.g>
      </svg>

      <button
        type="button"
        disabled={disabled}
        aria-label="No"
        onPointerEnter={() => !disabled && setTilt("no")}
        onPointerDown={() => !disabled && setTilt("no")}
        onClick={handleNo}
        className={cn(
          "absolute left-[1%] top-[36%] h-[34%] w-[46%] rounded-[1.25rem] border-0 bg-transparent",
          "outline-none focus-visible:outline-[3px] focus-visible:outline-[var(--adventure-focus-ring)] focus-visible:outline-offset-[var(--adventure-focus-offset)]"
        )}
      />
      <button
        type="button"
        disabled={disabled}
        aria-label="Yes"
        onPointerEnter={() => !disabled && setTilt("yes")}
        onPointerDown={() => !disabled && setTilt("yes")}
        onClick={handleYes}
        className={cn(
          "absolute right-[1%] top-[36%] h-[34%] w-[46%] rounded-[1.25rem] border-0 bg-transparent",
          "outline-none focus-visible:outline-[3px] focus-visible:outline-[var(--adventure-focus-ring)] focus-visible:outline-offset-[var(--adventure-focus-offset)]"
        )}
      />
    </div>
  );
}

export { WantMoreBalanceSignpost };
