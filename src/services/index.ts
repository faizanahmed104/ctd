import axios, { HttpStatusCode } from 'axios';

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_LOCAL,
  withCredentials: true,
});

// Add a request interceptor
API.interceptors.request.use(
  function (config) {
    if (typeof window !== 'undefined') {
      const accessToken = window.localStorage?.getItem('accessToken');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      console.error(error);
      if (error.response.data.detail === 'Invalid token.') {
        // clearLocalStorage();
        // clearCookies();
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  },
);
