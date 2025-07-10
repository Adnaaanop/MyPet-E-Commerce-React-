// src/pages/admin/OrderDetailsModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/base";

const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [newStatus, setNewStatus] = useState(order.status);

  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, [order]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${order.userId}`);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      const productMap = {};
      res.data.forEach((prod) => {
        productMap[prod.id] = prod;
      });

      const productDetails = order.items.map((item) => {
        return {
          ...item,
          title: item.name,
        };
      });

      setProducts(productDetails);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleSave = () => {
    onUpdateStatus(order.id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-4 text-xl font-bold"
          onClick={onClose}
        >
          ✖️
        </button>

        <h3 className="text-xl font-semibold mb-4">Order Details</h3>

        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>User ID:</strong> {order.userId}</p>
        <p><strong>User Name:</strong> {user?.name || "Loading..."}</p>
        <p><strong>Date:</strong> {new Date(order.placedAt).toLocaleString()}</p>
        <p><strong>Total:</strong> ₹{order.total}</p>

        {/* 🏠 Address Section */}
        {order.address && (
          <div className="mt-2 mb-4 text-sm text-gray-700">
            <p><strong>Address:</strong></p>
            <p>{order.address.street}, {order.address.city}</p>
            <p>Pincode: {order.address.pincode}</p>
          </div>
        )}

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Products:</h4>
          <ul className="list-disc list-inside space-y-1">
            {products.length === 0 ? (
              <p>Loading products...</p>
            ) : (
              products.map((prod, idx) => (
                <li key={idx}>
                  {prod.title} × {prod.quantity} (₹{prod.price} each)
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="mt-6">
          <label className="block font-semibold mb-1">Update Status:</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
