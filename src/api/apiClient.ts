import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
  headers: { Accept: "application/json" }
});

apiClient.interceptors.request.use(config => {
  config.headers["X-Client-Platform"] = "React-Native";
  return config;
});

export default apiClient;
