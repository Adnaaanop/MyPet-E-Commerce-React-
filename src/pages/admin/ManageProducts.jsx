import React, { useEffect, useState, useMemo } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from /products");
        const res = await api.get("/products");
        console.log("Products response:", res.data);

        const productsData = Array.isArray(res.data.data) ? res.data.data : [];
        console.log("Processed products data:", productsData);

        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        console.log(`Deleting product with id: ${id}`);
        await api.delete(`/products/${id}`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        Swal.fire("Deleted!", "The product has been removed.", "success");
      } catch (error) {
        console.error("Delete failed:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        Swal.fire("Failed!", "An error occurred while deleting.", "error");
      }
    }
  };

  const handlePreview = (product) => {
    console.log("Previewing product imageUrl:", product.imageUrl);
    Swal.fire({
      title: `<strong>${product.name}</strong>`,
      html: `
        <img src="${product.imageUrl || 'https://via.placeholder.com/150'}" alt="${product.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px; margin-bottom:15px;" onerror="this.src='https://via.placeholder.com/150';" />
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Description:</strong> ${product.description || "N/A"}</p>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Close",
      width: 500,
    });
  };

  const memoizedTable = useMemo(() => (
    <div className="overflow-x-auto">
      <table className="w-full text-left border border-gray-200 bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Category</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No products available.
              </td>
            </tr>
          ) : (
            products.map((prod) => (
              <tr key={prod.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={prod.imageUrl || 'https://via.placeholder.com/150'}
                    alt={prod.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      console.error(`Failed to load image for product ${prod.id}: ${prod.imageUrl}`);
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </td>
                <td className="p-3">{prod.name}</td>
                <td className="p-3">₹{prod.price}</td>
                <td className="p-3">{prod.category}</td>
                <td className="p-3">{prod.stock}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/edit-product/${prod.id}`)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handlePreview(prod)}
                    title="Preview"
                    className="bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  ), [products, navigate]);

  if (loading) {
    return <div className="p-6">Loading products...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">🛍️ Manage Products</h2>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>
      {memoizedTable}
    </div>
  );
};

export default ManageProducts;