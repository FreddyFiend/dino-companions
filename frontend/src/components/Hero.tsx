import React, { useState } from "react";
import home from "../assets/home.png";
const Hero: React.FC = () => {
  return (
    <div className="max-h-screen">
      <div className="flex justify-center items-center flex-wrap">
        <div className="hero-section max-w-md  mx-2">
          <div className="p-2 p-text-5 font-bold ">
            ENTER THE REALM OF THE <span className="text-yellow-500">KING</span>
          </div>
          <div className="mx-2 p-text-1 font-light">
            We have got the best products for your castle to show your kingdom
            what it’s like to be a King.
          </div>
        </div>
        <div className="offer-section p-4 m-4  rounded-xl">
          <img src={home} alt="" className="relative h-full " />
          <div className="text-4xl font-bold text-white">$5,000</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
