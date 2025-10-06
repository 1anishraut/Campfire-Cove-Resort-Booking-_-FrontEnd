import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";
import { useDispatch } from "react-redux";
import { addStay } from "../../Utils/staySlice";
import { toast } from "react-toastify";

const AddNewStay = ({ setIsModalOpen }) => {
  const [stayName, setStayName] = useState("");
  const [stayPrice, setStayPrice] = useState("");
  const [stayImage, setStayImage] = useState("");
  const [staySize, setStaySize] = useState("");
  const [stayDescription, setStayDescription] = useState("");
  const [stayStatus, setStayStatus] = useState("Available");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
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
       toast.success("New Stay added successfully!");
       setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error adding Stay:", error);
      toast.error("Failed to add stay. Make sure you are logged in as admin.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-robotoLight">
      <form
        className="scrollbar-hide bg-[#002428]/90 p-6 rounded-md shadow-md w-full max-w-md overflow-y-auto max-h-[90vh]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-white">Add New Stay</h2>

        {/* Stay Name */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Stay Name</label>
          <input
            type="text"
            name="roomName"
            value={stayName}
            onChange={(e) => setStayName(e.target.value)}
            className="w-full border border-gray-600 p-2 rounded focus:outline-none"
            required
          />
        </div>

        {/* Room Price */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Room Price (₹)</label>
          <input
            type="number"
            name="roomPrice"
            value={stayPrice}
            min="0"
            onChange={(e) => setStayPrice(e.target.value)}
            className="w-full border border-gray-600 p-2 rounded focus:outline-none"
            required
          />
        </div>

        {/* Room Image */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Room Image URL</label>
          <input
            type="text"
            name="roomImage"
            value={stayImage}
            onChange={(e) => setStayImage(e.target.value)}
            className="w-full border border-gray-600 p-2 rounded focus:outline-none"
          />
        </div>

        {/* Room Size */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">
            Room Size ( sq.ft )
          </label>
          <input
            type="text"
            name="roomSize"
            value={staySize}
            onChange={(e) => setStaySize(e.target.value)}
            className="w-full border border-gray-600 p-2 rounded focus:outline-none"
            required
          />
        </div>

        {/* Room Description */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Room Description</label>
          <textarea
            name="roomDescription"
            value={stayDescription}
            onChange={(e) => setStayDescription(e.target.value)}
            className="w-full border border-gray-600 p-2 rounded focus:outline-none min-h-[100px]"
            required
          />
        </div>

        {/* Room Status */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Room Status</label>
          <select
            name="roomStatus"
            value={stayStatus}
            onChange={(e) => setStayStatus(e.target.value)}
            className="w-full border border-gray-600 p-2 rounded focus:outline-none bg-[#002428] text-white"
            required
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mx-10 gap-6 mt-4">
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
