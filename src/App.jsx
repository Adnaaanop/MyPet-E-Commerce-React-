

import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/layout/Navbar";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishListContext";
import ScrollToTop from "./components/common/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";




function App() {
  useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);
  return (
    <BrowserRouter>
    <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AllRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;
