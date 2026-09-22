"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChildCard,
  ChildHeading,
  ChildText,
} from "@/components/child";
import {
  DEFAULT_WEEK_EVENTS,
  WEEKDAY_DISPLAY_ORDER,
  getWeekdayEventDefaults,
  type WeekdayId,
} from "@/data/walk-through-week/default-week-events";
import { useWalkThroughWeekLearningInstruction } from "@/hooks/use-walk-through-week-learning-instruction";
import { useAudio } from "@/hooks/use-audio";
import {
  canAdvanceWalk,
  getNextWeekdayInWalkOrder,
  isWalkCycleComplete,
} from "@/lib/walk-through-week/week-walk-navigation";
import {
  adventureMotionVariants,
  adventureTapScale,
  adventureTransition,
} from "@/lib/motion/adventure-motion";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { WalkThroughWeekMondaySchoolScene } from "./walk-through-week-monday-school-scene";

type WalkThroughWeekLearningViewProps = {
  currentWeekdayId: WeekdayId;
  /** Presentation-only: toggles generic backdrop while Monday school scene is visible. */
  onMondaySchoolSceneVisibleChange?: (visible: boolean) => void;
};

function WalkThroughWeekLearningView({
  currentWeekdayId,
  onMondaySchoolSceneVisibleChange,
}: WalkThroughWeekLearningViewProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const audio = useAudio();
  const [tapPulse, setTapPulse] = useState(0);
  const [activeWeekdayId, setActiveWeekdayId] =
    useState<WeekdayId>(currentWeekdayId);
  const [walkStep, setWalkStep] = useState(0);

  const { isDayCardTapEnabled } = useWalkThroughWeekLearningInstruction({
    realTodayWeekdayId: currentWeekdayId,
    activeWeekdayId,
    walkStep,
  });

  const realTodayDay = getWeekdayEventDefaults(currentWeekdayId);
  const activeDay = getWeekdayEventDefaults(activeWeekdayId);
  const showMondaySchoolScene =
    activeWeekdayId === "monday" && activeDay.eventId === "school";
  const isTomorrowTeachingStep = walkStep === 1;
  const cycleComplete = isWalkCycleComplete(walkStep);
  const isOpeningToday =
    walkStep === 0 && activeWeekdayId === currentWeekdayId;
  const canTapToAdvance = canAdvanceWalk(walkStep) && isDayCardTapEnabled;

  useEffect(() => {
    onMondaySchoolSceneVisibleChange?.(showMondaySchoolScene);
  }, [onMondaySchoolSceneVisibleChange, showMondaySchoolScene]);

  const handleDayCardTap = useCallback(() => {
    if (!isDayCardTapEnabled) {
      return;
    }

    audio.playInteraction();
    setTapPulse((count) => count + 1);

    if (!canAdvanceWalk(walkStep)) {
      return;
    }

    setActiveWeekdayId(getNextWeekdayInWalkOrder(activeWeekdayId));
    setWalkStep((step) => step + 1);
  }, [activeWeekdayId, audio, isDayCardTapEnabled, walkStep]);

  const cardAriaLabel = (() => {
    if (isTomorrowTeachingStep) {
      return isDayCardTapEnabled
        ? `Tomorrow is ${activeDay.displayName}. Tap to move forward.`
        : `Listen first. Tomorrow is ${activeDay.displayName}.`;
    }
    if (!isDayCardTapEnabled) {
      return `Listen first. ${activeDay.displayName}. ${activeDay.eventName}.`;
    }
    if (isOpeningToday || (cycleComplete && activeWeekdayId === currentWeekdayId)) {
      return `Today is ${activeDay.displayName}. ${activeDay.eventName}. Tap to move forward.`;
    }
    return `This is ${activeDay.displayName}. ${activeDay.eventName}. Tap to move forward.`;
  })();

  return (
    <motion.div
      className={cn(
        "flex min-h-0 w-full flex-1 flex-col items-center",
        showMondaySchoolScene
          ? "justify-between gap-3 py-1 pb-3 landscape:gap-2 landscape:py-0 landscape:pb-2"
          : "justify-center gap-8 py-4"
      )}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={adventureTransition.slow}
    >
      {showMondaySchoolScene ? (
        <div
          className={cn(
            "flex min-h-[min(42dvh,21rem)] min-w-0 flex-1 flex-col",
            "max-h-[min(54dvh,28rem)] landscape:min-h-[min(30dvh,13rem)] landscape:max-h-[min(42dvh,17rem)]",
            "-mx-[max(1.25rem,env(safe-area-inset-left))] w-[calc(100%+max(1.25rem,env(safe-area-inset-left))+max(1.25rem,env(safe-area-inset-right)))]"
          )}
        >
          <WalkThroughWeekMondaySchoolScene className="min-h-0 flex-1" />
        </div>
      ) : null}

      <div
        className={cn(
          "flex w-full max-w-lg flex-col items-center gap-6",
          showMondaySchoolScene && "shrink-0"
        )}
      >
        <ChildText size="label" className="tracking-wide uppercase">
          Today
        </ChildText>

        <ol
          className="flex w-full flex-wrap items-end justify-center gap-2 sm:gap-3"
          aria-label="Days of the week"
        >
          {WEEKDAY_DISPLAY_ORDER.map((weekdayId) => {
            const day = DEFAULT_WEEK_EVENTS[weekdayId];
            const isTodayMarker = weekdayId === currentWeekdayId;
            return (
              <li key={weekdayId} className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    "font-[family-name:var(--font-adventure)] text-[length:var(--adventure-text-xs)] font-medium uppercase leading-none",
                    isTodayMarker
                      ? "text-adventure-text"
                      : "text-adventure-text-muted/70"
                  )}
                >
                  {day.displayName.slice(0, 3)}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "rounded-full transition-[width,height,background-color]",
                    isTodayMarker
                      ? "size-4 bg-adventure-orange shadow-[var(--adventure-shadow-sm)]"
                      : "size-2.5 bg-adventure-border/80"
                  )}
                />
              </li>
            );
          })}
        </ol>

        {isTomorrowTeachingStep ? (
          <div
            className="flex w-full max-w-md flex-col items-center gap-2 text-center"
            aria-live="polite"
          >
            <ChildText size="label" className="tracking-wide uppercase">
              Today → {realTodayDay.displayName}
            </ChildText>
            <ChildText
              size="label"
              className="tracking-wide text-adventure-orange uppercase"
            >
              Tomorrow → {activeDay.displayName}
            </ChildText>
          </div>
        ) : null}

        <motion.button
          type="button"
          onClick={handleDayCardTap}
          whileTap={
            canTapToAdvance && !reducedMotion
              ? { scale: adventureTapScale(reducedMotion) }
              : undefined
          }
          animate={
            tapPulse > 0 && !reducedMotion && canTapToAdvance
              ? adventureMotionVariants.successPop.animate
              : { scale: 1 }
          }
          key={tapPulse > 0 ? `tap-${tapPulse}` : "rest"}
          aria-disabled={!isDayCardTapEnabled}
          aria-busy={!isDayCardTapEnabled}
          className={cn(
            "w-full max-w-md rounded-[var(--adventure-radius-xl)] text-left",
            "min-h-[var(--adventure-touch-min)] touch-manipulation",
            "border-[3px] border-solid bg-transparent p-0",
            "transition-[border-color,box-shadow] duration-[var(--adventure-duration-normal)]",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-adventure-orange/40",
            !isDayCardTapEnabled && "cursor-default",
            isDayCardTapEnabled
              ? "adventure-wtw-card-voice-ready"
              : "adventure-wtw-card-voice-waiting"
          )}
          aria-label={cardAriaLabel}
        >
          <ChildCard
            variant="flat"
            padding="roomy"
            className="flex w-full flex-col items-center gap-4 border-0 bg-adventure-surface text-center shadow-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeWeekdayId}-${walkStep}`}
                className="flex w-full flex-col items-center gap-4 text-center"
                initial={
                  reducedMotion
                    ? false
                    : adventureMotionVariants.fadeIn.initial
                }
                animate={adventureMotionVariants.fadeIn.animate}
                exit={
                  reducedMotion ? undefined : adventureMotionVariants.fadeIn.exit
                }
                transition={adventureTransition.normal}
              >
                {isTomorrowTeachingStep ? (
                  <ChildText
                    size="label"
                    className="rounded-full bg-adventure-orange/15 px-4 py-1 tracking-wide text-adventure-orange uppercase"
                  >
                    Tomorrow
                  </ChildText>
                ) : null}
                <ChildHeading
                  level={1}
                  as="h2"
                  className="uppercase tracking-wide"
                >
                  {activeDay.displayName}
                </ChildHeading>
                <span className="text-6xl leading-none" aria-hidden>
                  {activeDay.eventEmoji}
                </span>
                <ChildHeading level={2} as="h3">
                  {activeDay.eventName}
                </ChildHeading>
              </motion.div>
            </AnimatePresence>
          </ChildCard>
        </motion.button>
      </div>
    </motion.div>
  );
}

export { WalkThroughWeekLearningView };
