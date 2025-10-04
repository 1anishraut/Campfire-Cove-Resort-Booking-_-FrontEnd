import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";

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
      window.location.reload();
    } catch (error) {
      console.error("Error updating adventure:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000e1] backdrop-blur-xs text-white">
      <form
        className="bg-[#002428] p-6 rounded-md shadow-md w-full max-w-md overflow-y-auto max-h-[90vh]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">
          Edit Adventure <br /> {NameHead}
        </h2>

        <input
          type="text"
          name="advName"
          placeholder="Adventure Name"
          value={advName}
          onChange={(e) => setAdvName(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
        />

        <input
          type="number"
          name="advPrice"
          placeholder="Adventure Price"
          value={advPrice}
          onChange={(e) => setAdvPrice(e.target.value)}
          className="mb-3 w-full border p-2 rounded"
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
        />

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
