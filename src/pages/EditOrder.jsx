import { useEffect, useState } from "react";
import MenuList from "../components/Orders/MenuList";
// import { categorys } from "./MenuPage";
import getMenu from "../api/Menu/getMenu";
import TestingPage from "./TestingPage";
import OrderDetail from "./../components/Orders/OrderDetail";
// import { selectTable, addItemToReceipt } from "./../redux/receiptS

function EditOrder({ id, closeOrderDetails }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const [menuItem, setMenuItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const editClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getAllCategory = async () => {
    const res = await getMenu();
    // console.log(res.data.categories[0].categories[0]);
    setCategorys(res.data.categories[0].categories);
    setSelectedCategory(res.data.categories[0].categories[0]);
  };

  const itemData = (item) => {
    console.log("item data", item);
    setMenuItem(item);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="bg-white">
      <div className="flex">
        {/* Menu*/}
        {isModalOpen && (
          <div className="w-2/3 overflow-y-auto h-screen px-5 pt-2">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold mb-5">Menu</p>
            </div>
            <div className="flex flex-wrap gap-5 me-[200px]">
              {categorys.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <button
                    className={`${
                      selectedCategory === category
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    } px-4 py-2 rounded-md transition duration-200 border border-black hover:bg-black hover:text-white focus:outline-none focus:scale-105`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <p className="font-bold">{category}</p>
                  </button>
                </div>
              ))}
            </div>
            <MenuList category={selectedCategory} getItem={itemData} />
          </div>
        )}
        {/* Receipt */}
        <div
          className={`${
            isModalOpen ? "w-1/3" : "w-full"
          } border-l border-gray-300`}
        >
          <div className="">
            <OrderDetail
              closeOrderDetails={closeOrderDetails}
              menuItem={menuItem}
              editClick={editClick}
              id={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
