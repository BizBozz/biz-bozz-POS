import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";

const User = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center gap-8 bg-white px-5 py-2 rounded-lg shadow-md"
      >
        <div>
          <p className="font-bold">{user?.name}</p>
          <span className="text-gray-400">{user?.role}</span>
        </div>
        <div className="text-gray-400 border border-gray-100 rounded-full p-2">
          <FaUser size={25} />
        </div>
      </div>

      {/* Dropdown menu */}
      <div
        className={`${
          isOpen ? "z-10" : "hidden"
        } bg-white absolute right-0 mt-2 w-[160px] py-5 rounded-md shadow-lg flex justify-center items-center gap-2`}
      >
        <GoSignOut size={25} className="text-primary" />
        <a
          href="#"
          className="bg-white text-primary font-futura text-xl font-semibold rounded-md px-4 py-2"
          onClick={handleClose}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default User;
