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
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";

const MyProfile = () => {
  let { userId } = useParams();
  const navigate = useNavigate();
  const { user, setUser, logoutUser } = userStore();
  const [userData, setUserData] = useState(user);
  const [username, setUsername] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["userProducts", userId],
    //userId comes from param, if undefined, id of logged in user's will be used
    queryFn: () => getUserWithProducts(userId || user?.id),
  });

  useEffect(() => {
    if (!userId && !user?.id) {
      navigate("/");
    }
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
      {showEdit && (
        <form onSubmit={editUser}>
          <h3 className="text-xl font-semibold">Update your name</h3>
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

      {user && (
        <div className="flex relative flex-col justify-start items-start max-w-sm  p-4 bg-white rounded shadow-md">
          {" "}
          <div className="icon p-2 border-2 rounded ">
            <AiOutlineUser size={96} />
          </div>
          <div className="text-2xl pt-4">{data?.name}</div>
          <div className="text-lg font-bold pt-1">{data?.email}</div>
          {user && (
            <>
              {" "}
              <button
                className="btn absolute top-2 right-2"
                onClick={() => setShowEdit(!showEdit)}
              >
                <AiOutlineEdit size={36} />
              </button>
              <button onClick={logOut} className="s-btn mt-2">
                LOGOUT
              </button>
              <Link to="/upload" className="text-indigo-500 font-semibold p-1">
                {" "}
                Post new Product
              </Link>
            </>
          )}
        </div>
      )}
      <div className="pt-4 text-3xl"> Products</div>
      {data && data.products.length !== 0 ? (
        <Cards products={data && data.products} />
      ) : (
        <div className="pt-2">User hasn't posted any dinos</div>
      )}
    </div>
  );
};

export default MyProfile;
