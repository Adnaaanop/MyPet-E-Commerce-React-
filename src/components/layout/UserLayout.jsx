import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen bg-gray-50">{children}</div>
      <Footer/>
    </>
  );
};

export default UserLayout;
