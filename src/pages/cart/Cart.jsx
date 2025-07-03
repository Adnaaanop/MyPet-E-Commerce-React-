import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

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
                  <p className="text-sm text-gray-600">
                    ₹{item.price} x {item.quantity}
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
        </div>
      )}
    </div>
  );
};

export default Cart;
