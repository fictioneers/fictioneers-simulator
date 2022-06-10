import {
  CommitOptions,
  createStore,
  DispatchOptions,
  Store as VuexStore,
} from "vuex";
import bootstrap_data_vuex_plugin from "@/store/bootstrap-data-vuex-plugin";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";
import { State } from "@/store/state-type";
import { state } from "@/store/state";
import { Mutations } from "./mutation-types";
import { Actions } from "./action-types";

export default createStore<State>({
  state,
  getters: {},
  mutations,
  actions,
  modules: {},
  plugins: [bootstrap_data_vuex_plugin],
});

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
