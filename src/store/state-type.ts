import { User } from "@/types";
import { components } from "@/types/fictioneers-api";

export interface State {
  currentUser: User;
  timelineEventStates: components["schemas"]["UserTimelineEventStateChangeSerializer"][];
  userStoryState?: components["schemas"]["UserStoryStateSerializer"];
  userTimelineEvents: Record<
    string,
    components["schemas"]["UserTimelineEventSerializer"]
  >;
  controls: {
    maxSteps: number;
    pauseAtBeats: boolean;
  };
  error: string | undefined;
}
