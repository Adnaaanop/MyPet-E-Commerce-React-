import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishListContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirm(false);
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";

  // Check if we're on the login or signup page
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Brand Name Always Visible */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        My Pet
      </Link>

      {/* Only show the rest of the links if not on /login or /signup */}
      {!isAuthPage && (
        <div className="flex items-center gap-6">
          <Link to="/pets" className={`${isActive("/pets")} hover:text-blue-500`}>
            Pets
          </Link>

          <Link to="/products" className={`${isActive("/products")} hover:text-blue-500`}>
            Products
          </Link>

          <Link to="/wishlist" className={`relative ${isActive("/wishlist")} hover:text-pink-500`}>
            ❤️
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs px-2 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className={`relative ${isActive("/cart")} hover:text-blue-500`}>
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4 text-gray-800 font-semibold">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
