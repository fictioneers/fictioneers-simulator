import { components } from "@/types/fictioneers-api";
import { State } from "@/store/state-type";

export type Getters = {
  sortedTimelineEventStates(
    state: State
  ): components["schemas"]["UserTimelineEventStateChangeSerializer"][];
};
