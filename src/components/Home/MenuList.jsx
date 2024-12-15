import { useEffect, useState } from "react";
import MenuModel from "./../Menu/MenuModel";
import MenuCard from "./MenuCard";
import getItems from "../../api/Menu/getItems";

const MenuList = ({ category }) => {
  const [menuLists, setMenuList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMenuList = async () => {
    const res = await getItems();
    // console.log("item List", res.data[0].categoryName);
    setMenuList(res.data);
  };

  useEffect(() => {
    getMenuList();
  }, []);

  if (menuLists.length === 0) {
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
    <div className="flex flex-col md:flex-row md:flex-wrap gap-5 mt-5 pb-40">
      {menuLists.map((menu) => {
        return (
          menu.categoryName === category &&
          menu.items.map((item) => <MenuCard key={item._id} menu={item} />)
        );
      })}
    </div>
  );
};

export default MenuList;
