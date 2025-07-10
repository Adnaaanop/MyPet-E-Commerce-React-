import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { BASE_URL } from "../../services/base";

const AddProduct = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    rating: "",
    image: "",
  };

  const handleAdd = async (values) => {
    try {
      await axios.post(`${BASE_URL}/products`, values);
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  return <ProductForm initialValues={initialValues} onSubmit={handleAdd} />;
};

export default AddProduct;
