import { useDispatch, useSelector } from "react-redux";
import { menus } from "./../../components/Menu/MenuList";
import { CiSquareMinus } from "react-icons/ci";
import { removeItemFromReceipt } from "../../redux/receiptSlice";
import { useState } from "react";
import CalculatorModal from "./CalculatorModel";
import "./../input.css";

function Receipt() {
  const dispatch = useDispatch();
  const selectedTable = useSelector((state) => state.receipts.selectedTable);
  const receipts = useSelector((state) => state.receipts.receipts);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentReceipt = receipts[selectedTable] || [];

  // Function to calculate total price and item counts
  const calculateTotalAndCounts = () => {
    const counts = {};
    let total = 0;

    currentReceipt.forEach((item) => {
      counts[item.name] = (counts[item.name] || 0) + 1;
      total += item.price;
    });

    return { counts, total };
  };

  const handleRemoveItem = (itemName) => {
    if (selectedTable !== null) {
      dispatch(removeItemFromReceipt({ table: selectedTable, itemName }));
    }
  };

  const { counts, total } = calculateTotalAndCounts();

  return (
    <div>
      <div className="px-5">
        <p className="text-2xl font-bold mb-5">Receipt</p>
        {selectedTable && (
          <div>
            <p className="text-lg font-semibold mb-5">
              Table {selectedTable} Order Dish
            </p>
            <div className="receipt">
              {Object.keys(counts).map((itemName) => (
                <div key={itemName} className="font-medium mb-2 flex">
                  <span className="w-1/3">{itemName}</span>{" "}
                  <span className="w-1/3 flex items-center">
                    {" "}
                    {counts[itemName]} pcs{" "}
                    <button
                      className="mx-5"
                      onClick={() => handleRemoveItem(itemName)}
                    >
                      <CiSquareMinus />
                    </button>
                  </span>
                  <span className="w-1/3 text-right">
                    {counts[itemName] *
                      menus.find((item) => item.name === itemName).price}{" "}
                    MMK
                  </span>
                </div>
              ))}
              <div className="font-medium mb-2 flex border-b-4"></div>
              <div className="flex justify-between items-center font-bold text-xl">
                <span className="">Price</span> <span>{total} MMK</span>
              </div>
            </div>
            <div className="flex gap-5 mt-5">
              <button className="bg-white w-full text-black text-xl font-bold px-4 py-2 rounded-md transition duration-200 border border-black focus:outline-none focus:scale-105">
                Cancel
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-black w-full text-white text-xl font-bold px-4 py-2 rounded-md transition duration-200 border border-black focus:outline-none focus:scale-105"
              >
                ConFirm Order
              </button>
            </div>
          </div>
        )}
        {isModalOpen && (
          <CalculatorModal
            totalPrice={total}
            table={selectedTable}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Receipt;
