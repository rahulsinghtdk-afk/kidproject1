"use client";

import { useState } from "react";
import {
  COUNTING_GROUP_IDS,
  type CountingGroupId,
} from "@/data/counting/groups";
import { CountAndChooseAdventure } from "./counting/count-and-choose-adventure";
import { CountingGroupPicker } from "./counting/counting-group-picker";
import { HelpAFriendAdventure } from "./counting/help-a-friend-adventure";
import {
  PlayActivityHub,
  type PlayActivityId,
} from "./play-activity-hub";
import { WalkThroughWeekAdventure } from "./walk-through-week/walk-through-week-adventure";

function PlayAdventure() {
  const [selectedActivity, setSelectedActivity] =
    useState<PlayActivityId | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<CountingGroupId | null>(
    null
  );

  if (selectedActivity === null) {
    return <PlayActivityHub onSelect={setSelectedActivity} />;
  }

  if (selectedActivity === "walkThroughWeek") {
    return <WalkThroughWeekAdventure />;
  }

  if (selectedGroup === null) {
    return <CountingGroupPicker onSelect={setSelectedGroup} />;
  }

  if (selectedGroup === COUNTING_GROUP_IDS.countAndChoose) {
    return (
      <CountAndChooseAdventure onExitToPicker={() => setSelectedGroup(null)} />
    );
  }

  return (
    <HelpAFriendAdventure onExitToPicker={() => setSelectedGroup(null)} />
  );
}

export { PlayAdventure };
