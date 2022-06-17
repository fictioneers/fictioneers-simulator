import qs from "qs";

interface Config {
  timelineId: string;
  visibleKey: string;
  apiBaseUrl: string;
  contentfulSpace?: string;
  contentfulAccessToken?: string;
}

const {
  timelineId,
  visibleKey,
  apiBaseUrl,
  contentfulSpace,
  contentfulAccessToken,
} = qs.parse(window.location.search.replace("?", ""));

export const API_URL_DEV = "https://api.dev.fictioneers.co.uk/v1";
export const API_URL_PROD = "https://api.fictioneers.co.uk/v1";

const validApiBaseUrlFromUrl =
  apiBaseUrl === API_URL_DEV || apiBaseUrl === API_URL_PROD;

const config: Config = {
  timelineId: timelineId || process.env.VUE_APP_TIMELINE_ID,
  visibleKey: visibleKey || process.env.VUE_APP_VISIBLE_KEY,
  apiBaseUrl: validApiBaseUrlFromUrl ? apiBaseUrl : API_URL_PROD,
  contentfulSpace: contentfulSpace || process.env.VUE_APP_CONTENTFUL_SPACE,
  contentfulAccessToken:
    contentfulAccessToken || process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN,
};

export { config };
