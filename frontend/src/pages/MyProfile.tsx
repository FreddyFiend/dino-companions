import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { getProfile, apiAuth } from "../routes/usersApi";
import { UserContext } from "../providers/UserProvider";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    apiAuth
      .get("user/profile")
      .then((res) => setUserData(res.data))
      .catch((err) => {
        logOut();
      });
  }, []);

  const logOut = () => {
    apiAuth
      .get(`/auth/local/logout`, { withCredentials: true })
      .then((res) => {});
    setUser(null);
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div>
      <button onClick={logOut} className="s-btn">
        LOGOUT
      </button>
    </div>
  );
};

export default MyProfile;
