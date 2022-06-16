import { ActionContext, DispatchOptions } from "vuex";
import { Mutations } from "@/store/mutation-types";
import { State } from "@/store/state-type";

export enum ActionTypes {
  INIT_USER = "INIT_USER",
  CLEAR_USER = "CLEAR_USER",
  GET_TIMELINE_DETAILS = "GET_TIMELINE_DETAILS",
  GET_USER_STORY_STATE = "GET_USER_STORY_STATE",
  GET_CURRENT_USER = "GET_CURRENT_USER",
  GET_USER_TIMELINE_EVENTS = "GET_USER_TIMELINE_EVENTS",
  GET_USER_EVENT_STATE_CHANGES = "GET_USER_EVENT_STATE_CHANGES",
  PROGRESS_USER_STORY_STATE = "PROGRESS_USER_STORY_STATE",
}

export interface Actions {
  [ActionTypes.INIT_USER](context: AugmentedActionContext): Promise<any>;
  [ActionTypes.CLEAR_USER](context: AugmentedActionContext): Promise<any>;
  [ActionTypes.GET_TIMELINE_DETAILS](
    context: AugmentedActionContext
  ): Promise<any>;
  [ActionTypes.GET_USER_STORY_STATE](
    context: AugmentedActionContext
  ): Promise<any>;
  [ActionTypes.GET_CURRENT_USER](context: AugmentedActionContext): Promise<any>;
  [ActionTypes.GET_USER_TIMELINE_EVENTS](
    context: AugmentedActionContext
  ): Promise<any>;
  [ActionTypes.GET_USER_EVENT_STATE_CHANGES](
    context: AugmentedActionContext
  ): Promise<any>;
  [ActionTypes.PROGRESS_USER_STORY_STATE](
    context: AugmentedActionContext
  ): Promise<any>;
}

// https://dev.to/3vilarthas/vuex-typescript-m4j
// This checks the payload type passed to "commit" matches the
// payload type of the mutation it is committing to
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & Omit<ActionContext<State, State>, "commit" | "dispatch">;
