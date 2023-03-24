import { useQuery } from "@tanstack/react-query";
import React from "react";
import * as api from "../routes/usersApi";

const MyProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: api.getProfile,
  });
  return <div>{JSON.stringify(data)}</div>;
};

export default MyProfile;
