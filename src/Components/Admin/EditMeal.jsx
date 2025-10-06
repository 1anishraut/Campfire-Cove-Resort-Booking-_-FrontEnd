import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";
import { toast } from "react-toastify";

const EditMeal = ({ setIsEditOpen, NameHead, id, meal }) => {
  const [mealName, setMealName] = useState("");
  const [mealPrice, setMealPrice] = useState("");
  const [mealImage, setMealImage] = useState("");
  const [mealCategory, setMealCategory] = useState("");
  const [mealType, setMealType] = useState("Veg");
  const [cuisine, setCuisine] = useState("");

  // Pre-fill form values when meal prop 
  useEffect(() => {
    if (meal) {
      setMealName(meal.mealName || "");
      setMealPrice(meal.mealPrice || "");
      setMealImage(meal.mealImage || "");
      setMealCategory(meal.mealCategory || "");
      setMealType(meal.mealType || "Veg");
      setCuisine(meal.cuisine || "");
    }
  }, [meal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        BASE_URL + "/admin/editMeal/" + id,
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
      toast.success("Meal edited successfully!");
            setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error updating meal:", error);
      toast.error("Error editing");
    }
  };

  return (
    <div className="hide-scrollbar fixed inset-0 z-50 flex items-center justify-center bg-[#000000e1] backdrop-blur-xs text-white overflow-y-auto font-robotoLight">
      <form
        className="bg-[#002428] p-6 rounded-md shadow-md w-full max-w-md  max-h-[90vh] overflow-y-auto scrollbar-hide"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">
          Edit Meal <br /> {NameHead}
        </h2>

        {/* Meal Name */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Meal Name</label>
          <input
            type="text"
            name="mealName"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none border-gray-600"
          />
        </div>

        {/* Meal Price */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Meal Price (₹)</label>
          <input
            type="number"
            name="mealPrice"
            value={mealPrice}
            min="0"
            onChange={(e) => setMealPrice(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none border-gray-600"
          />
        </div>

        {/* Meal Image */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Meal Image URL</label>
          <input
            type="text"
            name="mealImage"
            value={mealImage}
            onChange={(e) => setMealImage(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none border-gray-600"
          />
        </div>

        {/* Meal Category */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Meal Category</label>
          <input
            type="text"
            name="mealCategory"
            value={mealCategory}
            onChange={(e) => setMealCategory(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none border-gray-600"
          />
        </div>

        {/* Meal Type */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Meal Type</label>
          <select
            name="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none border-gray-600"
          >
            <option value="Veg" className="bg-green">
              Veg
            </option>
            <option value="Non Veg" className="bg-green">
              Non Veg
            </option>
          </select>
        </div>

        {/* Cuisine */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">
            Cuisine (e.g. Indian, Chinese)
          </label>
          <input
            type="text"
            name="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none border-gray-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mx-10 gap-6">
          <button
            type="button"
            onClick={() => setIsEditOpen(false)}
            className="w-1/2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300 cursor-pointer"
          >
            Close
          </button>

          <button
            type="submit"
            className="w-1/2 bg-[#FC3200] text-white px-4 py-2 rounded hover:bg-[#fc32009a] transition-all duration-300 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMeal;
