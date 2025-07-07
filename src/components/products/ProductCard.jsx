import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishListContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist } = useWishlist();

  const isPet =
    product.hasOwnProperty("breed") && product.hasOwnProperty("age");
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bg-white shadow-md rounded p-4 relative hover:shadow-lg transition-all">
      {/*  Wishlist */}
      {/* <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3"
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FaRegHeart className="text-gray-400 text-xl" />
        )}
      </button> */}

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="mt-2 font-bold text-lg">{product.name}</h3>

      {/*  pet only data  */}
      {isPet && (
        <>
          <p className="text-sm text-gray-500">{product.breed}</p>
          <p className="text-sm text-gray-500">Age: {product.age} year(s)</p>
        </>
      )}

      <p className="text-green-600 font-semibold mb-1">₹{product.price}</p>

      {/* rating of products only */}
      {!isPet && (
        <p className="text-sm text-gray-500 mb-2">
          Rating: {product.rating} ⭐
        </p>
      )}

      <Link
        to={`/${isPet ? "pets" : "products"}/${product.id}`}
        className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
 