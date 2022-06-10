import { MutationTree } from "vuex";
import { State } from "@/store/state-type";
import { Mutations, MutationTypes } from "@/store/mutation-types";

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.INSERT_TIMELINE_EVENT_STATES](state, payload) {
    state.timelineEventStates = [...state.timelineEventStates, ...payload];
  },
  [MutationTypes.SET_CURRENT_USER](state, payload) {
    state.currentUser = payload;
  },
  [MutationTypes.SET_USER_STORY_STATE](state, payload) {
    state.userStoryState = payload;
  },
  [MutationTypes.SET_USER_TIMELINE_EVENTS](state, payload) {
    state.userTimelineEvents = payload;
  },
  [MutationTypes.SET_TIMELINE_EVENT_STATES](state, payload) {
    state.timelineEventStates = payload;
  },
};