import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";
import { toast } from "react-toastify";

const AddNewAdventure = ({ setIsModalOpen }) => {
  const [advName, setAdvName] = useState("");
  const [advPrice, setAdvPrice] = useState("");
  const [advImage, setAdvImage] = useState("");
  const [advDescription, setAdvDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        BASE_URL + "/admin/addAdventure",
        {
          advName,
          advPrice,
          advImage,
          advDescription,
        },
        { withCredentials: true }
      );
      
      toast.success("Adventure added successfully!");
            setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error adding adventure:", error);
      toast.error("Error adding adventure");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs text-white font-robotoLight">
      <form
        className="bg-[#002428]/90 p-6 rounded-md shadow-md w-full max-w-md overflow-y-auto max-h-[90vh]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Add New Adventure</h2>

        {/* Adventure Name */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200 font-medium">
            Adventure Name
          </label>
          <input
            type="text"
            name="advName"
            value={advName}
            onChange={(e) => setAdvName(e.target.value)}
            className="w-full border p-2 rounded outline-none "
            required
          />
        </div>

        {/* Adventure Price */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200 font-medium">
            Price (₹)
          </label>
          <input
            type="number"
            name="advPrice"
            value={advPrice}
            onChange={(e) => setAdvPrice(e.target.value)}
            className="w-full border p-2 rounded outline-none "
            required
            min="0"
          />
        </div>

        {/* Adventure Image */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200 font-medium">
            Image URL
          </label>
          <input
            type="text"
            name="advImage"
            value={advImage}
            onChange={(e) => setAdvImage(e.target.value)}
            className="w-full border p-2 rounded outline-none "
            
          />
        </div>

        {/* Adventure Description */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200 font-medium">
            Description
          </label>
          <textarea
            name="advDescription"
            value={advDescription}
            onChange={(e) => setAdvDescription(e.target.value)}
            className="w-full border p-2 rounded outline-none "
            rows="3"
            required
          />
        </div>

        {/* Buttons */}
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
            className="w-1/2 bg-orange text-white px-4 py-2 rounded hover:bg-[#fc32009a] transition-all duration-300 cursor-pointer"
          >
            Add Adventure
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewAdventure;
