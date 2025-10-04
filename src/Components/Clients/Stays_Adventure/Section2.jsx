import React, { useState } from "react";
import GalleryPopup from "./GalleryPopup";

const Section2 = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const openImage = (index) => setCurrentIndex(index);
  const closeImage = () => setCurrentIndex(null);

  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white py-10 w-full flex justify-center">
      <div className="flex max-w-6xl gap-4 px-6">
        {/* ROW 1 */}
        <div className="flex flex-col gap-4 pt-10 w-1/4">
          <div
            className="h-60 overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={() => openImage(0)}
          >
            <img
              src={images[0]}
              alt="gallery-1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="h-full max-h-80 overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={() => openImage(1)}
          >
            <img
              src={images[1]}
              alt="gallery-2"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="flex flex-col-reverse gap-4 pb-10 w-1/4">
          <div
            className="h-60  overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={() => openImage(2)}
          >
            <img
              src={images[2]}
              alt="gallery-3"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="h-full  max-h-80 overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={() => openImage(3)}
          >
            <img
              src={images[3]}
              alt="gallery-4"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* ROW 3 */}
        <div className="flex flex-col gap-4 pt-10 w-1/4">
          <div
            className="h-60 overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={() => openImage(4)}
          >
            <img
              src={images[4]}
              alt="gallery-5"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="h-full  max-h-80 overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={() => openImage(5)}
          >
            <img
              src={images[5]}
              alt="gallery-6"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* ROW 4 */}
        <div className="flex flex-col-reverse gap-4 pb-10 w-1/4">
          <div
            className="h-60 overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={() => openImage(6)}
          >
            <img
              src={images[6]}
              alt="gallery-7"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="h-full  max-h-80 overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={() => openImage(7)}
          >
            <img
              src={images[7]}
              alt="gallery-8"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* POPUP */}
      {currentIndex !== null && (
        <GalleryPopup
          images={images}
          currentIndex={currentIndex}
          onClose={closeImage}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </div>
  );
};

export default Section2;
