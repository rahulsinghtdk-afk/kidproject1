"use client";

import { useCallback, useEffect, useState } from "react";
import { ChildText } from "@/components/child";
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
import { WalkThroughWeekStorybookDayBanner } from "./walk-through-week-storybook-day-banner";

type WalkThroughWeekLearningViewProps = {
  currentWeekdayId: WeekdayId;
  className?: string;
  /** Presentation-only: toggles generic backdrop while Monday school scene is visible. */
  onMondaySchoolSceneVisibleChange?: (visible: boolean) => void;
};

type WalkThroughWeekTodayNavProps = {
  currentWeekdayId: WeekdayId;
  className?: string;
  /** Sky overlay on illustrated world — improves contrast on environment art. */
  onIllustratedWorld?: boolean;
};

function WalkThroughWeekTodayNav({
  currentWeekdayId,
  className,
  onIllustratedWorld = false,
}: WalkThroughWeekTodayNavProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-lg flex-col items-center gap-1.5 landscape:gap-1",
        onIllustratedWorld && "[&_.adventure-wtw-today-label]:drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]",
        className
      )}
    >
      <ChildText
        size="label"
        className="adventure-wtw-today-label tracking-wide uppercase"
      >
        Today
      </ChildText>

      <ol
        className="flex w-full flex-wrap items-end justify-center gap-1.5 sm:gap-2.5"
        aria-label="Days of the week"
      >
        {WEEKDAY_DISPLAY_ORDER.map((weekdayId) => {
          const day = DEFAULT_WEEK_EVENTS[weekdayId];
          const isTodayMarker = weekdayId === currentWeekdayId;
          return (
            <li key={weekdayId} className="flex flex-col items-center gap-0.5">
              <span
                className={cn(
                  "font-[family-name:var(--font-adventure)] text-[length:var(--adventure-text-xs)] font-medium uppercase leading-none",
                  onIllustratedWorld && "drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]",
                  isTodayMarker
                    ? "text-adventure-text"
                    : "text-adventure-text-muted/80"
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
    </div>
  );
}

function WalkThroughWeekLearningView({
  currentWeekdayId,
  className,
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
  /** Mon–Thu share the locked School environment artwork (see world rules §16). */
  const showMondaySchoolScene = activeDay.eventId === "school";
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

  const bannerInteraction = canTapToAdvance ? "ready" : "locked";

  const dayCardButton = (
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
        "min-h-[var(--adventure-touch-min)] touch-manipulation text-left",
        "adventure-wtw-world-banner-tap w-[min(94%,26rem)] max-w-[26rem] p-0",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-adventure-orange/35",
        !isDayCardTapEnabled && "pointer-events-none cursor-default"
      )}
      aria-label={cardAriaLabel}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${activeWeekdayId}-${walkStep}-story`}
          className="w-full"
          initial={
            reducedMotion ? false : adventureMotionVariants.fadeIn.initial
          }
          animate={adventureMotionVariants.fadeIn.animate}
          exit={
            reducedMotion ? undefined : adventureMotionVariants.fadeIn.exit
          }
          transition={adventureTransition.normal}
        >
          <WalkThroughWeekStorybookDayBanner
            inWorld={showMondaySchoolScene}
            interaction={bannerInteraction}
            weekdayId={activeWeekdayId}
          />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );

  if (showMondaySchoolScene) {
    return (
      <motion.div
        className={cn(
          "relative min-h-dvh w-full overflow-hidden",
          className
        )}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={adventureTransition.slow}
      >
        <WalkThroughWeekMondaySchoolScene fillViewport />

        <div
          className="pointer-events-none absolute inset-0 z-[35] flex flex-col"
          style={{
            paddingTop: "max(0.65rem, env(safe-area-inset-top))",
          }}
        >
          <div
            className="flex w-full flex-col items-center gap-0.5 px-[max(3.75rem,env(safe-area-inset-left)+3rem)]"
            style={{
              paddingRight: "max(3.75rem, env(safe-area-inset-right) + 3rem)",
            }}
          >
            <WalkThroughWeekTodayNav
              currentWeekdayId={currentWeekdayId}
              onIllustratedWorld
              className="max-w-none"
            />

            {isTomorrowTeachingStep ? (
              <div
                className="mt-0.5 flex w-full max-w-md flex-col items-center gap-0.5 text-center"
                aria-live="polite"
              >
                <ChildText
                  size="label"
                  className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)] tracking-wide uppercase"
                >
                  Today → {realTodayDay.displayName}
                </ChildText>
                <ChildText
                  size="label"
                  className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)] tracking-wide text-adventure-orange uppercase"
                >
                  Tomorrow → {activeDay.displayName}
                </ChildText>
              </div>
            ) : null}
          </div>

          <div
            className="pointer-events-auto mt-1.5 flex w-full justify-center px-3 sm:mt-2"
          >
            {dayCardButton}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(
        "flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-8 py-4",
        className
      )}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={adventureTransition.slow}
    >
      <div className="flex w-full max-w-lg shrink-0 flex-col items-center gap-6">
        <WalkThroughWeekTodayNav currentWeekdayId={currentWeekdayId} />

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

        {dayCardButton}
      </div>
    </motion.div>
  );
}

export { WalkThroughWeekLearningView };
