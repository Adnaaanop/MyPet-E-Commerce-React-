import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import api from "../../services/api"; // Import Axios instance
import { FaHeart, FaRegHeart, FaArrowLeft, FaStar, FaShoppingCart, FaBox, FaInfoCircle, FaPlus, FaMinus } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isLoggedIn } = useAuth(); // Get login status

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to your cart.", {
        duration: 3000,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #f3f4f6",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "🔐",
      });
      navigate("/login");
      return;
    }

    try {
      await addToCart({ productId: product.id, petId: null, quantity });
      toast.success(`${product.name} added to cart!`, {
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
    } catch (err) {
      console.error("Error adding product to cart:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.", {
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
        navigate("/login");
      } else {
        toast.error("Failed to add to cart. Please try again.", {
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
          icon: "❌",
        });
      }
    }
  };

  const handleToggleWishlist = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to your wishlist.", {
        duration: 3000,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #f3f4f6",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "🔐",
      });
      navigate("/login");
      return;
    }

    const isCurrentlyWishlisted = isInWishlist(product?.id);
    toggleWishlist(product);

    if (isCurrentlyWishlisted) {
      toast(`${product.name} removed from wishlist`, {
        duration: 2000,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "💔",
      });
    } else {
      toast.success(`${product.name} added to wishlist!`, {
        duration: 2000,
        style: {
          background: "#ffffff",
          color: "#374151",
          border: "1px solid #f97316",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "💖",
      });
    }
  };

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-orange-200/25 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-28 h-28 bg-orange-300/30 rounded-full animate-bounce" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-orange-400/25 rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 bg-orange-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-16 w-20 h-20 bg-orange-300/25 rounded-full animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3s" }}></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 bg-orange-400/20 rounded-full animate-ping" style={{ animationDelay: "1s", animationDuration: "4s" }}></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-orange-200/20 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-8 w-12 h-12 bg-orange-300/30 rounded-full animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "2.5s" }}></div>
        <div className="absolute top-1/3 right-8 w-18 h-18 bg-orange-400/20 rounded-full animate-pulse" style={{ animationDelay: "3s" }}></div>
        <div className="absolute top-2/3 left-1/3 w-10 h-10 bg-orange-300/25 rounded-full animate-ping" style={{ animationDelay: "2.5s", animationDuration: "3.5s" }}></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button
          onClick={() => navigate("/products")}
          className="group flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 bg-white px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Products</span>
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-80 md:h-96 object-cover"
                style={{
                  minHeight: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-20"></div>
              <button
                onClick={handleToggleWishlist}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg z-30"
              >
                {isInWishlist(product?.id) ? (
                  <FaHeart className="text-red-500 text-lg" />
                ) : (
                  <FaRegHeart className="text-gray-600 text-lg" />
                )}
              </button>
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-full shadow-lg z-30">
                <span className="text-xl font-bold">₹{product.price}</span>
              </div>
              <div className="absolute top-4 left-4 z-30">
                {product.stock > 0 ? (
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    In Stock
                  </div>
                ) : (
                  <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="space-y-5">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{product.stock} units available</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-yellow-500 rounded-full">
                        <FaStar className="text-white text-xs" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="font-semibold text-gray-800 text-sm">{product.rating} ⭐</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-500 rounded-full">
                        <FaBox className="text-white text-xs" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Stock</p>
                        <p className="font-semibold text-gray-800 text-sm">{product.stock} units</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-orange-800 text-sm">Quantity</p>
                      <p className="text-xs text-orange-700 mt-1">
                        Choose how many you want to add
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={decreaseQty}
                        className="p-2 bg-white border border-orange-300 rounded-full hover:bg-orange-50 transition-colors duration-300 disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <FaMinus className="text-orange-600 text-xs" />
                      </button>
                      <span className="w-8 text-center font-semibold text-orange-800">
                        {quantity}
                      </span>
                      <button
                        onClick={increaseQty}
                        className="p-2 bg-white border border-orange-300 rounded-full hover:bg-orange-50 transition-colors duration-300 disabled:opacity-50"
                        disabled={quantity >= product.stock}
                      >
                        <FaPlus className="text-orange-600 text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.stock === 0}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FaShoppingCart className="text-lg" />
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </span>
                  </button>
                </div>
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <FaInfoCircle className="text-orange-500 text-sm mt-1" />
                    <div>
                      <p className="font-semibold text-orange-800 text-sm">Product Information</p>
                      <p className="text-xs text-orange-700 mt-1">
                        All products come with warranty and quality guarantee.
                        Fast shipping and secure payment options available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default ProductDetails;