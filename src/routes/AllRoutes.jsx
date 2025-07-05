import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import UserHome from "../pages/user/UserHome";
import AdminDashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ProductList from "../pages/products/ProductList";
import ProductDetails from "../pages/products/ProductDetails";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/order/CheckOut";
import Wishlist from "../pages/wishlist/Wishlist";
import OrderSummary from "../pages/order/OrderSummary";
import MyOrders from "../pages/order/MyOrders";
import PetList from "../pages/pets/PetList";
import PetDetails from "../pages/pets/PetDetails";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/user/home"
        element={
          <ProtectedRoute allowedRole="user">
            <UserHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} /> 
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/pets" element={<PetList />} />
      <Route path="/pets/:id" element={<PetDetails />} />

    </Routes>
  );
};

export default AllRoutes;
