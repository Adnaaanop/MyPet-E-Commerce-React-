// import React from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../../context/CartContext";

// const PetCard = ({ pet }) => {
//   const { addToCart } = useCart();

//   const handleAddToCart = () => {
//     addToCart({ ...pet, quantity: 1 });
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition-all">
//       <Link to={`/pets/${pet.id}`}>
//         <img
//           src={pet.image}
//           alt={pet.name}
//           className="w-full h-48 object-cover rounded-xl mb-4"
//         />
//         <h3 className="text-xl font-bold">{pet.name}</h3>
//         <p className="text-sm text-gray-500">{pet.breed}</p>
//         <p className="text-sm text-gray-500">Age: {pet.age} year(s)</p>
//         <p className="text-lg font-semibold text-blue-600 mt-2">₹{pet.price}</p>
//       </Link>

//       <button
//         onClick={handleAddToCart}
//         className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default PetCard;
