import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import userStore from "../providers/userStore";

function GuestRoute(props: JSX.IntrinsicAttributes & RouteProps) {
  const { user } = userStore();

  if (user !== null) return <Navigate to="/" />;

  return <Route {...props} />;
}

export default GuestRoute;
