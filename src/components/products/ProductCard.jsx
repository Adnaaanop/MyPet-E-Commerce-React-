import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishListContext";
// import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-bold text-lg">{product.name}</h3>
      <p className="text-green-600 font-semibold mb-1">₹{product.price}</p>
      <p className="text-sm text-gray-500 mb-2">Rating: {product.rating} ⭐</p>
      <Link
        to={`/products/${product.id}`}
        className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Details
      </Link>

      {/* ❤️ Wishlist button */}
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
