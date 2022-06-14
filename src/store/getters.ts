import { GetterTree } from "vuex";
import { Getters } from "./getter-types";
import { State } from "./state-type";
import dayjs from "dayjs";
import { components } from "@/types/fictioneers-api";

export const sortByStateChangedAt = (
  timelineEventStates: components["schemas"]["UserTimelineEventStateChangeSerializer"][]
) => {
  if (timelineEventStates.length < 2) {
    return timelineEventStates;
  }

  return timelineEventStates.sort((a, b) => {
    const date1 = dayjs(b.state_changed_at!);
    const date2 = dayjs(a.state_changed_at!);
    return date1.diff(date2);
  });
};

export const getters: GetterTree<State, State> & Getters = {
  sortedTimelineEventStates: (state: State) =>
    sortByStateChangedAt(state.timelineEventStates),
};
