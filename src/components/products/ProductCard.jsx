import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishListContext";
import { FaHeart, FaRegHeart, FaEye, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist } = useWishlist();

  const isPet = product.hasOwnProperty("breed") && product.hasOwnProperty("age");
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 p-4 cursor-pointer overflow-hidden relative">
  
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-600 text-lg" />
          )}
        </button>

        {/* Quick action button  hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-3">
            <Link
              to={`/${isPet ? "pets" : "products"}/${product.id}`}
              className="p-3 bg-white rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaEye className="text-lg" />
            </Link>
            {!isPet && (
              <button className="p-3 bg-white rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaShoppingCart className="text-lg" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ₹{product.price}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>

        {/* Pet information */}
        {isPet && (
          <div className="space-y-1">
            <p className="text-sm text-gray-600 font-medium">{product.breed}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Age: {product.age} year(s)
              </span>
            </div>
          </div>
        )}

        {/* Product information */}
        {!isPet && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? "text-yellow-400 fill-current" 
                      : "text-gray-300 fill-current"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
            </div>
          </div>
        )}

        {/* Action button thatt slides up- hover */}
        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pt-2">
          <Link
            to={`/${isPet ? "pets" : "products"}/${product.id}`}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <FaEye className="text-sm" />
            {isPet ? "Meet " + product.name : "View Details"}
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-400 to-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
      
      {/* Corner  */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[25px] border-l-transparent border-t-[25px] border-t-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default ProductCard;