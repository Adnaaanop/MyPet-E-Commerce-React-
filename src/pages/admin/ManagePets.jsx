import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/base";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/pets`)
      .then((res) => setPets(res.data))
      .catch((err) => console.error("Error fetching pets:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This pet will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/pets/${id}`);
        setPets((prev) => prev.filter((p) => p.id !== id));
        Swal.fire("Deleted!", "The pet has been removed.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete the pet.", "error");
      }
    }
  };

  const handlePreview = (pet) => {
    Swal.fire({
      title: `<strong>${pet.name}</strong>`,
      html: `
        <img src="${pet.image}" alt="${pet.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px; margin-bottom:15px;" />
        <p><strong>Breed:</strong> ${pet.breed || "N/A"}</p>
        <p><strong>Age:</strong> ${pet.age ?? "N/A"} years</p>
        <p><strong>Category:</strong> ${pet.category}</p>
        <p><strong>Price:</strong> ₹${pet.price}</p>
        <p><strong>Stock:</strong> ${pet.stock}</p>
        <p><strong>Description:</strong> ${pet.description || "No description provided."}</p>
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
        <h2 className="text-2xl font-bold text-blue-600">🐾 Manage Pets</h2>
        <button
          onClick={() => navigate("/admin/add-pet")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Pet
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img src={pet.image} alt={pet.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="p-3">{pet.name}</td>
                <td className="p-3">{pet.category}</td>
                <td className="p-3">₹{pet.price}</td>
                <td className="p-3">{pet.stock}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/edit-pet/${pet.id}`)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handlePreview(pet)}
                    title="Preview"
                    className="bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
            {pets.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No pets available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePets;
