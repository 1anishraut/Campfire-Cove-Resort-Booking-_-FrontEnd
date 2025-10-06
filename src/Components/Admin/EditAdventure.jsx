import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";
import { toast } from "react-toastify";

const EditAdventure = ({ setIsEditOpen, NameHead, id, adv }) => {
  const [advName, setAdvName] = useState(adv?.advName || "");
  const [advPrice, setAdvPrice] = useState(adv?.advPrice || "");
  const [advImage, setAdvImage] = useState(adv?.advImage || "");
  const [advDescription, setAdvDescription] = useState(
    adv?.advDescription || ""
  );

  useEffect(() => {
    if (adv) {
      setAdvName(adv.advName || "");
      setAdvPrice(adv.advPrice || "");
      setAdvImage(adv.advImage || "");
      setAdvDescription(adv.advDescription || "");
    }
  }, [adv]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        BASE_URL + "/admin/editAdventure/" + id,
        {
          advName: advName || adv.advName,
          advPrice: advPrice || adv.advPrice,
          advImage: advImage || adv.advImage,
          advDescription: advDescription || adv.advDescription,
        },
        { withCredentials: true }
      );
      toast.success("Adventure edited successfully!");
            setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      toast.error("Error editing");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000e1] backdrop-blur-xs text-white font-robotoLight">
      <form
        className="bg-[#002428] p-6 rounded-md shadow-md w-full max-w-md overflow-y-auto max-h-[90vh]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-white">
          Edit Adventure <br /> {NameHead}
        </h2>

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
            className="w-full border p-2 rounded bg-transparent text-white outline-none focus:outline-none focus:ring-0"
            required
          />
        </div>

        {/* Adventure Price */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200 font-medium">
            Adventure Price (₹)
          </label>
          <input
            type="number"
            name="advPrice"
            value={advPrice}
            onChange={(e) => setAdvPrice(e.target.value)}
            className="w-full border p-2 rounded bg-transparent text-white outline-none focus:outline-none focus:ring-0"
            min="0"
            required
          />
        </div>

        {/* Adventure Image */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200 font-medium">
            Adventure Image URL
          </label>
          <input
            type="text"
            name="advImage"
            value={advImage}
            onChange={(e) => setAdvImage(e.target.value)}
            className="w-full border p-2 rounded bg-transparent text-white outline-none focus:outline-none focus:ring-0"
            
          />
        </div>

        {/* Adventure Description */}
        <div className="mb-3">
          <label className="block mb-1 text-gray-200 font-medium">
            Adventure Description
          </label>
          <textarea
            name="advDescription"
            value={advDescription}
            onChange={(e) => setAdvDescription(e.target.value)}
            className="w-full border p-2 rounded bg-transparent text-white outline-none focus:outline-none focus:ring-0 min-h-[100px]"
            required
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

export default EditAdventure;
