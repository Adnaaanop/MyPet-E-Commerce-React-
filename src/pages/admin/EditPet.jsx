import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PetForm from "./PetForm";
import { BASE_URL } from "../../services/base";

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/pets/${id}`)
      .then((res) => setInitialValues(res.data))
      .catch((err) => {
        console.error("Failed to fetch pet", err);
        navigate("/admin/pets");
      });
  }, [id, navigate]);

  const handleUpdate = async (values) => {
    try {
      await axios.put(`${BASE_URL}/pets/${id}`, values);
      navigate("/admin/pets");
    } catch (error) {
      console.error("Failed to update pet", error);
    }
  };

  if (!initialValues) return <p className="text-center mt-10">Loading pet data...</p>;

  return (
    <PetForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      isEdit={true}
    />
  );
};

export default EditPet;
