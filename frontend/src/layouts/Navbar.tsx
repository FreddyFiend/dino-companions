import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { apiAuth } from "../routes/usersApi";
import userStore from "../providers/userStore";
import { GiDinosaurRex } from "react-icons/gi";

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
  const { user, setUser, logoutUser } = userStore();
  const [isOpen, setIsOpen] = useState(false);
  let [links, setLinks] = useState(initialLinks);
  const [activeLinkId, setActiveLinkId] = useState(0);
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
    if (user) {
      apiAuth
        .get("user/profile")
        .then((res) => console.log(res.data))
        .catch((err) => {
          logoutUser();
        });
    }
  }, []);

  return (
    <div className="py-1">
      <div className="max-w-6xl mx-auto flex items-center sm:justify-between flex-col sm:flex-row ">
        <div className="pl-2 font-bold text-xl flex flex-1  justify-center items-center sm:items-stretch sm:justify-start">
          <GiDinosaurRex size={36} className="" />{" "}
          <h6 className="pl-2 "> DinoCompanions</h6>
        </div>

        <ul
          // className={`   ${
          //   isOpen ? "flex flex-col" : "hidden"
          // }  sm:flex sm:flex-row list-none items-center justify-center gap-2`}
          className={`   ${
            isOpen ? "grid grid-rows-4 " : "hidden"
          }  sm:grid sm:grid-cols-4 list-none items-center justify-center gap-2`}
        >
          {links.map((link) => (
            <li key={link.id} className={` p-2 `}>
              <NavLink
                to={link.link}
                onClick={() => setIsOpen(false)}
                title={link.title}
                className="py-2"
              >
                {({ isActive }) => (
                  <div className="flex flex-col items-center justify-center">
                    {isActive ? (
                      <>
                        <link.icon size={32} className="text-indigo-500 " />
                        <p className=" sm:hidden text-opacity-70 text-indigo-500">
                          {" "}
                          {link.title}
                        </p>
                      </>
                    ) : (
                      <>
                        <link.icon size={32} />
                        <p className=" sm:hidden text-opacity-70">
                          {" "}
                          {link.title}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          className=" sm:hidden absolute right-1 top-2 "
          onClick={toggleNavbar}
        >
          {" "}
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
