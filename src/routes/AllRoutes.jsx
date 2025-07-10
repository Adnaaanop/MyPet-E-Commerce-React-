import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 🔐 Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// 👤 User Pages
import UserHome from "../pages/user/UserHome";
import ProductList from "../pages/products/ProductList";
import ProductDetails from "../pages/products/ProductDetails";
import Cart from "../pages/cart/Cart";
import Wishlist from "../pages/wishlist/Wishlist";
import OrderSummary from "../pages/order/OrderSummary";
import MyOrders from "../pages/order/MyOrders";
import PetList from "../pages/pets/PetList";
import PetDetails from "../pages/pets/PetDetails";
import Checkout from "../pages/order/Checkout";

// 🛠️ Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageUsers from "../pages/admin/ManageUsers";
import ManagePets from "../pages/admin/ManagePets";
import AddPet from "../pages/admin/AddPet";
import EditPet from "../pages/admin/EditPet";

// ⚙️ Layouts & Route Protection
import ProtectedRoute from "../components/auth/ProtectedRoute";
import UserLayout from "../components/layout/UserLayout";
import BasicLayout from "../components/layout/BasicLayout";
import AdminLayout from "../components/layout/AdminLayout";

const AllRoutes = () => {
  return (
    <Routes>
      {/* 🔐 Auth Routes */}
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

      {/* 👤 User Routes */}
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

      {/* 🛠️ Admin Routes (Protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="pets" element={<ManagePets />} />
        <Route path="add-pet" element={<AddPet />} />
        <Route path="edit-pet/:id" element={<EditPet />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="users" element={<ManageUsers />} />
      </Route>

      {/* 🌐 Default Redirect */}
      <Route path="/" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default AllRoutes;
