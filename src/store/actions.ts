import { axiosAdmin } from "@/services/axios";
import { components } from "@/types/fictioneers-api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { State } from "@/store/state-type";
import { Actions, ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import { config } from "@/services/config";
import { clearUserIdFromBrowserStorage, getUserId } from "@/services/user";

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
      dispatch(ActionTypes.GET_TIMELINE_DETAILS),
    ]);
  },

  [ActionTypes.CLEAR_USER]: async () => {
    // reloads the page not sure if this makes sense as an action?
    clearUserIdFromBrowserStorage();
  },

  [ActionTypes.GET_TIMELINE_DETAILS]: async ({ commit }) => {
    const result = await axiosAdmin.get<
      components["schemas"]["TimelineSerializer"]
    >(`/timelines/${config.timelineId}`);
    if (result.data) {
      commit(MutationTypes.SET_TIMELINE_DETAILS, result.data);
    }
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
    const userId = getUserId();
    let token: string;
    try {
      const tokenRequest = await axiosAdmin.post<
        components["schemas"]["EphemeralTokenSerializer"],
        AxiosResponse<components["schemas"]["EphemeralTokenSerializer"]>,
        components["schemas"]["TokenDeserializer"]
      >("/auth/token", {
        user_id: userId.id,
      });
      token = tokenRequest.data.access_token;
    } catch (e) {
      commit(
        MutationTypes.SET_ERROR,
        "Could not get auth token. Check these details are correct"
      );
    }

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
      try {
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
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          const error = e as AxiosError<
            components["schemas"]["ResponseSerializer_UserSerializer_"]
          >;
          commit(
            MutationTypes.SET_ERROR,
            `${
              error.response?.data.error?.content ||
              error.response?.data.error?.detail
            }`
          );
        } else {
          commit(MutationTypes.SET_ERROR, `${e}`);
        }
      }
    }

    commit(MutationTypes.SET_CURRENT_USER, { id: userId.id });
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
