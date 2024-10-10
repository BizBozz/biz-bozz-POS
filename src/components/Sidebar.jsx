import { IoClose } from "react-icons/io5";
import { IoRestaurant } from "react-icons/io5";
import { RiMenuAddFill } from "react-icons/ri";

const GenerateCode = ({ closeSidebar }) => {
  const toggleDropdown = () => {
    closeSidebar();
  };
  // const currentDate = new Date(); // Get the current date

  return (
    <div className="flex bg-secondary justify-center h-screen overflow-y-auto py-5 relative">
      <div
        className="flex mt-10 flex-col
       px-2 rounded-lg w-26  bg-secondary"
      >
        <div>
          <p className="text-xl font-bold border border-black p-2 mb-20">
            Biz Bozz
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block flex gap-4 p-2 rounded ${
                isActive
                  ? "bg-black text-white font-semibold"
                  : "border border-black text-black hover:bg-black hover:text-white"
              }`
            }
            onClick={toggleDropdown}
          >
            <IoRestaurant className="text-2xl" />
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `block flex gap-4 p-2 rounded ${
                isActive
                  ? "bg-black text-white font-semibold"
                  : "border border-black text-black hover:bg-black hover:text-white"
              }`
            }
            onClick={toggleDropdown}
          >
            <RiMenuAddFill className="text-2xl" />
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
