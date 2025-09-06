import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/Constants";

export default function AddMenuForm() {
  const [formData, setFormData] = useState({
    mealType: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        BASE_URL + "/admin/addMenu",
        formData
      );
      alert(res.data.message);
      console.log(res.data);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      alert("Failed to update menu ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Add Menu</h2>

      {/* Meal Type */}
      <div>
        <label className="block text-sm font-medium">Meal Type</label>
        <select
          name="mealType"
          value={formData.mealType}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
          required
        >
          <option value="">Select</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      {/* Category (hide for breakfast) */}
      {formData.mealType !== "breakfast" && (
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          >
            <option value="">Select</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
        </div>
      )}

      {/* Price */}
      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
          placeholder="Enter Price"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Save Menu
      </button>
    </form>
  );
}
