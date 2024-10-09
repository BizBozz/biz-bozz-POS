import React, { useState } from "react";
import CategoryModal from "../components/Menu/CategoryModel";
import MenuList from "../components/Menu/MenuList";

const categorys = ["Chinese", "Thai", "Myanmar"];

function MenuPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (categorys.length === 0) {
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
          <CategoryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <MenuList />
    </>
  );
}

export default MenuPage;
