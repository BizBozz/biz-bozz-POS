import { useEffect, useState } from "react";
import MenuModel from "./MenuModel";
import MenuCard from "./MenuCard";
import getItems from "../../api/Menu/getItems";
import PropTypes from "prop-types";
// import Modal from "./Modal"; // Import the Modal component

export const menus = [
  {
    id: 1,
    name: "Noddle Chicken",
    category: "Chinese",
    description: "Chinese Foods",
    price: 12000,
    image:
      "https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg",
  },
  {
    id: 2,
    name: "Burger",
    category: "Snack",
    price: 5000,
    image:
      "https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg",
  },
  {
    id: 3,
    name: "PanCake",
    category: "Snack",
    price: 4000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3jTszSflQt-SjZGIWqJRegF0GrAVzpCQtg&s",
  },
  {
    id: 4,
    name: "Fired Rice",
    category: "Chinese",
    price: 12000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8zOr61ClhKgDT3gxOspbBscHbW73OWw26Q&s",
  },
  {
    id: 5,
    name: "Tom Yum Soup",
    category: "Thai",
    price: 5000,
    image:
      "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/w_1120,h_650/v1621044977/Southeast-Asian-Food-Tom-Yum-Goong-1/Southeast-Asian-Food-Tom-Yum-Goong-1.jpg",
  },
  {
    id: 6,
    name: "Mote Hin Khar",
    category: "Myanmar",
    price: 3000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1zcCaaZro1N6k63QZvQcQqVMNVwuN2jaut2XX5mWGHCmGh7xbRCTI9xxQqcFHGUOYYnk&usqp=CAU",
  },
  {
    id: 7,
    name: "Nan Gyi Thoke",
    category: "Myanmar",
    price: 3000,
    image:
      "https://www.luckytreasuretravels.com/media/cache/ec/04/ec04c990ae0487d3b139158a97fb438b.jpg",
  },
  {
    id: 8,
    name: "Coca Cola",
    category: "Drinks",
    price: 2500,
    image:
      "https://cdn.webshopapp.com/shops/263312/files/270320371/650x650x2/coca-cola-coca-cola-original-330ml.jpg",
  },
  {
    id: 9,
    name: "Steak",
    category: "Western",
    price: 30000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ0S0zsz0aoc2loYnD0jzqt2D8FhB5GX4aAQ&s",
  },
];

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
  }, [isModalOpen]);

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
    <div className="flex flex-wrap gap-5 mt-5">
      {menuLists.map((menu) => {
        return (
          menu.categoryName === category &&
          menu.items.map((item) => <MenuCard key={item._id} menu={item} />)
        );
      })}
    </div>
  );
};

MenuList.propTypes = {
  category: PropTypes.string.isRequired,
};

export default MenuList;
