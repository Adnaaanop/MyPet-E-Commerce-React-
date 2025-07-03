import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded shadow p-4 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover mb-4 rounded"
      />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-700">₹{product.price}</p>
      <button
        onClick={() => navigate(`/products/${product.id}`)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
