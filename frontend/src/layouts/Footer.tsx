import React, { useContext, useEffect, FC, ReactNode } from "react";
import { UserContext } from "../providers/UserProvider";

const Footer = () => {
  const { user, setUser } = useContext(UserContext);

  function changeUser() {
    console.log(user);
  }

  return (
    <div>
      Footer
      {user?.email}
      <button onClick={changeUser}> Change User </button>
    </div>
  );
};

export default Footer;
