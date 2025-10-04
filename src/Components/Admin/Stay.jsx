import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addStay } from "../../Utils/staySlice";
import Chart from "./Chart";
import EditStay from "./EditStay";
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Stay = () => {
  const [editId, setEditId] = useState(null); 
  const [hoveredId, setHoveredId] = useState(null); 
  const dispatch = useDispatch();
  const stayData = useSelector((state) => state.stay);

  const fetchStayData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/admin/listStays", {
        withCredentials: true,
      });

      dispatch(addStay(res?.data));
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching stay data:", error);
    }
  };

  useEffect(() => {
    fetchStayData();
  }, [dispatch]);

  const deleteStay = async (id) => {
    try {
      const res = await axios.delete(BASE_URL + "/admin/deleteStay/" + id , {
        withCredentials: true,
      })
      window.location.reload();

  }
  catch (error) {
    console.error("Error deleting stay:", error);
  }
}

  const availableRooms = stayData.filter(
    (room) => room.roomStatus === "Available"
  );

  return (
    <div className="relative">
      <Chart stayData={stayData} availableRooms={availableRooms} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mt-3 pb-10">
        {stayData.map((stay) => (
          <div key={stay._id}>
            <div
              key={stay._id}
              onMouseEnter={() => setHoveredId(stay._id)}
              onMouseLeave={() => setHoveredId(null)}
              className="rounded-lg overflow-hidden shadow-lg shadow-black/60 bg-[#00000060] relative"
            >
              <img
                src={stay.roomImage}
                alt={stay.roomName}
                className="w-full h-48 object-cover transition-transform duration-300"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2 text-white">
                  {stay.roomName}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  {stay.roomDescription}
                </p>
                <p className="text-gray-500 font-semibold mb-1">
                  Price: ₹{stay.roomPrice}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  Size: {stay.roomSize}
                </p>
                <p
                  className={
                    stay.roomStatus === "Available"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  Status: {stay.roomStatus}
                </p>
              </div>

              {/* Show buttons only for hovered card */}
              <div
                className={`absolute flex flex-col justify-center gap-6 px-6 bg-[#000000e3] inset-0 z-10 transition-all duration-300
              ${
                hoveredId === stay._id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
              >
                <button
                  onClick={() => setEditId(stay._id)} // open only for this card
                  className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1 justify-center transition-all duration-300"
                >
                  <FaEdit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => deleteStay(stay._id)}
                  className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 justify-center transition-all duration-300"
                >
                  <MdDeleteSweep size={22} /> Delete
                </button>
              </div>
            </div>
            {editId === stay._id && (
              <EditStay stay={stay}
                setIsEditOpen={() => setEditId(null)}
                id={stay._id}
                NameHead={stay.roomName}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stay;
