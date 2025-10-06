import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addMeals } from "../../Utils/mealsSlice";
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditMeal from "./EditMeal";
import AddNewStay from "./AddNewStay";
import AddNewMeal from "./AddNewMeal";
import { toast } from "react-toastify";

const Meals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const [editId, setEditId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const dispatch = useDispatch();
  const mealsData = useSelector((state) => state.meals);

  const fetchMeals = async () => {
    try {
      const res = await axios.get(BASE_URL + "/admin/listMeals", {
        withCredentials: true,
      });
      console.log(res.data);

      dispatch(addMeals(res?.data));
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [dispatch]);

  const deleteMeal = async (id) => {
    try {
      await axios.delete(BASE_URL + "/admin/deleteMeal/" + id, {
        withCredentials: true,
      });
      toast.success("Deleted successfully!");
            setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Error deleting meal");
    }
  };
  // console.log(mealsData);
  // Get the array of meals safely
  const mealsArray = Array.isArray(mealsData)
    ? mealsData
    : mealsData?.meals || [];

  // Search and FILTER
  const filteredMeals = mealsArray.filter((meal) => {
    const matchesCuisine =
      selectedCuisine === "All" ||
      (meal.cuisine || "").toLowerCase() === selectedCuisine.toLowerCase();
    const matchesSearch = (meal.mealName || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  return (
    <div className="relative font-robotoLight">
      <div className="px-4 flex flex-col md:flex-row gap-4 items-center justify-between py-2 mb-8 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-[#FC3200] px-4 py-2 hover:scale-105 transition-all duration-300 cursor-pointer text-white"
        >
          Add New Meal
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search meals..."
            className="border border-gray-600 rounded-md px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FC3200] w-full sm:w-64"
          />

          {/* Filter Options */}
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="border border-gray-600 rounded-md px-3 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#FC3200] cursor-pointer"
          >
            <option className="bg-[#002428]" value="All">
              All
            </option>
            <option className="bg-[#002428]" value="Indian">
              Indian
            </option>
            <option className="bg-[#002428]" value="Chinese">
              Chinese
            </option>
          </select>
        </div>
      </div>

      {/*  Show Filtered Meals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mt-3 pb-10">
        {filteredMeals.map((meal) => (
          <div key={meal._id}>
            <div
              onMouseEnter={() => setHoveredId(meal._id)}
              onMouseLeave={() => setHoveredId(null)}
              className="rounded-lg overflow-hidden shadow-lg shadow-black/60 bg-[#00000060] relative"
            >
              <img
                src={meal.mealImage}
                alt={meal.mealName}
                className="w-full h-48 object-cover transition-transform duration-300"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2 text-white">
                  {meal.mealName}
                </h2>
                <p className="text-gray-400 text-sm mb-2">
                  Cuisine: {meal.cuisine}
                </p>
                <p className="text-gray-500 font-semibold mb-1">
                  Price: ₹{meal.mealPrice}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  Category: {meal.mealCategory}
                </p>
                <p
                  className={
                    meal.mealType === "Veg" ? "text-green-500" : "text-red-500"
                  }
                >
                  Type: {meal.mealType}
                </p>
              </div>

              {/* Hover Actions */}
              <div
                className={`absolute flex flex-col justify-center gap-6 px-6 bg-[#000000e3] inset-0 z-10 transition-all duration-300
                  ${
                    hoveredId === meal._id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
              >
                <button
                  onClick={() => setEditId(meal._id)}
                  className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1 justify-center transition-all duration-300"
                >
                  <FaEdit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => deleteMeal(meal._id)}
                  className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 justify-center transition-all duration-300"
                >
                  <MdDeleteSweep size={22} /> Delete
                </button>
              </div>
            </div>

            {/* Add new Meal  */}
            {isModalOpen && <AddNewMeal setIsModalOpen={setIsModalOpen} />}

            {/* Edit Modal */}
            {editId === meal._id && (
              <EditMeal
                meal={meal}
                setIsEditOpen={() => setEditId(null)}
                id={meal._id}
                NameHead={meal.mealName}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
