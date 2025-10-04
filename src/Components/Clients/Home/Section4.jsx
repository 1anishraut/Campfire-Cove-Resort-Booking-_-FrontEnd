import React from "react";
import {
  FaSwimmingPool,
  FaFire,
  FaChild,
  FaGlassCheers,
  FaSnowflake,
  FaBicycle,
  FaWifi,
  FaBroom,
  FaCar,
} from "react-icons/fa";

const Section4 = () => {
  const amenities = [
    { name: "Swimming Pool", icon: <FaSwimmingPool /> },
    { name: "Bonfire", icon: <FaFire /> },
    { name: "Playground", icon: <FaChild /> },
    { name: "Bar", icon: <FaGlassCheers /> },
    { name: "Air Conditioning", icon: <FaSnowflake /> },
    { name: "Cycling", icon: <FaBicycle /> },
    { name: "Wifi", icon: <FaWifi /> },
    { name: "House Keeping", icon: <FaBroom /> },
    { name: "Car Parking", icon: <FaCar /> },
  ];

  return (
    <div className="w-full flex justify-center bg-green">
      <div className="w-full max-w-[1300px]  text-white flex flex-col md:flex-row py-12 px-6 md:px-16 gap-8 ">
        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start">
          <h1 className="uppercase text-5xl  lg:text-7xl font-bold font-robotoMedium mb-2 tracking-wide">
            AMENITIES
          </h1>
          <span className="bg-orange w-[180px]  lg:w-[250px] h-[4px] mb-4"></span>
          <p className=" text-gray-300 text-md  leading-relaxed font-robotoLight text-center md:text-start md:pr-10  ">
            Campfire Cove Resort blends natural charm with thoughtful amenities,
            ensuring you relax in comfort after a day of adventure.
          </p>
        </div>

        {/* Right Grid */}
        <div className="md:w-1/2 grid grid-cols-3 gap-6 text-black">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between text-center bg-white-light p-4  hover:bg-green hover:scale-112 text-green hover:text-white transition-all duration-300"
            >
              <div className="text-4xl mb-2 text-orange">{amenity.icon}</div>
              <p className="font-robotoLight text-sm lg:text-md font-semibold ">
                {amenity.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
