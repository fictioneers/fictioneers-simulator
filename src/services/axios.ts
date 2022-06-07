import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: { Authorization: process.env.VUE_APP_VISIBLE_KEY },
});
export { axiosAdmin };
