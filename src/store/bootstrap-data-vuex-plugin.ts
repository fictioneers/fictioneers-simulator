import { Store } from "vuex";
import { ActionTypes } from "@/store/action-types";
import { State } from "@/store/state-type";

export default async function bootstrap_data_vuex_plugin(store: Store<State>) {
  await store.dispatch(ActionTypes.INIT_USER);
}
