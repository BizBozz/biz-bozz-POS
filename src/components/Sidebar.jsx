import { useState } from "react";

import { IoClose } from "react-icons/io5";

const GenerateCode = ({ closeSidebar }) => {
  const toggleDropdown = () => {
    closeSidebar();
  };
  // const currentDate = new Date(); // Get the current date

  return (
    <div className="flex bg-secondary justify-center items-center h-screen overflow-y-auto py-5 relative">
      <div
        className="h-full flex justify-center flex-col
       px-8 rounded-lg w-36  bg-secondary"
      >
        <div className="flex flex-col gap-3 justify-center items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block flex gap-4 p-2 rounded ${
                isActive
                  ? "bg-primary text-black font-semibold"
                  : "hover:bg-gray-700 text-white"
              }`
            }
            onClick={toggleDropdown}
          >
            Home
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `block flex gap-4 p-2 rounded ${
                isActive
                  ? "bg-primary text-black font-semibold"
                  : "hover:bg-gray-700 text-white"
              }`
            }
            onClick={toggleDropdown}
          >
            Menu
          </NavLink>
        </div>
        <button className="absolute top-0 end-0 p-2" onClick={closeSidebar}>
          <IoClose className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

GenerateCode.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
};

export default GenerateCode;
