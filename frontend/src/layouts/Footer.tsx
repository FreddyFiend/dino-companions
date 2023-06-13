import React, { useContext, useEffect, FC, ReactNode } from "react";
import userStore from "../providers/userStore";
import {
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-slate-700 px-2 py-4 text-white text-center">
      <div className="    md:flex justify-center">
        <div className="menu pt-4 ">
          <div className="text-xl font-bold ">MENU</div>
          <Link to="/">
            <p>HOME</p>
          </Link>
          <Link to="/products">
            <p>PRODUCTS</p>
          </Link>
          <Link to="/cart">CART</Link>
        </div>
        {/* <div className="contact pt-4 basis-1/3">
          <div className="text-xl font-bold">CONTACT US</div>
          <div className="flex justify-center pt-1 gap-1">
            <AiOutlineTwitter size={24} />
            <AiOutlineFacebook size={24} />
            <AiOutlineInstagram size={24} />
            <AiOutlineLinkedin size={24} />
            <AiOutlineGithub size={24} />
            <AiOutlineWhatsApp size={24} />
          </div>
        </div> */}
        {/* <div className="help basis-1/3 pt-4">
          <div className="text-xl font-bold ">HELP</div>
          <p>ABOUT THIS PROJECT</p>
          <p>OUR MISSION</p>
        </div> */}
      </div>
      <div className="text-white pt-2 opacity-40">Mohsin Raza</div>
      <div className="text-white opacity-40">Fiends Productions Limited</div>
    </div>
  );
};

export default Footer;
