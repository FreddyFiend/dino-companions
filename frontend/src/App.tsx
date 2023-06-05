import { useContext, useEffect, useState } from "react";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import { Outlet } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import userStore from "./providers/userStore";
function App() {
  const { isScreenLoading } = userStore();

  return (
    <>
      <header className="w-full">
        <Navbar />
      </header>
      <main className="bg-slate-100">
        {isScreenLoading && <LoadingScreen />}
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
