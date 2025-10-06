import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { SiCoffeescript } from "react-icons/si";
import { IoBonfireSharp, IoBicycle } from "react-icons/io5";
import { GiBarbecue } from "react-icons/gi";
import { TbMassage } from "react-icons/tb";

const AvailableRoomAdv = ({
  rooms,
  adventures,
  handleAddRoom,
  handleAddAdventure,
  isGreen,
  isGreenAdv,
}) => {
  const [showRooms, setShowRooms] = useState(true);
  const [showAdventures, setShowAdventures] = useState(false);
  const showRomsToggle = () => {
    setShowRooms((prev) => !prev);
  };
  const showAdventuresToggle = () => {
    setShowAdventures((prev) => !prev);
  };

  const Amenities = [
    {
      icon: <SiCoffeescript />,
      title: "Breakfast & Dinner Package",
      details: "Freshly cooked local cuisine.",
    },
    {
      icon: <IoBonfireSharp />,
      title: "Bonfire Setup with Music",
      details: "Private evening bonfire with seating.",
    },
    {
      icon: <GiBarbecue />,
      title: "Barbecue Grill",
      details: "BBQ equipment with marinated ingredients.",
    },
    {
      icon: <TbMassage />,
      title: "Spa/Body Massage",
      details: "Relaxing wellness session.",
    },
    {
      icon: <IoBicycle />,
      title: "Cycle Rental",
      details: "Explore nearby trails and viewpoints.",
    },
  ];

  return (
    <>
      {/* Rooms Section */}
      <div className="w-full max-w-[1200px] rounded-2xl p-8 bg-[#ffffff28] mb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold ">Select Stays</h3>
          <button
            onClick={showRomsToggle}
            className="bg-orange hover:scale-110 hover:rotate-90 text-white px-3 py-3 rounded-full  transition-all duration-300 cursor-pointer"
          >
            {showRooms ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
        </div>
        {showRooms && (
          <div className="">
            {rooms.map((room) => (
              <div
                key={room._id}
                className={`mb-3 rounded-lg shadow-md p-4  flex flex-col lg:flex-row gap-2 lg:gap-8 ${
                  isGreen === room._id
                    ? "bg-green-300 scale-104 mb-6 mt-6 transition-all duration-300"
                    : "bg-gray-200"
                }`}
              >
                <div className=" lg:w-[30%]">
                  <img
                    src={room.roomImage}
                    alt={room.roomName}
                    className="w-80 h-50 object-cover mt-3 rounded-md"
                  />
                </div>

                <div className="flex flex-col lg:flex-row justify-between lg:w-[70%]">
                  <div className="">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                      {room.roomName}
                    </h1>
                    <p>{room.roomSize} sq.ft</p>
                    <div className="flex items-center gap-2 text-xs">
                      <p className="border border-orange-medium rounded-full px-2 bg-orange-light">
                        NON REFUNDABLE
                      </p>
                      <p className="border border-orange-medium rounded-full px-2 bg-orange-light">
                        FREE WIFI
                      </p>
                    </div>
                    <p className="text-gray-700">{room.roomDescription}</p>

                    <div>
                      <h2 className="font-semibold text-gray-800">
                        Amenities:
                      </h2>
                      <ul className="pl-5 space-y-1">
                        {Amenities.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="m-1 text-orange">{item.icon}</span>
                            <p className=" flex gap-2">
                              <span className="text-md font-semibold text-gray-800">
                                {item.title}
                              </span>
                              <span className="text-sm hidden md:block text-gray-700">
                                – {item.details}{" "}
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="self-end flex  lg:flex-col items-center gap-4">
                    <p className="text-gray-600 flex lg:flex-col items-end gap-4 lg:gap-0 ">
                      <span className="line-through">
                        ₹ {(room.roomPrice * 1.1).toFixed(1)}
                      </span>
                      <span className="text-black font-semibold text-2xl">
                        ₹{room.roomPrice}
                      </span>
                    </p>

                    <button
                      onClick={() => handleAddRoom(room._id, room.roomPrice)}
                      className="bg-orange hover:text-black hover:scale-105 hover:shadow-xl shadow-black text-white cursor-pointer mt-3 px-8 py-2 rounded-lg transition-all duration-300"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Adventures Section */}
      <div className="w-full max-w-[1200px] rounded-2xl p-8 bg-[#ffffff28] ">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Select Adventure</h3>
          <button
            onClick={showAdventuresToggle}
            className="bg-orange hover:scale-110 hover:rotate-90 text-white px-3 py-3 rounded-full  transition-all duration-300 cursor-pointer"
          >
            {showAdventures ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
        </div>
        {showAdventures && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adventures.map((adv) => (
              <div
                key={adv._id}
                className={`mb-3 rounded-lg shadow-md p-4  flex flex-col  gap-2 justify-between ${
                  isGreenAdv === adv._id
                    ? "bg-green-300 scale-105 mr-2 ml-2 transition-all duration-600"
                    : "bg-gray-200"
                }`}
              >
                <div className="flex flex-col ">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {adv.advName}
                  </h4>

                  {adv.advImage && (
                    <img
                      src={adv?.advImage}
                      alt={adv.advName}
                      className="w-full h-50 object-cover mt-3 rounded-md"
                    />
                  )}
                  <div className="flex flex-wrap mt-2 items-center gap-2 text-xs text-gray-800 ">
                    <p className="border border-orange-medium rounded-full px-2 bg-orange-light">
                      Certified Guides
                    </p>
                    <p className="border border-orange-medium rounded-full px-2 bg-orange-light">
                      Safety Gear
                    </p>
                    <p className="border border-orange-medium rounded-full px-2 bg-orange-light">
                      First-Aid Support
                    </p>
                    <p className="border border-orange-medium rounded-full px-2 bg-orange-light">
                      Transport Facility
                    </p>
                    <p className="border border-orange-medium rounded-full px-2 bg-orange-light">
                      Photography/Videography
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {adv.advDescription}
                  </p>
                </div>

                <div className="self-end flex items-center gap-4">
                  <p className="text-gray-600 flex  items-end gap-4  ">
                    <span className="line-through">
                      ₹ {(adv.advPrice * 1.1).toFixed(1)}
                    </span>
                    <span className="text-black font-semibold text-2xl">
                      ₹{adv.advPrice}
                    </span>
                  </p>

                  <button
                    onClick={() => handleAddAdventure(adv._id, adv.advPrice)}
                    className="bg-orange hover:text-black hover:scale-105 hover:shadow-xl shadow-black text-white cursor-pointer mt-3 px-8 py-2 rounded-lg transition-all duration-300"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AvailableRoomAdv;
