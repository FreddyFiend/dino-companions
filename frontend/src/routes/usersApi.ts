import axios from "axios";
import { LoginInput } from "../pages/Login";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const apiAuth = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

apiAuth.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      await api
        .post("auth/refresh", {
          withCredentials: true,
        })
        .catch((err) => {
          console.log("refresh token failed");
          return Promise.reject(err);
        });
      return api(error.config);
    } else {
      console.log("refresh token passed");

      return Promise.reject(error);
    }
  }
);

apiAuth.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      await api
        .post("auth/refresh", {
          withCredentials: true,
        })
        .catch((err) => {
          console.log("refresh token failed");
          return Promise.reject(err);
        });
      return api(error.config);
    } else {
      console.log("refresh token passed");

      return Promise.reject(error);
    }
  }
);

export const getUsers = () => api.get("/user").then((res) => res.data);
export const getUser = (id: string) =>
  api.get(`/user/${id}`).then((res) => res.data);
export const getProfile = () =>
  apiAuth.get("auth/profile").then((res) => res.data);

export const updateUser = ({ id, ...updatedUser }: { id: string }) =>
  api.post(`/user/${id}`, updatedUser).then((res) => res.data);

export const loginUserFn = (loginData: LoginInput) =>
  api.post(`/auth/local/login`, loginData, { withCredentials: true });
