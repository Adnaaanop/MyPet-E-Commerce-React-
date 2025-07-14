import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/base";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  // const userId = localStorage.getItem("userId");


  const [address, setAddress] = useState({
    street: "",
    city: "",
    pincode: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

const placeFinalOrder = async () => {
  try {
    const userId = localStorage.getItem("userId");

    for (const item of cartItems) {
      const endpoint = item.type === "pet" ? "pets" : "products";
      const res = await axios.get(`${BASE_URL}/${endpoint}`);
      const data = res.data;

      const actualItem = data.find(el => el.name === item.name);
      if (!actualItem) continue;

      const updatedStock = actualItem.stock - item.quantity;

      await axios.patch(`${BASE_URL}/${endpoint}/${actualItem.id}`, {
        stock: updatedStock,
      });
    }

    const orderData = {
      items: cartItems,
      userId,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      address: {
        street: "123 Pet Street",
        city: "PetCity",
        pincode: "123456"
      },
      status: "Placed",
      placedAt: new Date().toISOString()
    };

    const res = await axios.post(`${BASE_URL}/orders`, orderData);
    const newOrder = res.data;

    await Promise.all(cartItems.map(item => axios.delete(`${BASE_URL}/cart/${item.id}`)));

    navigate("/order-summary", { state: { order: newOrder } });

  } catch (error) {
    console.error("Error placing order:", error);
  }
};



  const handlePlaceOrder = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please log in to place an order.", {
        duration: 3000,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #ef4444",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "🔐",
      });
      return;
    }

    if (!address.street || !address.city || !address.pincode) {
      toast.error("Please fill all address fields.", {
        duration: 3000,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #ef4444",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "⚠️",
      });
      return;
    }

    setShowConfirm(true);
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
            🧾 Checkout
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            Almost there! Just a few more steps to get your lovely pets
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-105">
              <svg
                className="w-16 h-16 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L9 14m0 0h8m-8 0V9a3 3 0 013-3h2a3 3 0 013 3v5"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Add some adorable pets to your cart before proceeding to checkout!
            </p>
            <button
              onClick={() => navigate("/pets")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              Browse Lovely Pets
            </button>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Main Content Area */}
            <div className="flex-1 max-w-4xl">
              {/* Order Summary Header */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Order Summary ({cartItems.length}{" "}
                      {cartItems.length === 1 ? "Item" : "Items"})
                    </h2>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-gray-600">
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">Secure checkout</span>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in-up delay-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L9 14m0 0h8m-8 0V9a3 3 0 013-3h2a3 3 0 013 3v5"
                    />
                  </svg>
                  Your Items
                </h3>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between border border-gray-100 p-4 rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] relative overflow-hidden"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Decorative gradient line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                      <div className="flex items-center gap-4">
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <span className="font-medium">₹{item.price}</span>
                            <span>×</span>
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-600">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in-up delay-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 pl-12"
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 pl-12"
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 pl-12"
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block w-80 space-y-6">
              {/* Order Total Card */}
              {/* Order Bill Card */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Order Bill
                    </h3>
                    <p className="text-sm text-gray-600">Invoice Details</p>
                  </div>
                </div>

                {/* Bill Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b border-orange-200 last:border-b-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bill Summary */}
                <div className="bg-white rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-semibold text-gray-800">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Tax & Fees</span>
                    <span className="font-semibold text-green-600">₹0</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        Total Amount
                      </span>
                      <span className="text-xl font-bold text-orange-600">
                        ₹{totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Place Order (COD)
                </button>
              </div>

              {/* Payment Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl animate-fade-in-up delay-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Payment & Security
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">Cash on Delivery</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">100% Secure</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">No Hidden Charges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Order Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 transform transition-all duration-300 scale-100 animate-modal-enter">
            {/* Animated checkmark */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Confirm Your Order
            </h3>

            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-2xl font-bold text-orange-600">
                  ₹{totalPrice}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Payment Method:</span>
                <span className="font-medium">Cash on Delivery</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to place this order?
              <br />
              <span className="text-sm text-gray-500">
                This action cannot be undone.
              </span>
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={placeFinalOrder}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Yes, Place Order
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

        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
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

export default Checkout;
