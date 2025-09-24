import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";
import api from "../../services/api"; // Use the same api instance as ProductDetails
import { FaHeart, FaRegHeart, FaArrowLeft, FaPaw, FaCalendarAlt, FaTag } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth(); // Use AuthContext for login status

  useEffect(() => {
    api
      .get(`/pets/${id}`)
      .then((res) => {
        const petData = res.data?.data || null;
        setPet(petData);
      })
      .catch((err) => console.error("Error fetching pet details", err));
  }, [id]);

  const handleAdoptNow = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to adopt a pet.", {
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
      navigate("/login"); // Navigate to login
      return;
    }

    try {
      console.log("Adding pet to cart:", { productId: null, petId: pet.id, quantity: 1 }); // Debug log
      await addToCart({ productId: null, petId: pet.id, quantity: 1 });
      toast.success(`${pet.name} is ready to adopt!`, {
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
        icon: "✅",
      });
      navigate("/cart"); // Navigate to cart after success
    } catch (err) {
      console.error("Error adding pet to cart:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
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
        const errorMessage = err.response?.data?.message || err.message || "Something went wrong. Please try again.";
        toast.error(errorMessage, {
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

    const isCurrentlyWishlisted = isInWishlist(pet?.id);
    toggleWishlist(pet);

    if (isCurrentlyWishlisted) {
      toast(`${pet.name} removed from wishlist`, {
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
      toast.success(`${pet.name} added to wishlist!`, {
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

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-orange-200/25 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-28 h-28 bg-orange-300/30 rounded-full animate-bounce" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-orange-400/25 rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading pet details...</p>
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
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 bg-white px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back</span>
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <img
                src={pet.imageUrl}
                alt={pet.name}
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
                {isInWishlist(pet?.id) ? (
                  <FaHeart className="text-red-500 text-lg" />
                ) : (
                  <FaRegHeart className="text-gray-600 text-lg" />
                )}
              </button>
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-full shadow-lg z-30">
                <span className="text-xl font-bold">₹{pet.price}</span>
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="space-y-5">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{pet.name}</h1>
                  <p className="text-gray-500">Looking for a loving home</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-500 rounded-full">
                        <FaPaw className="text-white text-xs" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Breed</p>
                        <p className="font-semibold text-gray-800 text-sm">{pet.breed}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-500 rounded-full">
                        <FaCalendarAlt className="text-white text-xs" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="font-semibold text-gray-800 text-sm">{pet.age} year(s)</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">About {pet.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pet.name} is a wonderful {pet.breed} looking for a loving family. At {pet.age} year(s) old, they're ready to bring joy and companionship to your home. Give {pet.name} the loving home they deserve!
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={handleAdoptNow}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FaHeart className="text-lg" />
                      Adopt {pet.name} Now
                    </span>
                  </button>
                </div>
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <FaTag className="text-orange-500 text-sm mt-1" />
                    <div>
                      <p className="font-semibold text-orange-800 text-sm">Adoption Information</p>
                      <p className="text-xs text-orange-700 mt-1">
                        All our pets are health-checked and ready for their new homes. Adoption includes initial vaccinations and health certificate.
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

export default PetDetails;