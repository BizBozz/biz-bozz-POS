import { useState } from "react";
import MenuList from "../components/Home/MenuList";
import { categorys } from "./MenuPage";
import TableSelection from "../components/Home/TableModel";
import { useSelector } from "react-redux";
import { menus } from "../components/Menu/MenuList";
import Receipt from "../components/Home/Receipt";
// import { selectTable, addItemToReceipt } from "./../redux/receiptS

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const tables = [1, 2, 3, 4, 5];

  return (
    <div className="px-5 pt-2">
      <div className="flex">
        {/* Menu*/}
        <div className="w-2/3 ">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold mb-5">Menu</p>
            <button
              className="bg-black text-white px-4 py-2 me-5 rounded-md transition duration-200 border border-black hover:bg-white hover:text-black focus:outline-none focus:scale-105"
              onClick={() => setIsOpen(true)}
            >
              Select Table
            </button>
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
          <MenuList category={selectedCategory} />
        </div>
        {/* Receipt */}
        <div className="w-1/3 border-l border-black">
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
