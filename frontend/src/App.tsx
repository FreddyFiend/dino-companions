import { useContext, useEffect, useState } from "react";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <header className="w-full">
        <Navbar />
      </header>
      <main className="">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
