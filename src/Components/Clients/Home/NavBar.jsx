import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../../../src/assets/images/pngegg (1).png"

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/");
  };

  const linkClass =
    "block px-4 py-2 md:px-0 md:py-0 transition-colors duration-200";

  return (
    <nav className="w-full bg-[#053C36] text-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <div
        onClick={()=> handleClick()}
         className="text-xl  tracking-wide flex items-center gap-1  font-robotoLight relative pb-2 cursor-pointer">
          <img src={logo} alt="" className="h-10 w-auto"/>
          <h1 className="mr-4">Campfire Cove</h1>
          <span className="absolute bottom-0 right-0 font-paintBrush text-orange text-2xl rotate-350">Resort</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 font-robotoMedium">
          {["/", "/stays", "/adventures", ""].map((path, idx) => {
            const names = ["Home", "Stays", "Adventures", ""];
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  end
                  className={({ isActive }) =>
                    `${linkClass} ${
                      isActive
                        ? "text-orange border-b-2 border-orange"
                        : "hover:text-orange transition-all duration-300"
                    }`
                  }
                >
                  {names[idx]}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* BOOK NOW button */}
        <NavLink
          to="/booking"
          className="hidden md:block border-2 border-orange hover:bg-orange text-white px-5 py-2 rounded-full transition-all duration-300"
        >
          BOOK NOW
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-[#053C36] border-t border-gray-700">
          <ul className="flex flex-col items-start px-6 py-4 gap-4 font-robotoMedium">
            {["/", "/stays", "/adventures", ""].map((path, idx) => {
              const names = ["Home", "Stays", "Adventures", ""];
              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    end
                    className={({ isActive }) =>
                      `${linkClass} ${
                        isActive ? "text-orange" : "hover:text-orange"
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {names[idx]}
                  </NavLink>
                </li>
              );
            })}
            <NavLink
              to="/booking"
              className="w-full text-center border-2 border-orange  text-white px-5 py-2 rounded-full transition"
              onClick={() => setOpen(false)}
            >
              BOOK NOW
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
