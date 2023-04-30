import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { getProfile, apiAuth } from "../routes/usersApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../providers/userStore";
import userStore from "../providers/userStore";
import { toast } from "react-toastify";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, setUser, logoutUser } = userStore();
  const [userData, setUserData] = useState(user);
  const [username, setUsername] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    apiAuth
      .get("user/profile")
      .then((res) => setUserData(res.data))
      .catch((err) => {
        logOut();
      });
  }, []);
  const editUser = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    apiAuth
      .patch("user", { name: username })
      .then((res) => {
        setUser(res.data);
        setUserData(res.data);
        setShowEdit(!showEdit);
        toast.success(`Successfully changed name to ${res.data.name}`);
      })
      .catch((err) => {
        toast.warning(err.response.data.message);
      });
  };
  const logOut = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="p-4">
      <div className="text-2xl">{userData?.name}</div>

      {showEdit && (
        <form onSubmit={editUser}>
          <input
            className="p-input"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button type="submit" className="p-btn">
            Submit
          </button>
        </form>
      )}

      <div className="text-lg font-bold">{user?.email}</div>
      <div className="flex gap-2 pt-2">
        <button className="p-btn" onClick={() => setShowEdit(!showEdit)}>
          Update Name
        </button>
        <button onClick={logOut} className="s-btn">
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
