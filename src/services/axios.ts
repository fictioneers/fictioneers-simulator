import axios from "axios";
import { config } from "./config";

const axiosAdmin = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { Authorization: config.visibleKey },
});
export { axiosAdmin };
