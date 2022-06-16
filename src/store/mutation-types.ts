import { User } from "@/types";
import { components } from "@/types/fictioneers-api";
import { State } from "@/store/state-type";

export enum MutationTypes {
  INSERT_TIMELINE_EVENT_STATES = "INSERT_TIMELINE_EVENT_STATES",
  SET_TIMELINE_DETAILS = "SET_TIMELINE_DETAILS",
  SET_CURRENT_USER = "SET_CURRENT_USER",
  SET_USER_STORY_STATE = "SET_USER_STORY_STATE",
  SET_USER_TIMELINE_EVENTS = "SET_USER_TIMELINE_EVENTS",
  SET_TIMELINE_EVENT_STATES = "SET_TIMELINE_EVENT_STATES",
  SET_ERROR = "SET_ERROR",
}

export type Mutations<S = State> = {
  [MutationTypes.INSERT_TIMELINE_EVENT_STATES](
    state: S,
    payload: components["schemas"]["UserTimelineEventStateChangeSerializer"][]
  ): void;
  [MutationTypes.SET_TIMELINE_DETAILS](
    state: S,
    payload: components["schemas"]["TimelineSerializer"]
  ): void;
  [MutationTypes.SET_CURRENT_USER](state: S, payload: User): void;
  [MutationTypes.SET_USER_STORY_STATE](
    state: S,
    payload: components["schemas"]["UserStoryStateSerializer"]
  ): void;
  [MutationTypes.SET_USER_TIMELINE_EVENTS](
    state: S,
    payload: Record<
      string,
      components["schemas"]["UserTimelineEventSerializer"]
    >
  ): void;
  [MutationTypes.SET_TIMELINE_EVENT_STATES](
    state: S,
    payload: components["schemas"]["UserTimelineEventStateChangeSerializer"][]
  ): void;
  [MutationTypes.SET_ERROR](state: S, payload: string): void;
};
