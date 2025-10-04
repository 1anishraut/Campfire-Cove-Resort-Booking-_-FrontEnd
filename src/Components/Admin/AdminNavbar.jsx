import React, { useEffect, useState } from "react";
import {
  FaUtensils,
  FaBed,
  FaMountain,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import logo from "../../assets/images/pngegg (1).png";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Utils/Constants";
import axios from "axios";
import { addAdmin } from "../../Utils/adminSlice";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);
  const [isExpanded, setIsExpanded] = useState(false); 
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(BASE_URL + "/admin/me", {
          withCredentials: true,
        });
        dispatch(addAdmin(res?.data));
      } catch (error) {
        console.log("No active session or token expired");
      }
    };
    fetchAdmin();
  }, [dispatch]);

  const logout = async () => {
    try {
      await axios.post(
        BASE_URL + "/admin/logout",
        {},
        { withCredentials: true }
      );
      navigate("/admin");
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      className={`bg-white text-black flex flex-col justify-between m-4 rounded-md transition-all duration-300 font-robotoLight
      ${isExpanded ? "w-[180px] lg:w-[220px]" : "w-[70px]"}`}
    >
      {/* ---- Top Logo ---- */}
      <div
        className="flex flex-col gap-1 p-4 cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex items-center  pb-2 relative ">
          <img src={logo} alt="App Logo" className="md:w-10 w-8 " />
          {isExpanded && (
            <>

            <h1 className=" font-bold text-nowrap">Campfire Cove</h1>
          <span className="absolute bottom-0 right-0 font-paintBrush text-orange text-xl rotate-350">Resort</span>
            </>
          )}
        </div>
      </div>

      {/* ---- Nav Links ---- */}
      <nav className="flex flex-col gap-4 mt-6 px-4">
        <NavLink
          to="allBookings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded transition ${
              isActive ? "text-[#FC3200] font-semibold" : "hover:text-[#FC3200]"
            }`
          }
        >
          <AiFillDatabase size={20} />
          {isExpanded && <span>All Bookings</span>}
        </NavLink>

        <NavLink
          to="stay"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded transition ${
              isActive ? "text-[#FC3200] font-semibold" : "hover:text-[#FC3200]"
            }`
          }
        >
          <FaBed size={20} />
          {isExpanded && <span>Stay</span>}
        </NavLink>

        <NavLink
          to="meals"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded transition ${
              isActive ? "text-[#FC3200] font-semibold" : "hover:text-[#FC3200]"
            }`
          }
        >
          <FaUtensils size={20} />
          {isExpanded && <span>Meals</span>}
        </NavLink>

        <NavLink
          to="adventures"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded transition ${
              isActive ? "text-[#FC3200] font-semibold" : "hover:text-[#FC3200]"
            }`
          }
        >
          <FaMountain size={20} />
          {isExpanded && <span>Adventures</span>}
        </NavLink>
      </nav>

      {/* ---- Bottom Admin Info ---- */}
      <div className="flex items-center justify-between gap-2 p-4 border-t border-gray-300">
        {isExpanded && (
          <div className="flex items-center gap-2">
            <FaUserCircle size={32} className="text-gray-400" />
            <div>
              <h2 className="text-sm font-semibold">
                Welcome, {admin?.managerName}
              </h2>
              <p className="text-xs text-gray-400">Manager</p>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="text-[#FC3200] hover:bg-[#FC3200] hover:text-black transition border p-2 rounded-full hover:scale-105"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
