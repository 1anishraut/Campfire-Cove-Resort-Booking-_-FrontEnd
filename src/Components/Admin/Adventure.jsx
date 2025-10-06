import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { addAdventure } from "../../Utils/adventureSlice";
import AddNewAdventure from "./AddNewAdventure";
import EditAdventure from "./EditAdventure";
import { toast } from "react-toastify";

const Adventure = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const dispatch = useDispatch();
  const adventureData = useSelector((state) => state.adventure);
  // console.log(adventureData);
  

  // Fetch Adventures
  const fetchAdventures = async () => {
    try {
      const res = await axios.get(BASE_URL + "/admin/listAdventure", {
        withCredentials: true,
      });
      // console.log(res?.data);
      dispatch(addAdventure(res?.data));
    } catch (error) {
      console.error("Error fetching adventures:", error);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, [dispatch]);

  // Delete Adventure
  const deleteAdventure = async (id) => {
    try {
      await axios.delete(BASE_URL + "/admin/deleteAdventure/" + id, {
        withCredentials: true,
      });
      toast.success("Adventure deleted successfully!");
            setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error deleting adventure:", error);
      toast.error("Failed to delete Adventure.!");
    }
  };

  // Search Filter
  const filteredAdventures = adventureData.filter((adv) =>
    adv.advName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="px-4 flex flex-col md:flex-row  gap-4 items-center justify-between py-2 mb-8 font-robotoLight">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-[#FC3200] px-4 py-2 hover:scale-105 transition-all duration-300 cursor-pointer text-white"
        >
          Add New Adventure
        </button>

        {/* Search Box */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search adventures..."
          className="border border-gray-600 rounded-md px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FC3200] w-full sm:w-64"
        />
      </div>

      {/* Show Filtered Adventures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mt-3 pb-10">
        {filteredAdventures.map((adv) => (
          <div key={adv._id}>
            <div
              onMouseEnter={() => setHoveredId(adv._id)}
              onMouseLeave={() => setHoveredId(null)}
              className="rounded-lg overflow-hidden shadow-lg shadow-black/60 bg-[#00000060] relative"
            >
              <img
                src={adv.advImage}
                alt={adv.advName}
                className="w-full h-48 object-cover transition-transform duration-300"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2 text-white">
                  {adv.advName}
                </h2>
                <p className="text-gray-400 text-sm mb-2 line-clamp-3">
                  {adv.advDescription}
                </p>
                <p className="text-gray-500 font-semibold">
                  Price: ₹{adv.advPrice}
                </p>
              </div>

              {/* Hover Actions */}
              <div
                className={`absolute flex flex-col justify-center gap-6 px-6 bg-[#000000e3] inset-0 z-10 transition-all duration-300
                  ${
                    hoveredId === adv._id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
              >
                <button
                  onClick={() => setEditId(adv._id)}
                  className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1 justify-center transition-all duration-300"
                >
                  <FaEdit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => deleteAdventure(adv._id)}
                  className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 justify-center transition-all duration-300"
                >
                  <MdDeleteSweep size={22} /> Delete
                </button>
              </div>
            </div>

            {/* Add New Adventure Modal */}
            {isModalOpen && <AddNewAdventure setIsModalOpen={setIsModalOpen} />}

            {/* Edit Modal */}
            {editId === adv._id && (
              <EditAdventure
                adv={adv}
                setIsEditOpen={() => setEditId(null)}
                id={adv._id}
                NameHead={adv.advName}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adventure;
