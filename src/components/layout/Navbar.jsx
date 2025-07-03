import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        PetShop
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/products" className="text-gray-700 hover:text-blue-500">
          Products
        </Link>

        <Link to="/cart" className="relative text-gray-700 hover:text-blue-500">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
