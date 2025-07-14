import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  PackageCheck,
  PawPrint,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext"; 

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); 
  const [showConfirm, setShowConfirm] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
    { label: "Manage Products", icon: <Boxes size={18} />, path: "/admin/products" },
    { label: "Manage Pets", icon: <PawPrint size={18} />, path: "/admin/pets" },
    { label: "Manage Orders", icon: <PackageCheck size={18} />, path: "/admin/orders" },
    { label: "Manage Users", icon: <Users size={18} />, path: "/admin/users" },
  ];

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700";

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirm(false);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-52 bg-white shadow-md sticky top-0 h-screen p-4 hidden md:block flex flex-col">
        <div className="flex-1">
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
        </div>
        
        {/* Logout Button at Bottom */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded w-full text-red-600 hover:bg-red-50 transition font-medium"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-40 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform animate-scaleIn border border-gray-200 max-w-md mx-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <LogOut size={24} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Confirm Logout
            </h3>
            <p className="mb-8 text-gray-600 leading-relaxed">
              Are you sure you want to logout from the admin panel?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-red-200"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all duration-300 transform hover:scale-105 border border-gray-300 hover:border-gray-400 focus:ring-4 focus:ring-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;