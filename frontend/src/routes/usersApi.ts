import axios from "axios";
import { LoginInput } from "../pages/Login";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await api
        .post("auth/refresh", {
          withCredentials: true,
        })
        .catch((err) => {
          return Promise.reject(err);
        });
      console.log(error.config);
      return api(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export const getUsers = () => api.get("/user").then((res) => res.data);
export const getUser = (id: string) =>
  api.get(`/user/${id}`).then((res) => res.data);
export const getProfile = () => api.get("auth/profile").then((res) => res.data);

export const updateUser = ({ id, ...updatedUser }: { id: string }) =>
  api.post(`/user/${id}`, updatedUser).then((res) => res.data);

export const loginUserFn = (loginData: LoginInput) =>
  api
    .post(`/auth/local/login`, loginData, { withCredentials: true })
    .then((res) => res.data);
