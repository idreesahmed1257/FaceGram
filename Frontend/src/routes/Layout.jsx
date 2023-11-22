import React from "react";
import Navbar from "../components/Global/Navbar";

const Layout = ({ children }) => {

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>


    </>
  );
};

export default Layout;
