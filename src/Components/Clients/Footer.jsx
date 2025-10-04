import React from "react";
import logo from "../../../src/assets/images/pngegg (1).png";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#062621] w-full flex flex-col items-center pt-10 ">
      <div className="text-2xl md:text-4xl  tracking-wide flex items-center gap-1  font-robotoLight relative pb-4 md:pb-2 ">
        <img src={logo} alt="" className=" h-10 md:h-20 w-auto" />
        <h1 className="mr-4 font-robotoMedium text-white-light">
          Campfire Cove
        </h1>
        <span className="absolute bottom-0 right-0 font-paintBrush text-orange text-4xl md:text-5xl rotate-350">
          Resort
        </span>
      </div>
      <p className="text-gray-400 text-sm md:text-md mb-4 md:mb-6 text-center max-w-[65%]">
        Escape the ordinary and unwind where fires burn bright and memories last
      </p>

      <div className="flex gap-6 justify-center items-center mt-4">
        <a
          href=""
          // target="_blank"
          // rel="noopener noreferrer"
          className="text-white-light text-2xl hover:text-[#3b5998] transition-colors duration-300"
        >
          <FaFacebookF />
        </a>
        <a
          href=""
          // target="_blank"
          // rel="noopener noreferrer"
          className="text-white-light text-2xl hover:text-[#E1306C] transition-colors duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href=""
          // target="_blank"
          // rel="noopener noreferrer"
          className="text-white-light text-2xl hover:text-[#1DA1F2] transition-colors duration-300"
        >
          <FaTwitter />
        </a>
        <a
          href=""
          // target="_blank"
          // rel="noopener noreferrer"
          className="text-white-light text-2xl hover:text-[#FF0000] transition-colors duration-300"
        >
          <FaYoutube />
        </a>
      </div>

      <div className="border-t-2 border-green w-full mt-4 flex flex-col items-center gap-2 pt-2">
        <p className="text-sm text-gray-400">
          Cancellation Policy | Terms & Conditions | Privacy Policy
        </p>

        <p className="text-gray-400 hover:text-white-light text-sm md:text-base tracking-wide">
          <a
            href="https://www.linkedin.com/in/anish-raut/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2025 Design &amp; Develop <span className="mx-2">| |</span>
            <span className="">Anish Raut</span>
          </a>
        </p>
      </div>
      <div className="bg-[#062621] w-full h-[20px] "></div>
    </div>
  );
};

export default Footer;
