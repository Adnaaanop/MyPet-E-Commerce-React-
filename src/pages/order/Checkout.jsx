import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/base";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to place an order.");
      return;
    }

    const newOrder = {
      userId,
      items: cartItems,
      total: totalPrice,
      status: "Placed",
      placedAt: new Date().toISOString(),
    };

    try {
      // Step 1: Save order
      await axios.post(`${BASE_URL}/orders`, newOrder);

      // Step 2: Update stock for each product
      for (const item of cartItems) {
        const updatedStock = item.stock - item.quantity;

        await axios.patch(`${BASE_URL}/products/${item.id}`, {
          stock: updatedStock,
        });
      }

      // Step 3: Clear cart
      clearCart();
      alert("✅ Order placed successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Failed to place order. Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🧾 Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded shadow"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <p className="font-bold text-green-600">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">
            Total: ₹{totalPrice}
          </div>

          <div className="text-right mt-6">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Place Order (COD)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
