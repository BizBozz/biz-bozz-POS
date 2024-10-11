import { useState } from "react";
import MenuModel from "./../Menu/MenuModel";
import MenuCard from "./MenuCard";

import { menus } from "../Menu/MenuList";

const MenuList = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (menus.length === 0) {
    return (
      <div className="flex w-full justify-center items-center">
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
    <div className="flex flex-wrap gap-5 mt-5 pb-40">
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
