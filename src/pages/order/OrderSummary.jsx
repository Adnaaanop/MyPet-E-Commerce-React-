import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-red-600">No order data found.</h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h2>
      <p className="text-lg mb-2">Order ID: <strong>#{order.id || "N/A"}</strong></p>
      <p className="text-lg mb-2">Total Amount: ₹{order.total}</p>
      <p className="text-lg mb-6">
        Shipping To: {order.address.street}, {order.address.city} - {order.address.pincode}
      </p>

      <button
        onClick={() => navigate("/my-orders")}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        View My Orders
      </button>
    </div>
  );
};

export default OrderSummary;
