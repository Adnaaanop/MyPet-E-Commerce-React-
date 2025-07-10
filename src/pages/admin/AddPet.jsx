import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PetForm from "./PetForm";
import { BASE_URL } from "../../services/base";

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
    image: "",
  };

  const handleAdd = async (values) => {
    try {
      await axios.post(`${BASE_URL}/pets`, values);
      navigate("/admin/pets");
    } catch (error) {
      console.error("Failed to add pet", error);
    }
  };

  return <PetForm initialValues={initialValues} onSubmit={handleAdd} />;
};

export default AddPet;
