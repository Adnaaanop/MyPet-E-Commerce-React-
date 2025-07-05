// src/components/products/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishListContext";

const ProductCard = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isPet =
    product.hasOwnProperty("breed") && product.hasOwnProperty("age");
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 relative hover:shadow-lg transition-all">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="mt-2 font-bold text-lg">{product.name}</h3>

      {/* 🐾 Pet-specific info */}
      {isPet && (
        <>
          <p className="text-sm text-gray-500">{product.breed}</p>
          <p className="text-sm text-gray-500">Age: {product.age} year(s)</p>
        </>
      )}

      <p className="text-green-600 font-semibold mb-1">₹{product.price}</p>

      {/* ⭐ Product rating */}
      {!isPet && (
        <p className="text-sm text-gray-500 mb-2">
          Rating: {product.rating} ⭐
        </p>
      )}

      {/* 🔗 View Details */}
      <Link
        to={`/${isPet ? "pets" : "products"}/${product.id}`}
        className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
      >
        View Details
      </Link>

      {/* ❤️ Wishlist toggle (for all) */}
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 text-red-500 text-xl"
        title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isInWishlist ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default ProductCard;
