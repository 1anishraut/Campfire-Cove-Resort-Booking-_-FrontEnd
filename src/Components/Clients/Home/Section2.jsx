import React from 'react'

const Section2 = () => {
  return (
    <div className="w-full  flex flex-col items-center pb-18 bg-green">
      <div className=" relative pb-12 mt-18">
        <h1 className="uppercase text-5xl  lg:text-7xl font-bold text-white font-robotoMedium">
          Wild & <br /> Wonderful
        </h1>
        <span className="font-paintBrush rotate-350 text-7xl md:text-8xl absolute bottom-0 right-0 text-orange">
          Stays
        </span>
      </div>

      <p className="max-w-[500px] text-center mt-8 text-gray-300 text-md leading-relaxed font-robotoLight mx-8">
        Escape the ordinary and reconnect with nature at Campfire Cove. Choose
        from cozy camps, charming cottages, or eco-lodges where rustic charm
        meets modern comfort. Wake up to birdsong, wander hidden trails, and end
        your day by a glowing campfire under a sky full of stars.
      </p>
    </div>
  );
}

export default Section2