import React from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductForm from "./ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    rating: "",
    ImageUrl: "", // Changed from image
    ImageFile: null,
  };

  const handleAdd = async (values) => {
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

      console.log("Submitting add product:", Object.fromEntries(formData));
      const res = await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Add product response:", res.data);

      Swal.fire("Success!", "Product added successfully.", "success");
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to add product:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      Swal.fire("Error!", "Failed to add product. Please try again.", "error");
    }
  };

  return <ProductForm initialValues={initialValues} onSubmit={handleAdd} />;
};

export default AddProduct;