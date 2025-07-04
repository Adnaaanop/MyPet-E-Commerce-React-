import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
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
                </div>
              </div>
              <p className="font-bold text-green-600">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">
            Total: ₹{totalPrice}
          </div>

          <div className="text-right mt-4">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
