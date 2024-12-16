import { useEffect, useState } from "react";
import MenuList from "../components/Home/MenuList";
// import { categorys } from "./MenuPage";
import TableSelection from "../components/Home/TableModel";
import Receipt from "../components/Home/Receipt";
import getMenu from "../api/Menu/getMenu";
// import { selectTable, addItemToReceipt } from "./../redux/receiptS

function HomePage({ isVisible }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categorys, setCategorys] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const tables = [1, 2, 3, 4, 5];

  const getAllCategory = async () => {
    const res = await getMenu();
    // console.log(res.data.categories[0].categories[0]);
    setCategorys(res.data.categories[0].categories);
    setSelectedCategory(res.data.categories[0].categories[0]);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row">
        {/* Menu*/}
        <div className="w-full md:w-2/3 overflow-y-auto h-screen px-5 pt-2 overflow-x-hidden">
          <div className="flex justify-between items-center">
            <p className="sub-header mb-5">Menu</p>
            <button
              className="bg-primary font-bold text-white px-4 py-2 me-5 rounded-md border border-primary transition duration-200 hover:bg-white hover:text-primary focus:outline-none focus:scale-105"
              onClick={() => setIsOpen(true)}
            >
              Select Table
            </button>
          </div>
          <div className="w-screen md:w-full overflow-y-auto md:overflow-hidden flex md:flex-wrap gap-5 md:me-[200px] hide-scrollbar">
            {categorys.map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <button
                  className={`${
                    selectedCategory === category
                      ? "bg-prilight text-primary"
                      : "bg-white text-black"
                  } font-bold text-[14px] px-5 py-2 rounded-3xl transition duration-200 hover:bg-prilight hover:text-primary focus:outline-none focus:scale-105`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <p className="font-bold">{category}</p>
                </button>
              </div>
            ))}
          </div>
          <MenuList category={selectedCategory} />
        </div>
        {/* Receipt */}
        <div className="hidden md:block w-full md:w-1/3 border-l border-gray-300 ">
          <Receipt />
        </div>
        <div
          className={`md:hidden fixed h-screen bg-primary text-white transition-transform duration-300 transform ${
            isVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <Receipt />
        </div>
      </div>
      {/* Table Model */}
      <div className="flex justify-between items-center">
        <TableSelection
          tables={tables}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default HomePage;
