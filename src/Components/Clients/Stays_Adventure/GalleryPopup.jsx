import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";


const GalleryPopup = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  if (currentIndex === null) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-500 cursor-pointer"
      >
        ✕
      </button>

      
      <button
        onClick={onPrev}
        className="absolute left-6 text-white text-4xl font-bold hover:text-orange cursor-pointer"
      >
        <GrPrevious />
      </button>

      
      <img
        src={images[currentIndex]}
        alt="popup-view"
        className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-xl "
      />

     
      <button
        onClick={onNext}
        className="absolute right-6 text-white text-4xl font-bold hover:text-orange cursor-pointer"
      >
        <GrNext />
      </button>
    </div>
  );
};



export default GalleryPopup
