import qs from "qs";

const { timelineId, visible_key, apiBaseUrl } = qs.parse(
  window.location.search.replace("?", "")
);

export const API_URL_DEV = "https://api.dev.fictioneers.co.uk/v1";
export const API_URL_PROD = "https://api.fictioneers.co.uk/v1";

const validApiBaseUrlFromUrl =
  apiBaseUrl === API_URL_DEV || apiBaseUrl === API_URL_PROD;

const config = {
  timelineId: timelineId || process.env.VUE_APP_TIMELINE_ID,
  visibleKey: visible_key || process.env.VUE_APP_VISIBLE_KEY,
  apiBaseUrl: validApiBaseUrlFromUrl ? apiBaseUrl : API_URL_DEV,
};

export { config };
