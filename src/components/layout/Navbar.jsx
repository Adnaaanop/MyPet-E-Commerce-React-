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
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Brand with Custom Logo */}
      <Link  
        to="/" 
        className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105 group" 
        title="Home"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
          <img 
            src="/pet-care (1).png" 
            alt="My Pet Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <span 
          className="text-xl font-bold text-black group-hover:text-gray-800 transition-all duration-300"
          style={{ fontFamily: '"Fredoka One", cursive' }}
        >
          My Pet
        </span>
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

      {/* Improved Logout Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-40 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform animate-scaleIn border border-gray-200 max-w-md mx-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <span className="text-3xl">👋</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Confirm Logout
            </h3>
            <p className="mb-8 text-gray-600 leading-relaxed">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-red-200"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all duration-300 transform hover:scale-105 border border-gray-300 hover:border-gray-400 focus:ring-4 focus:ring-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations to your CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;