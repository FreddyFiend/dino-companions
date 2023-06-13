import React, { useState } from "react";
import home from "../assets/home.png";
import { Link } from "react-router-dom";
const Hero: React.FC = () => {
  return (
    <div className="root">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              <br className="hidden lg:inline-block"></br> Welcome to{" "}
              <span className="text-indigo-500">DinoCompanions!</span>
            </h1>
            <p className="mb-8 leading-relaxed">
              Your premier destination for dinosaur pets! Discover a curated
              selection of remarkable dinosaur companions, each with their own
              unique charm and personality.
            </p>
            <div className="flex justify-center items-center">
              <Link to={"/products"}>
                {" "}
                <div className="btn btn-blue  py-2 ">BROWSE NOW!</div>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={home}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
