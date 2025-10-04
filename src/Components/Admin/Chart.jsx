import { PieChart } from "@mui/x-charts/PieChart";
import AddNewStay from "./AddNewStay";
import { useState } from "react";

const Chart = ({ stayData, availableRooms }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalStays = stayData?.length;
  const booked = totalStays - availableRooms?.length;
  const available = availableRooms?.length;

  return (
    <div className="flex  md:flex-row flex-col-reverse items-center text-white">
      <div className=" flex flex-col gap-2 p-4 ">
        <p>Total Stays: {totalStays}</p>
        <p>Total Booked: {booked}</p>
        <p>Available Stays: {available}</p>
        <button onClick={()=>{setIsModalOpen(true)}} className="rounded-md bg-[#FC3200] px-4 py-2 hover:scale-105 transition-all duration-300 cursor-pointer">
          Add New Stay
        </button>
      </div>

      <PieChart
        series={[
          {
            data: [
              { id: 0, value: booked, label: "Booked" },
              { id: 1, value: available, label: "Available" },
            ],
            innerRadius: 25,
            outerRadius: 80,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 225,
            cx: 100,
            cy: 100,
          },
        ]}
        width={200}
        height={200}
      />
      {isModalOpen && <AddNewStay setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Chart;
