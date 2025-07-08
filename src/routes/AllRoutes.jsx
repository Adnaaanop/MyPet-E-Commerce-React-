import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import UserLayout from "../components/layout/UserLayout";
import BasicLayout from "../components/layout/BasicLayout"; 

const AllRoutes = () => {
  return (
    <Routes>
      {/*  Auth Pages with no pets productetc Layout */}
      <Route
        path="/login"
        element={
          <BasicLayout>
            <Login />
          </BasicLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <BasicLayout>
            <Signup />
          </BasicLayout>
        }
      />

      {/*  User Home (Protected) */}
      <Route
        path="/user/home"
        element={
          <ProtectedRoute allowedRole="user">
            <UserLayout>
              <UserHome />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/*  Admin Route (To be wrapped in AdminLayout later) */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/*  User Pages with UserLayout */}
      <Route
        path="/products"
        element={
          <UserLayout>
            <ProductList />
          </UserLayout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <UserLayout>
            <ProductDetails />
          </UserLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <UserLayout>
            <Cart />
          </UserLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <UserLayout>
            <Checkout />
          </UserLayout>
        }
      />
      <Route
        path="/wishlist"
        element={
          <UserLayout>
            <Wishlist />
          </UserLayout>
        }
      />
      <Route
        path="/order-summary"
        element={
          <UserLayout>
            <OrderSummary />
          </UserLayout>
        }
      />
      <Route
        path="/my-orders"
        element={
          <UserLayout>
            <MyOrders />
          </UserLayout>
        }
      />
      <Route
        path="/pets"
        element={
          <UserLayout>
            <PetList />
          </UserLayout>
        }
      />
      <Route
        path="/pets/:id"
        element={
          <UserLayout>
            <PetDetails />
          </UserLayout>
        }
      />
      <Route path="/" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default AllRoutes;
