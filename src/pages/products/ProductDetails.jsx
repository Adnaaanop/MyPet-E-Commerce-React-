import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/base";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) return <div className="text-center p-8">Loading...</div>;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Avoid duplicates
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      alert("Product is already in the cart.");
      return;
    }

    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/products")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
      >
        ← Back to Products
      </button>

      <div className="bg-white shadow-md rounded p-6 flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl font-semibold text-green-600 mb-2">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Rating: {product.rating} ⭐
          </p>
          <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
          <p className="mb-6">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
