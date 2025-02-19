import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
// import { useAuth } from "../hook/auth/AuthContext";

const User = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = localStorage.getItem("biz-bozz-id");
  // const { logout } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    window.location.href = `/login`;
    localStorage.removeItem("biz-bozz-token");
    localStorage.removeItem("bz-user");
    // logout();
  };

  return (
    <div className="relative inline-block text-left">
      <div
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center gap-4 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-md"
      >
        <div className="text-primary border border-primary rounded-full p-2">
          <FaUser size={20} />
        </div>
        <div>
          <p className="font-bold text-primary">{user?.name}</p>
        </div>
      </div>

      {/* Dropdown menu */}
      <button
        onClick={handleClose}
        className={`${
          isOpen ? "z-10" : "hidden"
        } bg-white absolute right-0 mt-2 w-[162px] py-5 rounded-md shadow-lg flex justify-center items-center gap-2`}
      >
        <GoSignOut size={25} className="text-primary" />
        <p className="bg-white text-primary font-futura text-xl font-semibold rounded-md px-4 py-2">
          Logout
        </p>
      </button>
    </div>
  );
};

export default User;
