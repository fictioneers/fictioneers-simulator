import {
  CommitOptions,
  createStore,
  DispatchOptions,
  Store as VuexStore,
} from "vuex";
import bootstrap_data_vuex_plugin from "@/store/bootstrap-data-vuex-plugin";
import { mutations } from "@/store/mutations";
import { Mutations } from "@/store/mutation-types";
import { getters } from "@/store/getters";
import { Getters } from "@/store/getter-types";
import { actions } from "@/store/actions";
import { Actions } from "@/store/action-types";
import { state } from "@/store/state";
import { State } from "@/store/state-type";

export default createStore<State>({
  state,
  getters,
  mutations,
  actions,
  modules: {},
  plugins: [bootstrap_data_vuex_plugin],
});

type VuexStoreState = VuexStore<State>;
type OmitProperties = "getters" | "commit" | "dispatch";

export type Store = Omit<VuexStoreState, OmitProperties> & {
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
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
