import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/base";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedOrder = location.state?.order;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = passedOrder?.id;
        if (!orderId) return;

        const res = await axios.get(`${BASE_URL}/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };

    fetchOrder();
  }, [passedOrder?.id]);

  const getProgressPercent = () => {
    switch (order?.status) {
      case "Placed":
        return 33;
      case "Shipped":
        return 66;
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  if (!order) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading latest order info...
      </div>
    );
  }

  const { items, total, address, status, placedAt, id } = order;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Order Summary</h2>

      <div className="bg-white shadow-md rounded p-6 space-y-4">
        <p><strong>Order ID:</strong> {id}</p>
        <p><strong>Date:</strong> {new Date(placedAt).toLocaleString()}</p>

        {/* Progress Tracker */}
        <div>
          <strong>Status:</strong> {status}
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                status === "Delivered"
                  ? "bg-green-500"
                  : status === "Shipped"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
              style={{ width: `${getProgressPercent()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Placed</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>
        </div>

        {/* Estimated Delivery */}
        <p className="mt-4 text-sm text-gray-600">
          📦 <span className="font-medium">Estimated Delivery:</span> 3–5 days
        </p>

        <div>
          <strong>Shipping Address:</strong>
          <p>{address.street}, {address.city}, {address.pincode}</p>
        </div>

        <div>
          <strong>Items:</strong>
          <div className="space-y-2 mt-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-3 rounded"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-green-600">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-right font-bold text-xl mt-4">
          Total: ₹{total}
        </p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
