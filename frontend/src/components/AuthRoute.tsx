import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import userStore from "../providers/userStore";

interface Props {
  children: JSX.Element;
}

function AuthRoute({ children }: Props): JSX.Element {
  const { user } = userStore();
  if (user === null) return <Navigate to="/" />;

  return children;
}

export default AuthRoute;
