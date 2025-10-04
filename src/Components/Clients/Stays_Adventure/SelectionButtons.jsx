import React from 'react'
import { FaStar } from "react-icons/fa";
const SelectionButtons = ({stays, setSelectedStay, selectedStay}) => {
  const selectionButton = (index)=>{
    setSelectedStay(index)
    
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
        });
  }
  return (
    <div className="flex flex-wrap gap-4 p-6 justify-center bg-green w-full">
            {stays.map((s, index) =>
              index !== selectedStay ? (
                <div
                  key={s.id}
                  onClick={()=>selectionButton(index)}
                  className="flex flex-col  "
                >
                  <div className="h-50 md:h-60 w-80 overflow-hidden rounded-xl  cursor-pointer relative ">
                    <img
                      src={s.images[0]}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 "
                    />
                    <div
                      className="absolute bottom-0 left-0 w-full h-full 
                    bg-gradient-to-t from-green via-black/30 to-transparent
                    text-white text-center font-robotoMedium text-lg z-10 "
                    >
                      <h1 className="absolute bottom-6 left-1/2 -translate-x-1/2 font-paintBrush text-6xl">
                        {s.stayType}
                      </h1>
                    </div>
                  </div>
    
                  <div className=" py-2 bg-orange hover:bg-orange-light text-white  font-robotoLight rounded transition cursor-pointer flex gap-6 items-center justify-center">
                    <p>{s.stayName}</p>
                    <p className="flex items-center justify-center gap-2">
                      <FaStar /> 4.5/5
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>
  )
}

export default SelectionButtons