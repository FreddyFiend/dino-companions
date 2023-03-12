import { useContext, useEffect, useState } from "react";
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar/Navbar";
import {
  UserContext,
  UserContextType,
  UserProvider,
} from "./providers/UserProvider";
import { Outlet } from "react-router-dom";
function App() {
  const { user, setUser } = useContext<UserContextType>(UserContext);
  useEffect(() => {
    setUser({ id: 8, name: "sds", email: "sdsd" });
    console.log(user);

    return () => {};
  }, []);

  return (
    <>
      <header className="w-full">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
