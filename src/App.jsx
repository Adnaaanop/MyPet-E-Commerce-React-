// import React from "react";
// import { Formik, Form } from "formik";
// import Input from "./components/common/Input";
// import Button from "./components/common/Button";

import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/layout/Navbar";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishListContext";
import AOS from "aos";
import "aos/dist/aos.css";




function App() {
  useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {/* Remove this: <Navbar /> */}
            <AllRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;
