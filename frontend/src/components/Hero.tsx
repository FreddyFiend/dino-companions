import React, { useState } from "react";
import home from "../assets/home.png";
const Hero: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-wrap flex-row-reverse h-screen">
      <div className="offer-section  w-[200px] md:w-[250px] rounded-xl  ">
        <img src={home} alt="" className="relative object-cover " />
      </div>
      <div className="hero-section max-w-lg  mx-2 md:pt-0 ">
        <div className="p-2 text-2xl md:text-3xl font-bold">
          Welcome to <span className="text-indigo-500">DinoCompanions!</span>
        </div>
        <div className="mx-2 sm:text-lg ">
          {" "}
          Your premier destination for dinosaur pets! Discover a curated
          selection of remarkable dinosaur companions, each with their own
          unique charm and personality.
        </div>
        <div className="flex mx-2 pt-4 justify-start">
          <div className="btn btn-blue text-lg ">BROWSE NOW!</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
