import React from "react";

const Blank = () => {
  const text = "Spark. Savor. Stay.";
  return (
    <div className="w-full h-[200px] lg:h-[400px] bg-[#053c366b] relative flex flex-col justify-between">
      <div className="bg-gradient-to-b from-[#053C36] to-[#021e1a00] h-10 w-full "></div>
      <div className="bg-gradient-to-b from-[#021e1a00] to-[#053C36] h-10 w-full "></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center font-bold font-robotoMedium text-white px-4 text-center ">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
          {text.split("").map((ch, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-600 hover:text-green"
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Blank;
