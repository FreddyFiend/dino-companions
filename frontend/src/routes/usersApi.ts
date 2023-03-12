import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getUsers = () => api.get("/user").then((res) => res.data);
export const getUser = (id: string) =>
  api.get(`/user/${id}`).then((res) => res.data);

export const updateUser = ({ id, ...updatedUser }: { id: string }) =>
  api.post(`/user/${id}`, updatedUser).then((res) => res.data);
