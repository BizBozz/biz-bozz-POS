import React, { useState } from "react";
import MenuModel from "./MenuModel";
// import Modal from "./Modal"; // Import the Modal component

const MenuList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-3 h-screen bg-white">
      <div className="flex justify-between w-full px-8">
        <h1 className="text-2xl font-bold">Menu</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white rounded-md px-4 py-2 hover:bg-blue-700"
        >
          Add New Category
        </button>
      </div>
      <div className="flex space-x-2 mt-4 w-full px-8">
        <button className="border border-gray-300 rounded-md px-4 py-2">
          Chinese Foods
        </button>
        <button className="border border-gray-300 rounded-md px-4 py-2">
          Thai Food
        </button>
        <button className="border border-gray-300 rounded-md px-4 py-2">
          Traditional
        </button>
        <button className="border border-gray-300 rounded-md px-4 py-2">
          Snack
        </button>
        <button className="border border-gray-300 rounded-md px-4 py-2">
          Drinks
        </button>
      </div>
      <div className="text-center mt-[150px] ">
        <p className="font-mediun text-3xl">No Menu at the Moment!</p>
        <p className="font-medium text-3xl">Set Up your Shop Menu</p>
        <button
          className=" mt-5 bg-primary text-xl text-black py-2 px-10 rounded-md
                     transition duration-200 hover:text-primary hover:bg-black hover:border hover:border-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create Menu
        </button>
      </div>
      <MenuModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MenuList;
