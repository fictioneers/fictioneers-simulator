import { Store } from "vuex";
import { ActionTypes, State } from ".";

export default async function bootstrap_data_vuex_plugin(store: Store<State>) {
  await store.dispatch(ActionTypes.INIT_USER);
}
