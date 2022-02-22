import axios from "axios";

const appAxios = axios.create({
  baseURL: "https://cospacerooms.netlify.app/api/v1",
});

appAxios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

export default appAxios;
