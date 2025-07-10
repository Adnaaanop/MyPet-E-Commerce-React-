import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/base";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`${BASE_URL}/orders?userId=${userId}`)
        .then((res) => {
          setOrders(res.data);
          setFilteredOrders(res.data);
        })
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [userId]);

  useEffect(() => {
    let filtered = [...orders];

    if (statusFilter) {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.placedAt) - new Date(b.placedAt));
    } else if (sortOrder === "low") {
      filtered.sort((a, b) => a.total - b.total);
    } else if (sortOrder === "high") {
      filtered.sort((a, b) => b.total - a.total);
    }

    setFilteredOrders(filtered);
  }, [statusFilter, sortOrder, orders]);

  const clearFilters = () => {
    setStatusFilter("");
    setSortOrder("");
  };

  const getProgressPercent = (status) => {
    switch (status) {
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

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 text-xs rounded font-medium";
    switch (status) {
      case "Placed":
        return <span className={`${base} bg-blue-100 text-blue-700`}>Placed</span>;
      case "Shipped":
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>Shipped</span>;
      case "Delivered":
        return <span className={`${base} bg-green-100 text-green-700`}>Delivered</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;
    }
  };

  if (!userId) {
    return <p className="text-center mt-10 text-red-600">Please login to view your orders.</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">
        🐾 You haven’t placed any orders yet. Start shopping now!
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-64 space-y-4">
        <div className="sticky top-20 bg-white p-4 border rounded shadow space-y-3">
          <h3 className="font-semibold text-gray-700">🔍 Filters</h3>

          {/* Filter by Status */}
          <select
            className="w-full border p-2 rounded text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Placed">Placed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

          {/* Sort */}
          <select
            className="w-full border p-2 rounded text-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="newest">📅 Newest First</option>
            <option value="oldest">📅 Oldest First</option>
            <option value="low">💸 Total: Low to High</option>
            <option value="high">💸 Total: High to Low</option>
          </select>

          <button
            onClick={clearFilters}
            className="w-full bg-gray-100 text-gray-700 text-sm py-1 rounded hover:bg-gray-200"
          >
            🔁 Clear Filters
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">📦 My Orders</h2>

        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white border shadow-md rounded-lg p-5 space-y-4 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <div>
                <p className="text-gray-700 text-sm">
                  🧾 <strong>Order ID:</strong> #{order.id}
                </p>
                <p className="text-sm text-gray-500">
                  📅 {new Date(order.placedAt).toLocaleString()}
                </p>
              </div>
              <div className="text-sm space-x-2">
                {getStatusBadge(order.status)}
                <span className="font-semibold">Total: ₹{order.total}</span>
              </div>
            </div>

            <div>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : order.status === "Shipped"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${getProgressPercent(order.status)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Placed</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>

            <div>
              <p className="font-medium mb-2 text-gray-700">🐶 Items:</p>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border p-3 rounded bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {order.status !== "Delivered" && (
              <p className="text-sm text-gray-500 mt-2">
                ⏳ <strong>Estimated Delivery:</strong>{" "}
                {new Date(
                  new Date(order.placedAt).getTime() + 5 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
