import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with id: ${id}`);
        const res = await api.get(`/products/${id}`);
        console.log("Fetch product response:", res.data);

        const product = res.data.data;
        if (!product) {
          throw new Error("Product data not found in response");
        }

        setInitialValues({
          name: product.name || "",
          price: product.price || "",
          stock: product.stock || "",
          category: product.category || "",
          description: product.description || "",
          rating: product.rating || "",
          ImageUrl: product.ImageUrl || "", // Changed from image
          ImageFile: null,
        });
      } catch (err) {
        console.error("Failed to fetch product:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
        setError("Failed to load product data. Please try again.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("rating", values.rating);
      if (values.ImageFile) {
        formData.append("ImageFile", values.ImageFile);
      } else if (values.ImageUrl) {
        formData.append("ImageUrl", values.ImageUrl); // Changed from image
      }

      console.log("Submitting update product:", Object.fromEntries(formData));
      const res = await api.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Update product response:", res.data);

      Swal.fire("Success!", "Product updated successfully.", "success");
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to update product:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      Swal.fire("Error!", "Failed to update product. Please try again.", "error");
    }
  };

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!initialValues) {
    return <div className="p-6">Loading product data...</div>;
  }

  return (
    <ProductForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      isEdit={true}
    />
  );
};

export default EditProduct;