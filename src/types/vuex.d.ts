import type { Store } from "vuex";
import type { State } from "@/store/state-type";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
