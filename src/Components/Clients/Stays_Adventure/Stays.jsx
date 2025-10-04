import React, { useEffect, useState } from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import axios from "axios";

import SelectionButtons from "./SelectionButtons";
import { useLocation } from "react-router";

const Stays = () => {
  const [stays, setStays] = useState([]);
  const [selectedStay, setSelectedStay] = useState(0);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const res = await axios.get("/Stays.json");
      // console.log("Fetched data:", res.data.stays);

      setStays(res.data.stays || res.data);
    } catch (err) {
      console.error("Error fetching stays:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  //  check if navigation sent a selectedStay index
  useEffect(() => {
    if (location.state?.selectedStay !== undefined) {
      setSelectedStay(location.state.selectedStay);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.state]);


  if (stays?.length === 0) {
    return <div className="text-center mt-20 text-lg">Loading stays...</div>;
  }

  return (
    <div className="w-full pt-20 flex flex-col items-center">
      <Section1 stay={stays[selectedStay]} />

      <Section2 images={stays[selectedStay].images} />

      <SelectionButtons
        stays={stays}
        selectedStay={selectedStay}
        setSelectedStay={setSelectedStay}
      />
    </div>
  );
};

export default Stays;
