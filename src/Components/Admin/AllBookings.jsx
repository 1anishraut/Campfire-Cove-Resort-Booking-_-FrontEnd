import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Utils/Constants";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSort, setDateSort] = useState("newest"); 
  const [statusFilter, setStatusFilter] = useState("all"); 

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/allBookings`, {
        withCredentials: true,
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/bookingDelete/${id}`, {
        withCredentials: true,
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Deleted successfully!");
    } catch (err) {
      console.error("Error deleting booking:", err);
      toast.error("Error editing");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ---------- Filtering & Sorting ----------
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  let filtered = bookings.filter((b) =>
    [b.fullName, b.emailId, b.contact]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter((b) => b.status === statusFilter);
  }

  // Date filter & sort
  if (dateSort === "today") {
    filtered = filtered.filter((b) => {
      const checkInDate = new Date(b.checkIn);
      return checkInDate >= startOfToday && checkInDate < endOfToday;
    });
  }

  if (dateSort === "newest") {
    filtered.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
  } else if (dateSort === "oldest") {
    filtered.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
  }

  return (
    <div className="relative px-4 font-robotoLight">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search name/email/contact..."
          className="border border-gray-600 rounded-md px-3 py-2 bg-transparent text-white
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FC3200]
                     w-full sm:w-72"
        />

        {/* Sorting Controls */}
        <div className="flex gap-3">
          {/* Date Sort */}
          <select
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
            className="border border-gray-600 rounded-md px-3 py-2 bg-transparent text-white
                       focus:outline-none focus:ring-2 focus:ring-[#FC3200] cursor-pointer"
          >
            <option className="bg-[#002428]" value="newest">
              Newest First
            </option>
            <option className="bg-[#002428]" value="oldest">
              Oldest First
            </option>
            <option className="bg-[#002428]" value="today">
              Today Only
            </option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-600 rounded-md pl-2 py-2 bg-transparent text-white
                       focus:outline-none focus:ring-2 focus:ring-[#FC3200] cursor-pointer"
          >
            <option className="bg-[#002428]" value="all">
              All Status
            </option>
            <option className="bg-[#002428]" value="pending_payment">
              Pending Payment
            </option>
            <option className="bg-[#002428] " value="confirmed">
              Confirmed
            </option>
          </select>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {filtered.map((b) => (
          <div
            key={b._id}
            className="rounded-lg shadow-lg shadow-black/60 bg-[#00000060] text-white p-4 relative"
          >
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold">Name:</span> {b.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {b.emailId}
              </p>
              <p>
                <span className="font-semibold">Contact:</span> {b.contact}
              </p>
              <p>
                <span className="font-semibold">Guests:</span> {b.guests}
              </p>
              <p>
                <span className="font-semibold">Room:</span>{" "}
                {b.roomId?.roomName || "—"}
              </p>
              <p>
                <span className="font-semibold">Adventure:</span>{" "}
                {b.adventureId?.advName || "—"}
              </p>
              <p>
                <span className="font-semibold">Check-in:</span>{" "}
                {b.checkIn ? new Date(b.checkIn).toLocaleDateString() : "—"}
              </p>
              <p>
                <span className="font-semibold">Check-out:</span>{" "}
                {b.checkOut ? new Date(b.checkOut).toLocaleDateString() : "—"}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={
                    b.status === "confirmed"
                      ? "text-green-400"
                      : b.status === "pending_payment"
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  {b.status}
                </span>
              </p>
              <p>
                <span className="font-semibold">Amount:</span> ₹{b.amount}
              </p>
            </div>

            {/* Delete */}
            <button
              onClick={() => deleteBooking(b._id)}
              className="absolute top-2 right-2 flex items-center gap-1 bg-red-500 hover:bg-red-600
                         text-white text-sm px-3 py-1 rounded transition-all duration-200 cursor-pointer"
            >
              <MdDeleteSweep size={18} /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;
