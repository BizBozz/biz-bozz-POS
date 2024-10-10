import React, { useState } from "react";
import MenuModel from "./MenuModel";
import MenuCard from "./MenuCard";
// import Modal from "./Modal"; // Import the Modal component

export const menus = [
  {
    id: 1,
    name: "Chinese Foods",
    description: "Chinese Foods",
    price: 12000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Thai Foods",
    category: "Thai",
    price: 5000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Myanmar Foods",
    category: "Myanmar",
    price: 4000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Chinese Foods",
    category: "Chinese",
    price: 12000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Thai Foods",
    category: "Thai",
    price: 5000,
    image: "https://via.placeholder.com/150",
  },
];

const MenuList = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (menus.length === 0) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className="text-center">
          <p className="font-mediun text-3xl">No Menu at the Moment!</p>
          <p className="font-medium text-3xl">Set Up your Shop Menu</p>
          <button
            className=" mt-5 bg-primary text-xl text-black py-2 px-10 rounded-md
                     transition duration-200 hover:text-primary hover:bg-black hover:border hover:border-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create Menu Category
          </button>
        </div>
        <div className="">
          <MenuModel
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 mt-5">
      {menus.map((menu) => {
        if (category) {
          return (
            menu.category === category && <MenuCard key={menu.id} menu={menu} />
          );
        } else {
          return <MenuCard key={menu.id} menu={menu} />;
        }
      })}
    </div>
  );
};

export default MenuList;
