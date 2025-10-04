import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";

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
      window.location.reload();
      alert("Adventure added successfully!");
    } catch (error) {
      console.error("Error adding adventure:", error);
      alert("Failed to add adventure. Make sure you are logged in as admin.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs text-white">
      <form
        className="bg-[#002428] p-6 rounded-md shadow-md w-full max-w-md overflow-y-auto max-h-[90vh]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Add New Adventure</h2>

        <input
          type="text"
          name="advName"
          placeholder="Adventure Name"
          value={advName}
          onChange={(e) => setAdvName(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="advPrice"
          placeholder="Adventure Price"
          value={advPrice}
          onChange={(e) => setAdvPrice(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="advImage"
          placeholder="Adventure Image URL"
          value={advImage}
          onChange={(e) => setAdvImage(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        />

        <textarea
          name="advDescription"
          placeholder="Adventure Description"
          value={advDescription}
          onChange={(e) => setAdvDescription(e.target.value)}
          className="mb-3 w-full border p-2 rounded min-h-[100px]"
          required
        />

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
            Add Adventure
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewAdventure;
