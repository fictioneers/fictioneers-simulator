import { Store } from "vuex";
import { State } from ".";

export default async function bootstrap_data_vuex_plugin(store: Store<State>) {
  await store.dispatch("getCurrentUser");
}
