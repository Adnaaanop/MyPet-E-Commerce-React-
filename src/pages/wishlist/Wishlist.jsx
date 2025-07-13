import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishListContext";
import toast, { Toaster } from 'react-hot-toast';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const filteredWishlist = wishlist.filter(item => item.userId === userId);

  const handleMoveToCart = async (item) => {
    if (!userId) {
      toast.error("Please login to move items to cart.", {
        duration: 3000,
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #f3f4f6',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          fontWeight: '500',
        },
        icon: '🔐',
      });
      return;
    }

    try {
      await addToCart({ ...item, quantity: 1 });
      await removeFromWishlist(item.productId);
      
      toast.success("Item moved to cart successfully!", {
        duration: 3000,
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #10b981',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          fontWeight: '500',
        },
        icon: '✅',
      });
    } catch (err) {
      console.error("Failed to move item to cart:", err);
      
      toast.error("Something went wrong! Please try again.", {
        duration: 3000,
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          fontWeight: '500',
        },
        icon: '❌',
      });
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId);
      
      toast("Item removed from wishlist", {
        duration: 2000,
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          fontWeight: '500',
        },
        icon: '🗑️',
      });
    } catch (err) {
      console.error("Failed to remove item from wishlist:", err);
      
      toast.error("Failed to remove item. Please try again.", {
        duration: 3000,
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          fontWeight: '500',
        },
        icon: '❌',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5ee] font-sans">
      {/* Hero Section - Matching PetList style */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 animate-fade-in-up"
            style={{
              fontFamily: '"Fredoka One", cursive',
              lineHeight: "1.1",
            }}
          >
            Your Wishlist
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            {filteredWishlist.length} {filteredWishlist.length === 1 ? 'lovely pet' : 'lovely pets'} waiting for your attention
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredWishlist.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-105">
              <svg className="w-16 h-16 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your wishlist is empty</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Start adding adorable pets you love to your wishlist and never lose track of your favorites!
            </p>
            <button
              onClick={() => navigate('/pets')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              Browse Lovely Pets
            </button>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Main Content Area - Reduced width */}
            <div className="flex-1 max-w-4xl">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {filteredWishlist.length} {filteredWishlist.length === 1 ? 'Item' : 'Items'} in Your Wishlist
                    </h2>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="font-medium">Your favorites</span>
                  </div>
                </div>
              </div>

              {/* Wishlist Cards - Compact Layout */}
              <div className="grid gap-4 animate-fade-in-up">
                {filteredWishlist.map((item, index) => (
                  <div
                    key={`${item.id}-${item.userId}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] p-4 overflow-hidden relative"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Decorative gradient line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Heart icon overlay */}
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="p-1.5 bg-white/90 rounded-full shadow-lg">
                            <svg className="w-3 h-3 text-red-500 fill-current" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold text-orange-600">₹{item.price}</span>
                          
                          {/* Rating stars */}
                          <div className="flex items-center gap-1 ml-3">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 font-medium text-sm flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L9 14m0 0h8m-8 0V9a3 3 0 013-3h2a3 3 0 013 3v5" />
                          </svg>
                          Move to Cart
                        </button>
                        
                        <button
                          onClick={() => handleRemoveFromWishlist(item.productId)}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-all duration-300 transform hover:scale-105 font-medium text-sm flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creative Sidebar */}
            <div className="hidden lg:block w-80 space-y-6">
              {/* Wishlist Stats Card */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Wishlist Stats</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-bold text-orange-600">{filteredWishlist.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-bold text-orange-600">
                      ₹{filteredWishlist.reduce((sum, item) => sum + item.price, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Price</span>
                    <span className="font-bold text-orange-600">
                      ₹{filteredWishlist.length > 0 ? Math.round(filteredWishlist.reduce((sum, item) => sum + item.price, 0) / filteredWishlist.length) : 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/pets')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add More Pets
                  </button>
                  <button
                    onClick={() => {
                      filteredWishlist.forEach(item => handleMoveToCart(item));
                    }}
                    className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L9 14m0 0h8m-8 0V9a3 3 0 013-3h2a3 3 0 013 3v5" />
                    </svg>
                    Move All to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
            fontSize: '14px',
            fontWeight: '500',
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
        
        @keyframes float {
          0% {
            transform: translateY(100px) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float linear infinite;
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

export default Wishlist;