import { Store } from "@/store";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store;
  }
}

export type User = { id?: string };
