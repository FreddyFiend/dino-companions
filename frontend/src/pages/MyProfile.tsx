import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { getProfile, apiAuth, getUserWithProducts } from "../routes/usersApi";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../providers/userStore";
import userStore from "../providers/userStore";
import { toast } from "react-toastify";
import { Cards } from "../components";
import { Link } from "react-router-dom";

const MyProfile = () => {
  let { userId } = useParams();
  const navigate = useNavigate();
  const { user, setUser, logoutUser } = userStore();
  const [userData, setUserData] = useState(user);
  const [username, setUsername] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["userProducts", userId],
    queryFn: () => getUserWithProducts(userId || user.id),
  });

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
      <div className="text-2xl">{data?.name}</div>

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

      <div className="text-lg font-bold">{data?.email}</div>
      {user && (
        <div className="flex gap-2 pt-2">
          <button className="p-btn" onClick={() => setShowEdit(!showEdit)}>
            Update Name
          </button>
          <button onClick={logOut} className="s-btn">
            LOGOUT
          </button>
          <Link to="/upload" className="text-indigo-500 font-semibold p-1">
            {" "}
            Post new Product
          </Link>
        </div>
      )}
      <div className="pt-2 text-3xl"> Products</div>
      <Cards products={data && data.products} />
    </div>
  );
};

export default MyProfile;
