import qs from "qs";

enum Envs {
  DEV = "dev",
  PROD = "prod",
}

const { timeline_id, visible_key, env } = qs.parse(
  window.location.search.replace("?", "")
);

const apiBaseUrls = {
  [Envs.DEV]: "https://api.dev.fictioneers.co.uk/v1",
  [Envs.PROD]: "https://api.fictioneers.co.uk/v1",
};
const apiBaseUrlFromUrl =
  env &&
  typeof env === "string" &&
  Object.values(Envs).includes(env as Envs) &&
  apiBaseUrls[env as Envs]
    ? apiBaseUrls[env as Envs]
    : undefined;

const config = {
  timelineId: timeline_id || process.env.VUE_APP_TIMELINE_ID,
  visibleKey: visible_key || process.env.VUE_APP_VISIBLE_KEY,
  apiBaseUrl: apiBaseUrlFromUrl || process.env.VUE_APP_API_BASE_URL,
};

export { config };
