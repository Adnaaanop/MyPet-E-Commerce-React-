import React from "react";
import Navbar from "./Navbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen bg-gray-50">{children}</div>
    </>
  );
};

export default UserLayout;
