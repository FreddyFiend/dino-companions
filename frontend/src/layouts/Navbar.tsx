import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <div>
      <div className="flex justify-between h-10 ">
        <div className="text-2xl flex flex-1 justify-center sm:items-stretch sm:justify-start">
          King
        </div>

        <ul className="hidden sm:flex p-2 list-none gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="signup">
              <button className="s-btn text-sm">Products</button>
            </Link>
          </li>
          <li>
            <Link to="signup">
              <button className="s-btn text-sm">Cart</button>
            </Link>
          </li>
          <li>
            <Link to="signup">
              <button className="s-btn text-sm">Signup</button>
            </Link>
          </li>
          <li>
            <Link to="login">
              <button className="p-btn text-sm">Login</button>
            </Link>
          </li>
        </ul>
        <button
          className=" sm:hidden absolute right-1 top-2"
          onClick={toggleNavbar}
        >
          {" "}
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>{" "}
      <ul
        className={`sm:hidden  ${
          isOpen ? "block" : "hidden"
        }  p-2 list-none flex-col gap-2 `}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="signup">
            <button className="s-btn text-sm">Products</button>
          </Link>
        </li>
        <li>
          <Link to="signup">
            <button className="s-btn text-sm">Cart</button>
          </Link>
        </li>
        <li>
          <Link to="signup">
            <button className="s-btn text-sm">Signup</button>
          </Link>
        </li>
        <li>
          <Link to="login">
            <button className="p-btn text-sm">Login</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
