
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/base";
import OrderDetailsModal from "./OrderDetailsModal";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/orders`);
      setOrders(res.data);
      setFilteredOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    if (status === "") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((o) => o.status === status));
    }
  };

  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    let sorted = [...filteredOrders];
    if (criteria === "newest") {
      sorted.sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
    } else if (criteria === "oldest") {
      sorted.sort((a, b) => new Date(a.placedAt) - new Date(b.placedAt));
    }
    setFilteredOrders(sorted);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`${BASE_URL}/orders/${id}`, {
        ...selectedOrder,
        status: newStatus,
      });
      fetchOrders(); 
      closeModal();
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  //  Stats
  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const shippedCount = orders.filter((o) => o.status === "Shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-lg font-semibold">{pendingCount}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Shipped</p>
          <p className="text-lg font-semibold">{shippedCount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Delivered</p>
          <p className="text-lg font-semibold">{deliveredCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Sort By</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Orders Table */}
      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">User ID</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="py-2 px-4 border">{order.id}</td>
                  <td className="py-2 px-4 border">{order.userId}</td>
                  <td className="py-2 px-4 border">{order.status}</td>
                  <td className="py-2 px-4 border">
                    {new Date(order.placedAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border">₹{order.total}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      title="View"
                      onClick={() => openModal(order)}
                      className="text-blue-500 hover:underline"
                    >
                      view
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={closeModal}
          onUpdateStatus={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default ManageOrders;
