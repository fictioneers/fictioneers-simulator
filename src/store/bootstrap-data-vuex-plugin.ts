import { Store } from "vuex";
import { ActionTypes } from "@/store/action-types";
import { State } from "@/store/state-type";
import { config } from "@/services/config";
import { AssetCollection, createClient, Entry } from "contentful";
import { MutationTypes } from "./mutation-types";

type EntryMap = Record<string, Entry<unknown>>;

export interface ContentfulContent {
  entries: EntryMap;
  assets: AssetCollection;
}

async function getContentfulContent(): Promise<ContentfulContent | undefined> {
  if (!config.contentfulSpace || !config.contentfulAccessToken) {
    return;
  }
  const contentful = createClient({
    space: config.contentfulSpace,
    accessToken: config.contentfulAccessToken,
  });

  const entries = await contentful.getEntries<unknown>({
    limit: 1000,
  });
  const assets = await contentful.getAssets();
  return {
    entries: entries?.items.reduce<EntryMap>((acc, item) => {
      acc[item.sys.id] = item;
      return acc;
    }, {}),
    assets,
  };
}

export default async function bootstrap_data_vuex_plugin(store: Store<State>) {
  const contentfulContent = await getContentfulContent();
  if (contentfulContent) {
    store.commit(MutationTypes.SET_CONTENTFUL_CONTENT, contentfulContent);
  }
  await store.dispatch(ActionTypes.INIT_USER);
}
