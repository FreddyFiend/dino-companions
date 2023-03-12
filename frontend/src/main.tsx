import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./providers/UserProvider";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";

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
              <Route path="product">
                <Route path=":id" element={<Product />}></Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
