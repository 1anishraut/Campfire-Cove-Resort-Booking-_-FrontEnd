import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";

const AddNewMeal = ({ setIsModalOpen }) => {
  const [mealName, setMealName] = useState("");
  const [mealPrice, setMealPrice] = useState("");
  const [mealImage, setMealImage] = useState("");
  const [mealCategory, setMealCategory] = useState("");
  const [mealType, setMealType] = useState("Veg");
  const [cuisine, setCuisine] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        BASE_URL + "/admin/addMeals",
        {
          mealName,
          mealPrice,
          mealImage,
          mealCategory,
          mealType,
          cuisine,
        },
        { withCredentials: true }
      );
      window.location.reload();
      alert("Meal added successfully!");
    } catch (error) {
      console.error("Error adding meal:", error);
      alert("Failed to add meal. Make sure you are logged in as admin.");
    }
  };

  return (
    <div
      
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs  text-white"
    >
      <form
        className="bg-[#002428] p-6 rounded-md shadow-md w-full max-w-md overflow-y-auto max-h-[90vh]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Add New Meal</h2>

        <input
          type="text"
          name="mealName"
          placeholder="Meal Name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="mealPrice"
          placeholder="Meal Price"
          value={mealPrice}
          onChange={(e) => setMealPrice(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="mealImage"
          placeholder="Meal Image URL"
          value={mealImage}
          onChange={(e) => setMealImage(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        />

        <input
          type="text"
          name="mealCategory"
          placeholder="Meal Category (e.g. Breakfast, Dinner)"
          value={mealCategory}
          onChange={(e) => setMealCategory(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        />

        <select
          name="mealType"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        >
          <option value="Veg">Veg</option>
          <option value="Non Veg">Non Veg</option>
        </select>

        <select
          name="cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        >
          <option value="">Select Cuisine</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
        </select>

        <div className="flex justify-between mx-10 gap-6">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="w-1/2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300 cursor-pointer"
          >
            Close
          </button>

          <button
            type="submit"
            className="w-1/2 bg-[#FC3200] text-white px-4 py-2 rounded hover:bg-[#fc32009a] transition-all duration-300 cursor-pointer"
          >
            Add Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewMeal;
