import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import {} from "react-icons";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <div className="flex justify-between h-24">
      <div className="  text-2xl flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        King
      </div>
      <ul className="hidden sm:block p-2 list-none flex gap-2">
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
      <button className=" sm:hidden " onClick={toggleNavbar}>
        {" "}
        {isOpen ? (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      <ul
        className={`sm:hidden  ${
          isOpen ? "block" : "hidden"
        }  p-2 list-none flex-col gap-2`}
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
