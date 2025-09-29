import React, { useEffect, useState } from "react";
import api from "../../services/api"; // Use custom api instance
import { BASE_URL } from "../../services/base";
import toast, { Toaster } from "react-hot-toast"; // Added Toaster for consistency
import { useNavigate } from "react-router-dom"; // Added for navigation

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For redirecting on error

  console.log(orders);
  

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        toast.error("Please log in to view your orders.", {
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#374151",
            border: "1px solid #ef4444",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            fontSize: "14px",
            fontWeight: "500",
          },
          icon: "🔐",
        });
        navigate("/login");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`${BASE_URL}/orders?userId=${userId}`);
        const fetchedOrders = res.data.data || res.data; // Handle ApiResponse
        console.log(fetchedOrders);
        
        setOrders(fetchedOrders.orders || []);
        setFilteredOrders(fetchedOrders.orders || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#374151",
              border: "1px solid #ef4444",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              fontSize: "14px",
              fontWeight: "500",
            },
            icon: "🔐",
          });
          navigate("/login");
        } else {
          toast.error("Failed to load orders.", {
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#374151",
              border: "1px solid #ef4444",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              fontSize: "14px",
              fontWeight: "500",
            },
            icon: "⚠️",
          });
        }
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, navigate]);

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
      filtered.sort((a, b) => (a.total || 0) - (b.total || 0));
    } else if (sortOrder === "high") {
      filtered.sort((a, b) => (b.total || 0) - (a.total || 0));
    }

    setFilteredOrders(filtered);
  }, [statusFilter, sortOrder, orders]);

  const clearFilters = () => {
    setStatusFilter("");
    setSortOrder("");
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 text-sm rounded-full font-semibold transition-all duration-300";
    switch (status) {
      case "Placed":
        return <span className={`${base} bg-blue-100 text-blue-700 shadow-md`}>Placed</span>;
      case "Shipped":
        return <span className={`${base} bg-yellow-100 text-yellow-700 shadow-md`}>Shipped</span>;
      case "Delivered":
        return <span className={`${base} bg-green-100 text-green-700 shadow-md`}>Delivered</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-700 shadow-md`}>{status || "Unknown"}</span>;
    }
  };

  const getTimelineSteps = (status) => {
    const steps = [
      { 
        key: "Placed", 
        label: "Order Placed", 
        icon: "📋",
        color: "bg-blue-500",
        lightColor: "bg-blue-100"
      },
      { 
        key: "Shipped", 
        label: "Order Shipped", 
        icon: "🚚",
        color: "bg-yellow-500",
        lightColor: "bg-yellow-100"
      },
      { 
        key: "Delivered", 
        label: "Delivered", 
        icon: "✅",
        color: "bg-green-500",
        lightColor: "bg-green-100"
      }
    ];

    const currentIndex = steps.findIndex(step => step.key === status);
    
    return steps.map((step, index) => ({
      ...step,
      isActive: index <= currentIndex,
      isCurrent: index === currentIndex
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff5ee] flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff5ee] flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h3>
          <p className="text-gray-600 text-lg mb-6">🐾 You haven't placed any orders yet. Start shopping now!</p>
          <button 
            onClick={() => navigate("/pets")} // Assuming /pets is the shopping page
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5ee] font-sans">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{ zIndex: 9999 }}
        toastOptions={{
          duration: 3000,
          style: { fontSize: "14px", fontWeight: "500" },
        }}
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 animate-fade-in-up"
            style={{
              fontFamily: '"Fredoka One", cursive',
              lineHeight: "1.1",
            }}
          >
            📦 My Orders
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            Track your adorable pet purchases and delivery status
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 transform transition-all duration-300 hover:shadow-xl animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Filters & Sort</h3>
              </div>

              <div className="space-y-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                  <select
                    className="w-full border-2 border-gray-200 p-3 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="Placed">📋 Placed</option>
                    <option value="Shipped">🚚 Shipped</option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort Orders</label>
                  <select
                    className="w-full border-2 border-gray-200 p-3 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="">Default Sort</option>
                    <option value="newest">📅 Newest First</option>
                    <option value="oldest">📅 Oldest First</option>
                    <option value="low">💸 Total: Low to High</option>
                    <option value="high">💸 Total: High to Low</option>
                  </select>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Clear Filters
                </button>
              </div>

              {/* Stats */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">📊 Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Orders:</span>
                    <span className="font-bold text-orange-600">{orders.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivered:</span>
                    <span className="font-bold text-green-600">
                      {orders.filter(o => o.status === "Delivered").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>In Progress:</span>
                    <span className="font-bold text-yellow-600">
                      {orders.filter(o => o.status !== "Delivered").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex-1 space-y-6">
            {filteredOrders.map((order, index) => (
              <div
                key={order.id}
                className="group bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in-up relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Order #{order.id || "N/A"}</h3>
                      <p className="text-sm text-gray-500">
                        {order.placedAt ? new Date(order.placedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold text-green-600">₹{order.total || 0}</p>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Order Status</h4>
                  <div className="flex items-center justify-between relative">
                    {getTimelineSteps(order.status).map((step, stepIndex) => (
                      <div key={step.key} className="flex flex-col items-center relative z-10">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-500 ${
                          step.isActive 
                            ? `${step.color} text-white shadow-lg transform scale-110` 
                            : `${step.lightColor} text-gray-400`
                        } ${step.isCurrent ? 'animate-pulse' : ''}`}>
                          {step.icon}
                        </div>
                        <div className="mt-2 text-center">
                          <p className={`text-xs font-medium ${
                            step.isActive ? 'text-gray-800' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Connecting Line */}
                    <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-10">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500 transition-all duration-1000 ease-out"
                        style={{
                          width: order.status === 'Placed' ? '0%' : 
                                 order.status === 'Shipped' ? '50%' : '100%'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Items ({(order.items || []).length})
                  </h4>
                  <div className="space-y-3">
                    {(order.items || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-all africa duration-300 transform hover:scale-[1.01]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={item.image || ""}
                              alt={item.name || "Item"}
                              className="w-16 h-16 object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-800">{item.name || "Unnamed Item"}</h5>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <span className="font-medium">₹{item.price || 0}</span>
                              <span>×</span>
                              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                                {item.quantity || 1}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-green-600">
                            ₹{(item.price || 0) * (item.quantity || 1)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimated Delivery */}
                {order.status !== "Delivered" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Estimated Delivery</p>
                      <p className="text-sm text-yellow-700">
                        {order.placedAt ? new Date(
                          new Date(order.placedAt).getTime() + 5 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric'
                        }) : "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\\:scale-x-100 {
          transform: scaleX(1);
        }
      `}</style>
    </div>
  );
};

export default MyOrders;