import React from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PetForm from "./PetForm";

const AddPet = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    breed: "",
    age: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    ImageUrl: "", // Changed from image
    ImageFile: null,
  };

  const handleAdd = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("breed", values.breed);
      formData.append("age", values.age);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("category", values.category);
      if (values.ImageFile) {
        formData.append("ImageFile", values.ImageFile);
      } else if (values.ImageUrl) {
        formData.append("ImageUrl", values.ImageUrl);
      }

      console.log("Submitting add pet:", Object.fromEntries(formData));
      const res = await api.post("/pets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Add pet response:", res.data);

      Swal.fire("Success!", "Pet added successfully.", "success");
      navigate("/admin/pets");
    } catch (error) {
      console.error("Failed to add pet:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      Swal.fire("Error!", "Failed to add pet. Please try again.", "error");
    }
  };

  return <PetForm initialValues={initialValues} onSubmit={handleAdd} />;
};

export default AddPet;