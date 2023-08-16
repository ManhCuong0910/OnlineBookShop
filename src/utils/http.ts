import axios, { AxiosError, AxiosResponse } from "axios";
import config from "src/constants/config";
import { AuthResponse } from "src/types/auth.type";
import { getAccessTokenFromLS, setAccessTokenToLS } from "./auth";
import { URL_LOGIN } from "src/apis/auth.api";

const http = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  withCredentials: true,
});

http.defaults.headers.common = {
  Authorization: `Bearer ${getAccessTokenFromLS()}`,
};

http.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response: AxiosResponse) {
    const data = response.data as AuthResponse;
    if (response.config.url === URL_LOGIN) {
      setAccessTokenToLS(data.data.access_token);
    }

    return response;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default http;
