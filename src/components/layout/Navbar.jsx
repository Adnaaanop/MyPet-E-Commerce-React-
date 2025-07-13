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

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Brand */}
      <Link 
        to="/" 
        className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105" 
        title="Home"
      >
        🐾 My Pet
      </Link>

      {/* Main Nav */}
      {!isAuthPage && (
        <div className="flex items-center gap-8">
          <Link
            to="/pets"
            className={`${isActive("/pets")} hover:text-orange-500 font-medium transition-all duration-300 hover:scale-110 relative group`}
            title="Browse Pets"
          >
            Pets
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/products"
            className={`${isActive("/products")} hover:text-orange-500 font-medium transition-all duration-300 hover:scale-110 relative group`}
            title="Shop Products"
          >
            Products
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/wishlist"
            className={`relative ${isActive("/wishlist")} hover:text-pink-500 transition-all duration-300 hover:scale-110 group`}
            title="View Wishlist"
          >
            <span className="text-xl group-hover:animate-pulse">❤️</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className={`relative ${isActive("/cart")} hover:text-orange-500 transition-all duration-300 hover:scale-110 group`}
            title="View Cart"
          >
            <span className="text-xl group-hover:animate-pulse">🛒</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/my-orders"
                className={`${isActive("/my-orders")} hover:text-orange-500 text-sm font-medium transition-all duration-300 hover:scale-110 relative group`}
                title="Track My Orders"
              >
                Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-red-700 text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                title="Logout"
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-orange-700 text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                title="Login"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 text-sm font-medium transition-all duration-300 transform hover:scale-105 border border-gray-300 hover:border-gray-400"
                title="Create Account"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}

      {/* Logout Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform animate-pulse border border-gray-200">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👋</span>
            </div>
            <p className="mb-6 text-gray-800 font-semibold text-lg">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 font-medium transition-all duration-300 transform hover:scale-105 border border-gray-300 hover:border-gray-400"
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
