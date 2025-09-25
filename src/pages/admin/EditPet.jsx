import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PetForm from "./PetForm";

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        console.log(`Fetching pet with id: ${id}`);
        const res = await api.get(`/pets/${id}`);
        console.log("Fetch pet response:", res.data);

        const pet = res.data.data;
        if (!pet) {
          throw new Error("Pet data not found in response");
        }

        setInitialValues({
          name: pet.name || "",
          breed: pet.breed || "",
          age: pet.age || "",
          description: pet.description || "",
          price: pet.price || "",
          stock: pet.stock || "",
          category: pet.category || "",
          ImageUrl: pet.ImageUrl || "", // Changed from image
          ImageFile: null,
        });
      } catch (err) {
        console.error("Failed to fetch pet:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
        setError("Failed to load pet data. Please try again.");
      }
    };
    fetchPet();
  }, [id]);

  const handleUpdate = async (values) => {
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

      console.log("Submitting update pet:", Object.fromEntries(formData));
      const res = await api.put(`/pets/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Update pet response:", res.data);

      Swal.fire("Success!", "Pet updated successfully.", "success");
      navigate("/admin/pets");
    } catch (error) {
      console.error("Failed to update pet:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      Swal.fire("Error!", "Failed to update pet. Please try again.", "error");
    }
  };

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!initialValues) {
    return <div className="p-6">Loading pet data...</div>;
  }

  return (
    <PetForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      isEdit={true}
    />
  );
};

export default EditPet;