import { useEffect, useState } from "react";
import MenuModel from "./MenuModel";
import MenuCard from "./MenuCard";
import getItems from "../../api/Menu/getItems";
import PropTypes from "prop-types";
import NoItems from "../NoItems";
// import Modal from "./Modal"; // Import the Modal component

const MenuList = ({ category }) => {
  // console.log(category);
  const [menuLists, setMenuList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMenuList = async () => {
    const res = await getItems();

    // console.log("item List", res.data);
    const menus = res.data.filter((menu) => menu.categoryName === category);
    // console.log("menus", menus);
    setMenuList(menus);
    // setMenuList(res.data);
  };

  useEffect(() => {
    getMenuList();
  }, [isModalOpen, category]);

  if (menuLists.length === 0) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className="text-center">
          <NoItems
            header="No Menu at the Moment!"
            subHeader="Set Up your Shop Menu"
          />
          <button
            className=" mt-5 bg-primary text-xl text-white py-2 px-10 rounded-md
                     transition duration-200 hover:text-primary hover:bg-black hover:border hover:border-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create Menu
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
        return menu.categoryName === category
          ? menu.items.map((item) => (
              <MenuCard key={item._id} menu={item} refreshMenu={getMenuList} />
            ))
          : null;
      })}
    </div>
  );
};

MenuList.propTypes = {
  category: PropTypes.string.isRequired,
};

export default MenuList;
