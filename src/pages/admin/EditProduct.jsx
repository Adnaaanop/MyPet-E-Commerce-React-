import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { BASE_URL } from "../../services/base";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/${id}`)
      .then((res) => setInitialValues(res.data))
      .catch((err) => {
        console.error("Failed to fetch product", err);
        navigate("/admin/products");
      });
  }, [id, navigate]);

  const handleUpdate = async (values) => {
    try {
      await axios.put(`${BASE_URL}/products/${id}`, values);
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  if (!initialValues) return <p className="text-center mt-10">Loading product data...</p>;

  return (
    <ProductForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      isEdit={true}
    />
  );
};

export default EditProduct;
