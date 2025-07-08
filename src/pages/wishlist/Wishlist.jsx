import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishListContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const filteredWishlist = wishlist.filter(item => item.userId === userId);

  const handleMoveToCart = async (item) => {
    if (!userId) {
      alert("Please login to move items to cart.");
      return;
    }

    try {
      await addToCart({ ...item, quantity: 1 });
      await removeFromWishlist(item.productId);
    } catch (err) {
      console.error("Failed to move item to cart:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">❤️ Your Wishlist</h2>

      {filteredWishlist.length === 0 ? (
        <p className="text-gray-600">No items in your wishlist.</p>
      ) : (
        <div className="space-y-4">
          {filteredWishlist.map((item) => (
            <div
              key={`${item.id}-${item.userId}`}
              className="flex items-center justify-between border p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.productId)}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
