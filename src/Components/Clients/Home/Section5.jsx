import React from "react";

const Section5 = () => {
  const images = [
    {
      images:
        "https://www.theoaklandpress.com/wp-content/uploads/2021/08/TOP-L-FallGuide-firepit-02.jpg?w=862",
      caption: "Bonfire",
      desc: "Gather around our cozy bonfire pits, perfect for storytelling and roasting marshmallows under the stars.",
    },
    {
      images:
        "https://dynamic-media.tacdn.com/media/photo-o/2e/f5/16/e2/caption.jpg?w=1400&h=1000&s=1",
      caption: "Dinner Date",
      desc: "Enjoy a romantic dinner date at our scenic outdoor dining area, surrounded by nature's tranquility.",
    },
    {
      images:
        "https://th-i.thgim.com/public/food/features/6wbftr/article69822107.ece/alternates/FREE_1200/Boilermaker-interior.jpg",
      caption: "Bar",
      desc: "Unwind at our rustic bar, offering a selection of craft beers, wines, and signature cocktails to complement your stay.",
    },
  ];

  return (
    <div className="w-full bg-green text-white py-16 px-4">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((item, index) => (
          <div key={index} className="relative h-[500px] overflow-hidden group">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.images})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-end h-full px-6 text-center">
              <h2 className="text-6xl md:text-9xl  mb-4 text-white-light font-paintBrush">
                {item.caption}
              </h2>
              <p className="text-gray-200 mb-6 font-robotoLight">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section5;
