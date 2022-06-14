import { axiosAdmin } from "@/services/axios";
import { components } from "@/types/fictioneers-api";
import axios, { AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { State } from "@/store/state-type";
import { Actions, ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import { config } from "@/services/config";

const axiosExperience = axios.create({
  baseURL: config.apiBaseUrl,
});

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.INIT_USER]: async ({ dispatch }) => {
    await dispatch(ActionTypes.GET_CURRENT_USER);
    return Promise.all([
      dispatch(ActionTypes.GET_USER_STORY_STATE),
      dispatch(ActionTypes.GET_USER_TIMELINE_EVENTS),
      dispatch(ActionTypes.GET_USER_EVENT_STATE_CHANGES),
    ]);
  },

  [ActionTypes.GET_USER_STORY_STATE]: async ({ commit }) => {
    const result = await axiosExperience.get<
      components["schemas"]["ResponseSerializer_UserStoryStateSerializer_"]
    >("/user-story-state");
    if (result.data.data) {
      commit(MutationTypes.SET_USER_STORY_STATE, result.data.data);
    }
  },

  [ActionTypes.GET_CURRENT_USER]: async ({ commit }) => {
    const user_id = "user_id";
    const tokenRequest = await axiosAdmin.post<
      components["schemas"]["EphemeralTokenSerializer"]
    >("/auth/token", {
      user_id,
    });
    const token = tokenRequest.data.access_token;

    axiosExperience.interceptors.request.use(async function (config) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
      return config;
    });

    try {
      await axiosExperience.get<
        components["schemas"]["ResponseSerializer_UserSerializer_"]
      >("/users/me");
    } catch {
      await axiosExperience.post<
        components["schemas"]["ResponseSerializer_UserSerializer_"],
        AxiosResponse<
          components["schemas"]["ResponseSerializer_UserSerializer_"]
        >,
        components["schemas"]["CreateUserDeserializer"]
      >("/users", {
        published_timeline_id: config.timelineId,
        timezone: "Europe/London",
        disable_time_guards: false,
      });
    }

    commit(MutationTypes.SET_CURRENT_USER, { id: user_id });
  },

  [ActionTypes.PROGRESS_USER_STORY_STATE]: async ({
    commit,
    dispatch,
    state,
  }) => {
    const result = await axiosExperience.post<
      components["schemas"]["ResponseSerializer_UserStoryStateSerializer_"],
      AxiosResponse<
        components["schemas"]["ResponseSerializer_UserStoryStateSerializer_"]
      >,
      components["schemas"]["ProgressEventsDeserializer"]
    >("/user-story-state/progress-events", {
      max_steps: state.controls.maxSteps,
      pause_at_beats: state.controls.pauseAtBeats,
    });
    if (result.data.meta?.changed_timeline_events?.length) {
      await dispatch(ActionTypes.GET_USER_TIMELINE_EVENTS);
    }
    if (result.data.meta?.changed_timeline_event_states?.length) {
      commit(
        MutationTypes.INSERT_TIMELINE_EVENT_STATES,
        result.data.meta.changed_timeline_event_states
      );
    }

    if (result.data.data) {
      commit(MutationTypes.SET_USER_STORY_STATE, result.data.data);
    }
  },

  [ActionTypes.GET_USER_TIMELINE_EVENTS]: async ({ commit }) => {
    const result = await axiosExperience.get<
      components["schemas"]["ResponseListSerializer_UserTimelineEventSerializer_"]
    >("/user-timeline-events");

    if (!result.data.data) {
      return;
    }

    const userTimelineEvents = result.data.data.reduce<
      Record<string, components["schemas"]["UserTimelineEventSerializer"]>
    >(
      (
        accumulator,
        user_timeline_event: components["schemas"]["UserTimelineEventSerializer"]
      ) => {
        accumulator[user_timeline_event.narrative_event_id] =
          user_timeline_event;
        return accumulator;
      },
      {}
    );

    commit(MutationTypes.SET_USER_TIMELINE_EVENTS, userTimelineEvents);
  },
  [ActionTypes.GET_USER_EVENT_STATE_CHANGES]: async ({ commit }) => {
    const result = await axiosExperience.get<
      components["schemas"]["ResponseListSerializer_UserTimelineEventStateChangeSerializer_"]
    >("/user-timeline-event-state-changes");
    if (result.data.data) {
      commit(MutationTypes.SET_TIMELINE_EVENT_STATES, result.data.data);
    }
  },
};
