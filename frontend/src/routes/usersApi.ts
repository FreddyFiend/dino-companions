import axios from "axios";
import { LoginInput } from "../pages/Login";
import { ProductInput } from "../pages/PostProduct";
import { SignUpInput } from "../pages/SignUp";

// const url = "http://localhost:3000";
const url = "https://dino-companions.onrender.com";

export const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const apiAuth = axios.create({
  baseURL: url,
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
          return Promise.reject(err);
        });
      return api(error.config);
    } else {
      //    console.log("refresh token passed");

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
        .catch(async (err) => {
          // console.log("refresh token failed");

          return Promise.reject(err);
        });
      return api(error.config);
    } else {
      //   console.log("refresh token passed");

      return Promise.reject(error);
    }
  }
);

// const logOutFn = async () => {

//   api.get(`/auth/local/logout`, { withCredentials: true }).then((res) => {});
//   localStorage.removeItem("user");
// };

export const getUsers = () => api.get("/user").then((res) => res.data);
export const getUser = (id: string) =>
  api.get(`/user/${id}`).then((res) => res.data);

export const getProfile = () =>
  apiAuth.get("auth/profile").then((res) => res.data);

export const updateUser = ({ id, ...updatedUser }: { id: string }) =>
  apiAuth.post(`/user/${id}`, updatedUser).then((res) => res.data);

export const loginUserFn = (loginData: LoginInput) =>
  api.post(`/auth/local/login`, loginData, { withCredentials: true });

export const SignUpUserFn = (signupData: SignUpInput) =>
  api.post(`/auth/local/signup`, signupData, { withCredentials: true });

export const postProductFn = (productData: FormData) =>
  apiAuth.post(`/product`, productData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

export const addReviewFn = (reviewData: ReviewDto) =>
  apiAuth.post("/product/review", reviewData).then((res) => res.data);

export const getProducts = (params: string) =>
  apiAuth.get(`/product${params}`).then((res) => res.data);

export const getProduct = (param: string) =>
  apiAuth.get(`/product/${param}`).then((res) => res.data);

export const getUserWithProducts = (param: string) =>
  apiAuth.get(`/user/profile/${param}`).then((res) => res.data);

export const deleteProduct = (param: string) =>
  apiAuth.delete(`/product/${param}`).then((res) => res.data);

export const checkoutFn = (
  checkoutItems: { itemId: string; quantity: number }[]
) => apiAuth.post(`/product/checkout`, checkoutItems).then((res) => res.data);
