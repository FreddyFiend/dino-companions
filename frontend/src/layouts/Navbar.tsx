import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { apiAuth } from "../routes/usersApi";
let initialLinks = [
  {
    id: 0,
    icon: AiOutlineHome,
    title: "Home",
    link: "/",
  },
  {
    id: 1,
    icon: AiOutlineShopping,
    title: "Products",
    link: "/products",
  },
  {
    id: 2,
    icon: AiOutlineShoppingCart,
    title: "Cart",
    link: "/cart",
  },
];
const loginItem = {
  id: 4,
  icon: AiOutlineLogin,
  title: "Login/Signup",
  link: "/login",
};
const profileItem = {
  id: 5,
  icon: AiOutlineUser,
  title: "My Profile",
  link: "/profile",
};

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  let [links, setLinks] = useState(initialLinks);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      setLinks([...initialLinks, profileItem]);
    } else {
      setLinks([...initialLinks, loginItem]);
    }
  }, [user]);
  const toggleNavbar = () => setIsOpen(!isOpen);
  useEffect(() => {
    apiAuth.get("user/profile").catch((err) => {
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
    <div className="flex justify-center">
      <div className="max-w-6xl flex-1 p-1">
        <div className="flex justify-between h-10  ">
          <div className="pl-2 font-bold text-2xl flex flex-1  justify-center sm:items-stretch sm:justify-start">
            King
          </div>

          <ul className="hidden sm:flex p-2 list-none items-center  gap-2">
            {links.map((link) => (
              <li key={link.id} className="ml-2">
                <Link to={link.link} title={link.title}>
                  <link.icon size={32} />
                </Link>
              </li>
            ))}
          </ul>
          <button
            className=" sm:hidden absolute right-1 top-2"
            onClick={toggleNavbar}
          >
            {" "}
            {isOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>
        <ul
          className={`sm:hidden  ${
            isOpen ? "flex" : "hidden"
          }  p-2 list-none flex-col gap-2 justify-center items-center  transition-all`}
        >
          {links.map((link) => (
            <li
              key={link.id}
              className="hover:bg-slate-400 w-full  group flex justify-center items-center "
            >
              <Link
                to={link.link}
                className="font-semibold text-slate-800 p-2 flex flex-col  items-center group-hover:text-white "
              >
                <link.icon size={24} />
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;