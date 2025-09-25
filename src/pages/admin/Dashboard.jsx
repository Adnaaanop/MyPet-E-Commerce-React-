import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get("/users"),
          api.get("/products"),
          api.get("/orders"),
        ]);

        console.log("Users response:", usersRes.data);
        console.log("Products response:", productsRes.data);
        console.log("Orders response:", ordersRes.data);

        // Validate response structure
        const usersData = Array.isArray(usersRes.data.data) ? usersRes.data.data : [];
        const productsData = Array.isArray(productsRes.data.data) ? productsRes.data.data : [];
        const ordersData = Array.isArray(ordersRes.data.data) ? ordersRes.data.data : [];

        console.log("Processed users data:", usersData);
        console.log("Processed products data:", productsData);
        console.log("Processed orders data:", ordersData);

        setUsers(usersData);
        setProducts(productsData);
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  // Ensure orders is an array before reduce
  const totalRevenue = Array.isArray(orders)
    ? orders.reduce((sum, order) => sum + Number(order.total || 0), 0)
    : 0;

  const cards = [
    {
      label: "Total Users",
      value: users.length,
      icon: <Users className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      label: "Total Products",
      value: products.length,
      icon: <ShoppingCart className="text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: <Package className="text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue}`,
      icon: <DollarSign className="text-green-600" />,
      bg: "bg-green-100",
    },
  ];

  const orderStatusData = ["Placed", "Shipped", "Delivered"].map((status) => ({
    name: status,
    value: orders.filter((o) => o.status === status).length,
  }));

  const COLORS = ["#60A5FA", "#FACC15", "#34D399"];

  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts).map(([key, value]) => ({
    category: key,
    count: value,
  }));

  const isDesktop = window.innerWidth >= 768;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📊 Admin Dashboard</h1>

      {/* 2x2 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 shadow-md flex items-center justify-between ${card.bg}`}
          >
            <div>
              <p className="text-sm text-gray-600">{card.label}</p>
              <h3 className="text-2xl font-bold">{card.value}</h3>
            </div>
            <div className="text-3xl">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart - Orders */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Orders by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isDesktop ? 110 : 80}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Product Categories</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" stroke="#888" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;