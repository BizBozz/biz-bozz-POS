import { useEffect, useState } from "react";
// import MenuModel from "./../Menu/MenuModel";
import MenuCard from "./MenuCard";
import getItems from "../../api/Menu/getItems";

const MenuList = ({ category, getItem }) => {
  const [menuLists, setMenuList] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const getMenuList = async () => {
    const res = await getItems();
    // console.log("item List", res.data[0].categoryName);
    setMenuList(res.data);
  };

  const sentItem = (item) => {
    // console.log("item sent", item);
    getItem(item);
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
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 mt-5 pb-40">
      {menuLists.map((menu) => {
        return (
          menu.categoryName === category &&
          menu.items.map((item) => (
            <MenuCard key={item._id} menu={item} sentItem={sentItem} />
          ))
        );
      })}
    </div>
  );
};

export default MenuList;
