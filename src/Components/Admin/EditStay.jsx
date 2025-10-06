import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";
import { toast } from "react-toastify";

const EditStay = ({ setIsEditOpen, NameHead, id, stay }) => {
  const [stayPrice, setStayPrice] = useState("");
  const [stayImage, setStayImage] = useState("");
  const [staySize, setStaySize] = useState("");
  const [stayDescription, setStayDescription] = useState("");
  const [stayStatus, setStayStatus] = useState("Available");

  // Pre-fill with existing stay data when `stay` changes
  useEffect(() => {
    if (stay) {
      setStayPrice(stay.roomPrice || "");
      setStayImage(stay.roomImage || "");
      setStaySize(stay.roomSize || "");
      setStayDescription(stay.roomDescription || "");
      setStayStatus(stay.roomStatus || "Available");
    }
  }, [stay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        BASE_URL + "/admin/editStay/" + id,
        {
          roomPrice: stayPrice,
          roomImage: stayImage,
          roomSize: staySize,
          roomDescription: stayDescription,
          roomStatus: stayStatus,
        },
        { withCredentials: true }
      );
      toast.success("Stay edited successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error updating stay:", error);
      toast.error("Error editing");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm text-white font-robotoLight">
      <form
        className="bg-[#002428]/90 p-6 rounded-md shadow-md w-full max-w-md overflow-y-auto max-h-[90vh] scrollbar-hide"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-white">
          Edit Stay <br /> {NameHead}
        </h2>

        {/* Room Price */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Room Price (₹)</label>
          <input
            type="number"
            name="roomPrice"
            value={stayPrice}
            min="0"
            onChange={(e) => setStayPrice(e.target.value)}
            className="w-full border border-gray-600 p-2 rounded focus:outline-none text-white bg-transparent"
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
            className="w-full border border-gray-600 p-2 rounded focus:outline-none text-white bg-transparent"
          />
        </div>

        {/* Room Size */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">
            Room Size ( sq.ft ){" "}
          </label>
          <input
            type="text"
            name="roomSize"
            value={staySize}
            onChange={(e) => setStaySize(e.target.value)}
            className="w-full border border-gray-600 p-2 rounded focus:outline-none text-white bg-transparent"
          />
        </div>

        {/* Room Description */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200">Room Description</label>
          <textarea
            name="roomDescription"
            value={stayDescription}
            onChange={(e) => setStayDescription(e.target.value)}
            className="w-full border border-gray-600 p-2 rounded focus:outline-none text-white bg-transparent min-h-[100px]"
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
          >
            <option value="Available" className="bg-green">
              Available
            </option>
            <option value="Booked" className="bg-green">
              Booked
            </option>
          </select>
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

export default EditStay;
