import React from "react";
import Navbar from "./Navbar";

const BasicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="p-4">{children}</div>
    </>
  );
};

export default BasicLayout;
