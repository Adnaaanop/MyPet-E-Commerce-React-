import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/base";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
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
        await axios.delete(`${BASE_URL}/products/${id}`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        Swal.fire("Deleted!", "The product has been removed.", "success");
      } catch (error) {
        Swal.fire("Failed!", "An error occurred while deleting.", "error");
        console.error("Delete failed", error);
      }
    }
  };

  const handlePreview = (product) => {
    Swal.fire({
      title: `<strong>${product.name}</strong>`,
      html: `
        <img src="${product.image}" alt="${product.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px; margin-bottom:15px;" />
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
            {products.map((prod) => (
              <tr key={prod.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-12 h-12 object-cover rounded"
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
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
