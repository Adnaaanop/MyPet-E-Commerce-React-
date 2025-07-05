import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/base";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`${BASE_URL}/orders?userId=${userId}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [userId]);

  if (!userId) {
    return <p className="text-center mt-10 text-red-600">Please login to view your orders.</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center mt-10 text-gray-600">You haven't placed any orders yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📦 My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 mb-6 shadow">
          <div className="mb-2">
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Placed At:</strong> {new Date(order.placedAt).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
          </div>

          <div className="mt-3">
            <p className="font-semibold mb-2">Items:</p>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border p-2 rounded mb-2">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-green-600 font-medium">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
