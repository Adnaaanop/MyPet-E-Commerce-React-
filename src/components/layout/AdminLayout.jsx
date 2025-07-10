import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  PackageCheck,
  PawPrint,
  Users,
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
    { label: "Manage Products", icon: <Boxes size={18} />, path: "/admin/products" },
    { label: "Manage Pets", icon: <PawPrint size={18} />, path: "/admin/pets" }, // ✅ Added
    { label: "Manage Orders", icon: <PackageCheck size={18} />, path: "/admin/orders" },
    { label: "Manage Users", icon: <Users size={18} />, path: "/admin/users" },
  ];

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-52 bg-white shadow-md sticky top-0 h-screen p-4 hidden md:block">
        <h2 className="text-xl font-bold text-blue-600 mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition ${isActive(item.path)}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
