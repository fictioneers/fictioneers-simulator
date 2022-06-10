import { createStore } from "vuex";
import bootstrap_data_vuex_plugin from "@/store/bootstrap-data-vuex-plugin";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";
import { State } from "@/store/state-type";
import { state } from "@/store/state";

export default createStore<State>({
  state,
  getters: {},
  mutations,
  actions,
  modules: {},
  plugins: [bootstrap_data_vuex_plugin],
});
