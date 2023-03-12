import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between ">
      <div className="text-2xl   ">King</div>
      <ul className="  p-2 list-none flex gap-2">
        <li>
          {" "}
          <Link to="/">Home</Link>
        </li>
        <li>Products</li>
        <li>Cart</li>
        <li>
          {" "}
          <Link to="signup">
            <button className="s-btn text-sm">Signup</button>
          </Link>
        </li>
        <li>
          {" "}
          <Link to="login">
            <button className="p-btn">Login</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
