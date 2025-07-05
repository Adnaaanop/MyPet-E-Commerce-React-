// src/pages/pets/PetDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/base";
// import { useWishList } from "../../context/WishListContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { useWishlist } from "../../context/WishListContext";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const { wishlist, toggleWishlist } = useWishlist();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/pets/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error("Error fetching pet details", err));
  }, [id]);

  const isWishlisted = wishlist.some((item) => item.id === pet?.id);

  const handleBuyNow = () => {
    if (!userId) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    const orderData = {
      id: uuid().slice(0, 4),
      userId,
      items: [
        {
          ...pet,
          quantity: 1,
          userId
        }
      ],
      total: pet.price,
      status: "Placed",
      placedAt: new Date().toISOString()
    };

    axios.post(`${BASE_URL}/orders`, orderData)
      .then(() => {
        alert("Order placed successfully!");
        navigate("/orders");
      })
      .catch((err) => {
        console.error("Error placing order", err);
        alert("Something went wrong. Try again.");
      });
  };

  if (!pet) {
    return <div className="text-center mt-10 text-gray-500">Loading pet details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full md:w-1/2 h-72 object-cover rounded-xl"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-bold">{pet.name}</h2>
            <button onClick={() => toggleWishlist(pet)}>
              {isWishlisted ? (
                <FaHeart className="text-red-500 text-2xl" />
              ) : (
                <FaRegHeart className="text-gray-500 text-2xl" />
              )}
            </button>
          </div>

          <p className="text-gray-600 mb-1">Breed: {pet.breed}</p>
          <p className="text-gray-600 mb-1">Age: {pet.age} year(s)</p>
          <p className="text-2xl text-green-600 font-semibold mt-4 mb-6">₹{pet.price}</p>

          <button
            onClick={handleBuyNow}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Adopt Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
