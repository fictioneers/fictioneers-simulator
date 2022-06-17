import { User } from "@/types";
import { components } from "@/types/fictioneers-api";
import { ContentfulContent } from "./bootstrap-data-vuex-plugin";

export interface State {
  currentUser: User;
  timelineDetails?: components["schemas"]["TimelineSerializer"];
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
  contentfulContent?: ContentfulContent;
}
