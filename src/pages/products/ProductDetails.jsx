import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/base";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    addToCart({ ...product, quantity });
    alert("Product added to cart!");
  };

  const handleToggleWishlist = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    toggleWishlist(product);
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

  if (!product) return <div className="text-center p-8">Loading...</div>;

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
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button onClick={handleToggleWishlist}>
              {isInWishlist(product?.id) ? (
                <FaHeart className="text-red-500 text-2xl" />
              ) : (
                <FaRegHeart className="text-gray-500 text-2xl" />
              )}
            </button>
          </div>

          <p className="text-xl font-semibold text-green-600 mb-2">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Rating: {product.rating} ⭐
          </p>
          <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
          <p className="mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border px-3 py-1 rounded">
              <button
                onClick={decreaseQty}
                className="text-lg px-2 font-bold text-gray-700 hover:text-black"
              >
                –
              </button>
              <span className="px-2">{quantity}</span>
              <button
                onClick={increaseQty}
                className="text-lg px-2 font-bold text-gray-700 hover:text-black"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
