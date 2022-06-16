import { State } from "@/store/state-type";

export const state: State = {
  controls: {
    maxSteps: 1,
    pauseAtBeats: false,
  },
  currentUser: {},
  timelineEventStates: [],
  userStoryState: undefined,
  userTimelineEvents: {},
  error: undefined,
};
