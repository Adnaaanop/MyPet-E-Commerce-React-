import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/base";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    pincode: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeFinalOrder = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to place an order.");
      return;
    }

    const newOrder = {
      userId,
      items: cartItems,
      total: totalPrice,
      address,
      status: "Placed",
      placedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post(`${BASE_URL}/orders`, newOrder);
      const savedOrder = res.data;

      for (const item of cartItems) {
        const updatedStock = item.stock - item.quantity;

        if (item.productId) {
          await axios.patch(`${BASE_URL}/products/${item.productId}`, {
            stock: updatedStock,
          });
        } else {
          console.warn("Missing productId for cart item:", item);
        }
      }

      clearCart();
      navigate("/order-summary", { state: { order: savedOrder } });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Failed to place order. Try again.");
    }
  };

  const handlePlaceOrder = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to place an order.");
      return;
    }

    if (!address.street || !address.city || !address.pincode) {
      alert("Please fill all address fields.");
      return;
    }

    setShowConfirm(true);
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
              className="flex items-center justify-between border p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
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

          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-semibold">Shipping Address</h3>
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
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

      {/* Order Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-md">
            <p className="mb-4 text-gray-800 font-semibold">
              Are you sure you want to place this order? <br />
              <span className="text-sm text-gray-500">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={placeFinalOrder}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Yes, Place Order
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

export default Checkout;
