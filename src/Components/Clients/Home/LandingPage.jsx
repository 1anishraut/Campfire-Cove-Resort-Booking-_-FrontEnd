import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"; // ✅ correct import
import { useDispatch } from "react-redux";
import { setBookingDates } from "../../../Utils/dateSlice";
import { FaCalendarAlt } from "react-icons/fa";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Blank from "./Blank";
import Section6 from "./Section6";

export default function LandingPage() {
  const images = [
    "https://www.freeformtents.com/wp-content/uploads/2025/07/Kopanga-TWILIGHTTent-Photo-4-of-13-new-sky.jpg",
    "https://images.trvl-media.com/lodging/49000000/48700000/48696900/48696834/891f9f49.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrvI9RZuThwbsmu3i49QxcydlkVBGH8tWkZXJ_WaC8vlOZx9FbWfVals8NLoJzp1kG2VNSntRK22dl2XI-HrQYwoL3I_saotx-thdcBeDXAXlZedgMroKu0-seUTtTk5ofkpC2Q=s1360-w1360-h1020-rw",
    "https://images.trvl-media.com/lodging/49000000/48700000/48696900/48696834/0befe8e3.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      setBookingDates({
        checkIn: formatDate(checkIn),
        checkOut: formatDate(checkOut),
      })
    );
    navigate("/booking");
  };

  // console.log(checkIn, checkOut);
  

  return (
    <>
      <div className="flex flex-col justify-center   w-full relative md:mt-16 ">
        {/* --- Swiper Background --- */}
        <div className="relative w-full h-[550px] xl:h-[750px]">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full"
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={src}
                    alt={`slide-${i}`}
                    className={`w-full h-full object-cover transform transition-transform duration-[4000ms] ease-in-out ${
                      activeIndex === i ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* --- Overlay Booking Box --- */}
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#52525269] ">
          <form
            onSubmit={handleSubmit}
            className="w-[80%] md:w-[40%] lg:w-[60%] flex  justify-center bg-[#053c36c9] lg:bg-green py-4 rounded-tl-3xl rounded-br-3xl"
          >
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6  lg:px-12 py-2 border border-[#0f4f42] rounded-sm text-white">
              {/* Check-in */}
              <div className="flex  items-center">
                <label className=" mb-1">
                  <FaCalendarAlt size={20} />
                </label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  minDate={new Date()}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  placeholderText="CHECK-IN"
                  className="bg-transparent text-white text-center w-28 focus:outline-none cursor-pointer "
                  calendarClassName="!bg-white"
                />
              </div>

              {/* Divider */}
              <span className="hidden lg:block lg:h-6 w-px bg-[#0f4f42] " />
              <span className=" w-32 h-px bg-[#0f4f42] lg:hidden " />

              {/* Check-out */}
              <div className="flex  items-center">
                <label className=" mb-1">
                  <FaCalendarAlt size={20} />
                </label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  minDate={checkIn || new Date()}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  placeholderText="CHECK-OUT"
                  className="bg-transparent text-white text-center w-28 focus:outline-none cursor-pointer"
                  calendarClassName="!bg-white"
                />
              </div>

              {/* BOOK NOW */}
              <button
                type="submit"
                className="mx-5 lg:ml-20 bg-orange text-white font-semibold uppercase px-6 py-2 rounded-lg transition-all duration-300 cursor-pointer hover:bg-orange-medium hover:shadow-xl shadow-black hover:scale-101 "
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
      <Section2 />
      <Section3 />
      <Section4/>
      <Blank/>
      <Section5/>
      <Section6/>
    </>
  );
}
