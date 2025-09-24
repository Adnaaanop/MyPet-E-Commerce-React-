import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    getCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    console.log("Cart items in Cart.jsx:", JSON.stringify(cartItems, null, 2)); // Debug log
    getCart(); // Fetch cart on mount
  }, [getCart]);

  const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 1;
    return acc + itemPrice * itemQuantity;
  }, 0);

  const handleClearCart = () => {
    setShowConfirm(true);
    setItemToRemove(null); // Clear all
  };

  const handleRemoveItem = (itemId) => {
    setItemToRemove(itemId);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
      toast.success("Item removed from cart!", {
        duration: 3000,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #10b981",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "🗑️",
      });
    } else {
      clearCart();
      toast.success("Cart cleared successfully!", {
        duration: 3000,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #10b981",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "🛒",
      });
    }
    setShowConfirm(false);
  };

  const handleQuantityChange = (type, itemId) => {
    if (type === "increase") {
      increaseQuantity(itemId);
      toast.success("Quantity increased!", {
        duration: 1500,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #10b981",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "➕",
      });
    } else {
      decreaseQuantity(itemId);
      toast.success("Quantity decreased!", {
        duration: 1500,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #10b981",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "➖",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5ee] font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 animate-fade-in-up"
            style={{
              fontFamily: '"Fredoka One", cursive',
              lineHeight: "1.1",
            }}
          >
            🛒 Your Cart
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} ready for checkout
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-105">
              <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L9 14m0 0h8m-8 0V9a3 3 0 013-3h2a3 3 0 013 3v5" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Start adding lovely pets and accessories to your cart and bring them home!
            </p>
            <button
              onClick={() => navigate("/pets")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Main Content Area */}
            <div className="flex-1 max-w-4xl">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in Your Cart
                    </h2>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L9 14m0 0h8m-8 0V9a3 3 0 013-3h2a3 3 0 013 3v5" />
                    </svg>
                    <span className="font-medium">Ready to checkout</span>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 animate-fade-in-up">
                {cartItems.map((item, index) => {
                  const displayName = item.productName || item.petName || "Unknown";
                  const displayPrice = item.price || 0;
                  const displayImage = item.imageUrl || "/fallback.png";
                  const isPet = !!item.petId;
                  const itemQuantity = item.quantity || 1;

                  return (
                    <div
                      key={item.id}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] p-6 overflow-hidden relative"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Decorative gradient line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                      <div className="flex items-center gap-6">
                        {/* Product Image */}
                        <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                          <img
                            src={displayImage}
                            alt={displayName}
                            className="w-24 h-24 object-cover"
                            onError={(e) => (e.target.src = "/fallback.png")}
                          />
                          {/* Cart icon overlay */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="p-1.5 bg-white/90 rounded-full shadow-lg">
                              <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L9 14m0 0h8m-8 0V9a3 3 0 013-3h2a3 3 0 013 3v5" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 mb-2">
                            {displayName}
                          </h3>

                          {isPet ? (
                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex items-center gap-4">
                                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Breed: {item.breed || "N/A"}
                                </span>
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Age: {item.age || "Unknown"} {item.age === 1 ? "year" : "years"} old
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                <span className="text-2xl font-bold text-orange-600">₹{displayPrice}</span>
                                <span className="text-sm text-gray-500">(One-time adoption fee)</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="text-2xl font-bold text-orange-600">₹{displayPrice}</span>
                              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                                <span className="text-gray-600">Quantity:</span>
                                <button
                                  onClick={() => handleQuantityChange("decrease", item.id)}
                                  className="w-8 h-8 bg-orange-200 text-orange-700 rounded-full hover:bg-orange-300 transition-colors duration-200 flex items-center justify-center font-bold"
                                  disabled={itemQuantity <= 1}
                                >
                                  −
                                </button>
                                <span className="mx-2 font-semibold text-gray-800 min-w-[20px] text-center">
                                  {itemQuantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange("increase", item.id)}
                                  className="w-8 h-8 bg-orange-200 text-orange-700 rounded-full hover:bg-orange-300 transition-colors duration-200 flex items-center justify-center font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Price and Remove Button */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">
                              ₹{displayPrice * itemQuantity}
                            </p>
                            {!isPet && (
                              <p className="text-sm text-gray-500">
                                {itemQuantity} × ₹{displayPrice}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="bg-red-100 text-red-600 p-3 rounded-full hover:bg-red-200 hover:text-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            title="Remove item"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 transform transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Order Summary</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Ready for checkout</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold text-gray-800">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-orange-100">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-orange-600">₹{totalPrice}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleClearCart}
                    className="flex-1 bg-red-100 text-red-600 px-6 py-3 rounded-xl hover:bg-red-200 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear Cart
                  </button>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="flex-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>

            {/* Creative Sidebar */}
            <div className="hidden lg:block w-80 space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Cart Summary</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-bold text-orange-600">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Quantity</span>
                    <span className="font-bold text-orange-600">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-bold text-orange-600">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Savings</span>
                    <span className="font-bold text-green-600">FREE Shipping</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/pets")}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate("/wishlist")}
                    className="w-full bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    View Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-modal-appear">
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Action</h3>
              <p className="text-gray-600">
                {itemToRemove
                  ? "Are you sure you want to remove this item from your cart?"
                  : "Are you sure you want to clear your entire cart?"}
              </p>
            </div>

            {/* Modal Content */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>This action cannot be undone</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Yes, {itemToRemove ? "Remove" : "Clear All"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* React Hot Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
};

export default Cart;