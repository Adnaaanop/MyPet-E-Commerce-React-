import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    setShowConfirm(true);
    setItemToRemove(null); // this means it's for "clear all"
  };

  const handleRemoveItem = (itemId) => {
    setItemToRemove(itemId);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
    } else {
      clearCart();
    }
    setShowConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const isPet = item.breed && item.age;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>

                    {isPet ? (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Breed: {item.breed}</p>
                        <p>
                          Age: {item.age} {item.age === 1 ? "year" : "years"} old
                        </p>
                        <p>Price: ₹{item.price}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        ₹{item.price} x
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        {item.quantity}
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold text-green-600">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="text-right font-bold text-xl mt-4">
            Total: ₹{totalPrice}
          </div>

          <div className="text-right mt-4 space-x-2">
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              🗑️ Clear Cart
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4 text-gray-800 font-semibold">
              {itemToRemove
                ? "Are you sure you want to remove this item from cart?"
                : "Are you sure you want to clear your cart?"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
