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
import { isWalkThroughWeekIllustratedWorldEvent } from "@/lib/walk-through-week/walk-through-week-illustrated-world";
import { walkThroughWeekTapForwardArtworkForEvent } from "@/lib/walk-through-week/walk-through-week-tap-forward-artwork";
import {
  adventureMotionVariants,
  adventureTransition,
} from "@/lib/motion/adventure-motion";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { WalkThroughWeekFridayChaiShopScene } from "./walk-through-week-friday-chai-shop-scene";
import { WalkThroughWeekMondaySchoolScene } from "./walk-through-week-monday-school-scene";
import { WalkThroughWeekSaturdayTempleScene } from "./walk-through-week-saturday-temple-scene";
import { isWalkThroughWeekStorybookBannerOverlayEnabled } from "./walk-through-week-finished-banner-artwork";
import { WalkThroughWeekStorybookDayBanner } from "./walk-through-week-storybook-day-banner";
import { WalkThroughWeekTapToMoveForwardSign } from "./walk-through-week-tap-to-move-forward-sign";

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
  const [activeWeekdayId, setActiveWeekdayId] =
    useState<WeekdayId>(currentWeekdayId);
  const [walkStep, setWalkStep] = useState(0);

  const { isDayCardTapEnabled, isTapForwardSignVisible } =
    useWalkThroughWeekLearningInstruction({
      realTodayWeekdayId: currentWeekdayId,
      activeWeekdayId,
      walkStep,
    });

  const realTodayDay = getWeekdayEventDefaults(currentWeekdayId);
  const activeDay = getWeekdayEventDefaults(activeWeekdayId);
  const showIllustratedWorld = isWalkThroughWeekIllustratedWorldEvent(
    activeDay.eventId
  );
  const isSchoolIllustratedWorld = activeDay.eventId === "school";
  const isChaiShopIllustratedWorld = activeDay.eventId === "chaiShop";
  const isTempleIllustratedWorld = activeDay.eventId === "temple";
  const isTomorrowTeachingStep = walkStep === 1;
  const cycleComplete = isWalkCycleComplete(walkStep);
  const isOpeningToday =
    walkStep === 0 && activeWeekdayId === currentWeekdayId;
  const canTapToAdvance = canAdvanceWalk(walkStep) && isDayCardTapEnabled;

  useEffect(() => {
    onMondaySchoolSceneVisibleChange?.(showIllustratedWorld);
  }, [onMondaySchoolSceneVisibleChange, showIllustratedWorld]);

  const handleWalkForwardTap = useCallback(() => {
    if (!isDayCardTapEnabled) {
      return;
    }

    audio.playInteraction();

    if (!canAdvanceWalk(walkStep)) {
      return;
    }

    setActiveWeekdayId(getNextWeekdayInWalkOrder(activeWeekdayId));
    setWalkStep((step) => step + 1);
  }, [activeWeekdayId, audio, isDayCardTapEnabled, walkStep]);

  const tapForwardSignAriaLabel = (() => {
    if (isTomorrowTeachingStep) {
      return isDayCardTapEnabled
        ? `Tomorrow is ${activeDay.displayName}. Tap to move forward.`
        : `Listen first. Tomorrow is ${activeDay.displayName}.`;
    }
    if (!isDayCardTapEnabled) {
      return `Listen first. Tap to move forward.`;
    }
    if (isOpeningToday || (cycleComplete && activeWeekdayId === currentWeekdayId)) {
      return `Today is ${activeDay.displayName}. ${activeDay.eventName}. Tap to move forward.`;
    }
    return `This is ${activeDay.displayName}. ${activeDay.eventName}. Tap to move forward.`;
  })();

  const showStorybookBannerOverlay =
    isWalkThroughWeekStorybookBannerOverlayEnabled(activeWeekdayId);

  const storybookBanner = showStorybookBannerOverlay ? (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${activeWeekdayId}-${walkStep}-story`}
        className="w-full max-w-[26rem]"
        initial={
          reducedMotion ? false : adventureMotionVariants.fadeIn.initial
        }
        animate={adventureMotionVariants.fadeIn.animate}
        exit={reducedMotion ? undefined : adventureMotionVariants.fadeIn.exit}
        transition={adventureTransition.normal}
      >
        <WalkThroughWeekStorybookDayBanner
          inWorld={showIllustratedWorld}
          interaction="locked"
          weekdayId={activeWeekdayId}
        />
      </motion.div>
    </AnimatePresence>
  ) : null;

  const tapForwardSign = (
    <WalkThroughWeekTapToMoveForwardSign
      visible={isTapForwardSignVisible}
      tappable={canTapToAdvance}
      onTap={handleWalkForwardTap}
      inWorld={showIllustratedWorld}
      artwork={walkThroughWeekTapForwardArtworkForEvent(activeDay.eventId)}
      ariaLabel={tapForwardSignAriaLabel}
      className={
        isSchoolIllustratedWorld
          ? cn(
              "absolute z-[32]",
              "bottom-[max(10%,env(safe-area-inset-bottom)+0.5rem)]",
              "left-[42%] w-[min(42vw,16.5rem)] max-w-[16.5rem]",
              "sm:bottom-[11%] sm:left-[44%] sm:w-[min(38vw,17.5rem)]",
              "landscape:bottom-[8%] landscape:left-[46%] landscape:w-[min(34vw,14rem)]"
            )
          : isChaiShopIllustratedWorld || isTempleIllustratedWorld
            ? cn(
                "absolute z-[32]",
                "bottom-[max(14%,env(safe-area-inset-bottom)+0.65rem)]",
                "left-[38%] w-[min(50vw,20rem)] max-w-[20rem]",
                "sm:bottom-[15%] sm:left-[40%] sm:w-[min(46vw,21rem)]",
                "landscape:bottom-[12%] landscape:left-[42%] landscape:w-[min(40vw,17rem)]"
              )
            : cn(
                "relative mx-auto mt-4",
                "w-[min(72vw,16.5rem)] max-w-[16.5rem]"
              )
      }
    />
  );

  if (showIllustratedWorld) {
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
        {isSchoolIllustratedWorld ? (
          <WalkThroughWeekMondaySchoolScene fillViewport />
        ) : isChaiShopIllustratedWorld ? (
          <WalkThroughWeekFridayChaiShopScene fillViewport />
        ) : (
          <WalkThroughWeekSaturdayTempleScene fillViewport />
        )}

        <div
          className="pointer-events-none absolute inset-0 z-[32]"
          aria-hidden={!isTapForwardSignVisible}
        >
          <div className="pointer-events-auto relative size-full">
            {tapForwardSign}
          </div>
        </div>

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

          {showStorybookBannerOverlay ? (
            <div className="pointer-events-none mt-1.5 flex w-full justify-center px-3 sm:mt-2">
              {storybookBanner}
            </div>
          ) : null}
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

        {showStorybookBannerOverlay ? (
          <div className="flex w-full flex-col items-center">{storybookBanner}</div>
        ) : null}

        {tapForwardSign}
      </div>
    </motion.div>
  );
}

export { WalkThroughWeekLearningView };
