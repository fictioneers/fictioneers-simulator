import { axiosAdmin } from "@/services/axios";
import axios from "axios";
import { createStore } from "vuex";
import bootstrap_data_vuex_plugin from "./bootstrap-data-vuex-plugin";

export interface State {
  currentUser: Record<string, unknown>;
}

export default createStore<State>({
  state: {
    currentUser: {},
  },
  getters: {},
  mutations: {
    setCurrentUser: (state: State, user: Record<string, unknown>) => {
      state.currentUser = user;
    },
  },
  actions: {
    getCurrentUser: async ({ commit }) => {
      const tokenRequest = await axiosAdmin.post("/auth/token", {
        user_id: "user_id",
        // user_id: `${Math.floor(Math.random() * 100000)}`,
      });
      const token = tokenRequest.data.access_token;

      const axiosExperience = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL,
        headers: { Authorization: `Bearer ${token}` },
      });

      let currentUserRequest;

      try {
        currentUserRequest = await axiosExperience.get("/users/me");
      } catch {
        currentUserRequest = await axiosExperience.post("/users", {
          published_timeline_id: process.env.VUE_APP_TIMELINE_ID,
          timezone: "Europe/London",
          disable_time_guards: false,
          pause_at_beats: true,
        });
      }

      commit("setCurrentUser", currentUserRequest?.data?.data);
    },
  },
  modules: {},
  plugins: [bootstrap_data_vuex_plugin],
});
