import axios from "axios";
import { LoginInput } from "../pages/Login";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getUsers = () => api.get("/user").then((res) => res.data);
export const getUser = (id: string) =>
  api.get(`/user/${id}`).then((res) => res.data);

export const updateUser = ({ id, ...updatedUser }: { id: string }) =>
  api.post(`/user/${id}`, updatedUser).then((res) => res.data);

export const loginUserFn = (loginData: LoginInput) =>
  api
    .post(`/auth/login`, loginData, { withCredentials: true })
    .then((res) => res.data);
