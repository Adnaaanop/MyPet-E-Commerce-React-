import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/base";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext"; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist(); 

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) return <div className="text-center p-8">Loading...</div>;

  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    addToCart(product);
    alert("Product added to cart!");
  };

  const handleAddToWishlist = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    addToWishlist(product);
    alert("Product added to wishlist!");
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

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
               Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
