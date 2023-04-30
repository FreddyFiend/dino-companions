import React, { useContext, useEffect, FC, ReactNode } from "react";
import userStore from "../providers/userStore";

const Footer = () => {
  const { user, setUser } = userStore();

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
