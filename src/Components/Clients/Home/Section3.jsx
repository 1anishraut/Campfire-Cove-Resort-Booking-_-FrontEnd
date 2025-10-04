import React, { useState } from "react";
import { useNavigate } from "react-router";

const Section3 = () => {
    const [hovered, setHovered] = useState(null);
    const navigate = useNavigate();
   const images = [
     {
       name: "Mountain Retreat",
       url: "https://images.trvl-media.com/lodging/49000000/48700000/48696900/48696834/891f9f49.jpg?impolicy=resizecrop&rw=1200&ra=fit",
     },
     {
       name: "Twilight Tent",
       url: "https://www.freeformtents.com/wp-content/uploads/2025/07/Kopanga-TWILIGHTTent-Photo-4-of-13-new-sky.jpg",
     },
     {
       name: "Forest Escape",
       url: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrvI9RZuThwbsmu3i49QxcydlkVBGH8tWkZXJ_WaC8vlOZx9FbWfVals8NLoJzp1kG2VNSntRK22dl2XI-HrQYwoL3I_saotx-thdcBeDXAXlZedgMroKu0-seUTtTk5ofkpC2Q=s1360-w1360-h1020-rw",
     },
     {
       name: "Lakeside Cabin",
       url: "https://images.trvl-media.com/lodging/49000000/48700000/48696900/48696834/0befe8e3.jpg?impolicy=resizecrop&rw=1200&ra=fit",
     },
   ];
  const handleClick = (index) => {
    navigate("/stays", { state: { selectedStay: index } });
  };


  return (
    <div className="bg-white-light w-full  flex flex-col items-center py-12">
      <div className=" relative pb-12 mt-18 flex flex-col items-center px-4 text-center">
        <h1 className="uppercase text-5xl  lg:text-7xl font-bold font-robotoMedium text-green">
          YOUR GATEWAY <br /> TO THE GREAT OUTDOORS
        </h1>
        <h6 className="text-orange font-robotoMedium text-2xl  lg:text-4xl py-4">
          OUR FOUR TOP STAYS
        </h6>
        <p className="max-w-[500px] text-center  text-md leading-relaxed font-robotoLight mx-8">
          Reconnect with nature’s rhythm while enjoying comfort, tranquility,
          and a touch of wilderness charm.
        </p>
      </div>

      <div className="flex  justify-center items-center gap-6 flex-wrap max-w-[1000px] w-full ">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={`h-[140px] md:h-[180px] lg:h-[400px] overflow-hidden  transition-all duration-500 shadow-2xl shadow-black relative cursor-pointer
            ${
              hovered === index
                ? "w-[600px]"
                : hovered !== null
                ? "w-[100px]" 
                : "w-[80%] lg:w-[200px]" 
            }`}
          >
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-full object-cover object-center"
            />

            <div
              className="absolute bottom-0 left-0 w-full h-full 
                bg-gradient-to-t from-green via-black/30 to-transparent
                text-white text-center font-robotoMedium text-lg z-10"
            >
              <h1 className="absolute bottom-6 left-1/2 -translate-x-1/2 font-paintBrush text-3xl">
                {img.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section3;
