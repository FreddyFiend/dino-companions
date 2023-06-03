import React from "react";
import ReactLoading from "react-loading";

const LoadingScreen = () => {
  return (
    <div
      className="z-40 bg-black bg-opacity-10 h-screen w-screen inset-0 fixed pointer-events-none touch-none flex justify-center
  items-center"
    >
      <ReactLoading type="spokes" />
    </div>
  );
};

export default LoadingScreen;
