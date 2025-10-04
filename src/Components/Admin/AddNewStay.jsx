import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";
import { useDispatch } from "react-redux";
import { addStay } from "../../Utils/staySlice";

const AddNewStay = ({ setIsModalOpen }) => {
  const [stayName, setStayName] = useState("");
  const [stayPrice, setStayPrice] = useState("");
  const [stayImage, setStayImage] = useState("");
  const [staySize, setStaySize] = useState("");
  const [stayDescription, setStayDescription] = useState("");
  const [stayStatus, setStayStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/admin/addStays",
        {
          roomName: stayName,
          roomPrice: stayPrice,
          roomImage: stayImage,
          roomSize: staySize,
          roomDescription: stayDescription,
          roomStatus: stayStatus,
        },
        { withCredentials: true }
      );
      window.location.reload();

      alert("Room added successfully!");
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room. Make sure you are logged in as admin.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <form
        className="bg-[#002428]/90 p-6 rounded-md shadow-md w-full max-w-md overflow-y-auto max-h-[90vh]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Add New Stay</h2>

        <input
          type="text"
          name="roomName"
          placeholder="Stay Name"
          value={stayName}
          onChange={(e) => setStayName(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="roomPrice"
          placeholder="Room Price"
          value={stayPrice}
          onChange={(e) => setStayPrice(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="roomImage"
          placeholder="Room Image URL"
          value={stayImage}
          onChange={(e) => setStayImage(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        />

        <input
          type="text"
          name="roomSize"
          placeholder="Room Size"
          value={staySize}
          onChange={(e) => setStaySize(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        />

        <textarea
          name="roomDescription"
          placeholder="Room Description"
          value={stayDescription}
          onChange={(e) => setStayDescription(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        />

        <select
          name="roomStatus"
          value={stayStatus}
          onChange={(e) => setStayStatus(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        >
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
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
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewStay;
