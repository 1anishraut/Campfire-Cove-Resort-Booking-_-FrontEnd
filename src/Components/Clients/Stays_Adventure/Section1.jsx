import React from "react";

const Section1 = ({stay}) => {
  return (
    <div id={stay.id} className="bg-green w-full flex flex-col items-center py-16">
      <h2 className="text-6xl md:text-9xl mb-4 text-white-light font-paintBrush">
       {stay.stayType}
      </h2>

      <div className="flex flex-col md:flex-row gap-4 md:gap-0  items-center   max-w-6xl md:px-2">
        <p className="text-orange uppercase text-2xl md:text-4xl font-robotoMedium md:pr-30 text-end md:w-[40%] ">
          {stay.stayName}
        </p>
        <p className="text-white  text-md text-center md:text-justify font-robotoLight md:w-[60%] md:pl-30  md:border-l px-6 md:px-0">
          {stay.description}
        </p>
      </div>
    </div>
  );
};

export default Section1;
