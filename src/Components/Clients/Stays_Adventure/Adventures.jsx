
import React, { useEffect, useState } from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import axios from "axios";
import SelectionButtons from "./SelectionButtons";
const Adventures = () => {

  const [stays, setStays] = useState([]);
    const [selectedStay, setSelectedStay] = useState(0);
  
    const fetchData = async () => {
      try {
        const res = await axios.get("/Adventure.json");
        console.log("Fetched data:", res.data.Adventure);
  
        setStays(res.data.Adventure || res.data);
      } catch (err) {
        console.error("Error fetching stays:", err);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    if (stays?.length === 0) {
      return <div className="text-center mt-20 text-lg">Loading stays...</div>;
    }


  return (
    <div className="w-full pt-20 flex flex-col items-center bg-red-500">
      <Section1 stay={stays[selectedStay]} />

      <Section2 images={stays[selectedStay].images} />

      <SelectionButtons
        stays={stays}
        selectedStay={selectedStay}
        setSelectedStay={setSelectedStay}
      />
    </div>
  );
}

export default Adventures