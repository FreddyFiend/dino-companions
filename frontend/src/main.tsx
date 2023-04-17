import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./providers/UserProvider";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import "react-toastify/dist/ReactToastify.css";
import MyProfile from "./pages/MyProfile";
import PostProduct from "./pages/PostProduct";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Homepage />}></Route>

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="upload" element={<PostProduct />} />
              <Route path="profile" element={<MyProfile />} />
              <Route path="product">
                <Route path=":id" element={<Product />}></Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
