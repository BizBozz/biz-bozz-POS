import { useState } from "react";
import { selectTable } from "./../../redux/receiptSlice";
import { useDispatch, useSelector } from "react-redux";

const TableSelection = ({ isOpen, onClose, tables }) => {
  const dispatch = useDispatch();
  const selectedTable = useSelector((state) => state.receipts.selectedTable);
  const receipts = useSelector((state) => state.receipts.receipts);
  const [type, setType] = useState();
  //   console.log(receipts);

  const handleTableSelect = (table) => {
    dispatch(selectTable(table));
    setTimeout(() => {
      onClose();
    }, 300);
  };

  //   console.log("tables", tables);
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Table</h2>
          <button
            className="bg-black text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Hide Tables
          </button>
        </div>

        <div className="mb-4 ">
          <p className="font-medium mb-2">Select Dining Type</p>
          <div className="flex items-center mb-2 gap-2">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="takeAway"
                name="diningType"
                className="mr-2"
                onClick={() => setType("takeAway")}
              />
              <label htmlFor="takeAway">Take Away</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="delivery"
                name="diningType"
                className="mr-2"
              />
              <label htmlFor="delivery">Delivery</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="dineIn"
                name="diningType"
                className="mr-2"
              />
              <label htmlFor="dineIn">Dine In</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-medium">Select Table</p>
          <div className="grid grid-cols-3 gap-4">
            {tables.map((table) => (
              <button
                key={table}
                className={`${
                  receipts[table] || selectedTable === table
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } border border-black py-2 px-4 rounded`}
                onClick={() => handleTableSelect(table)}
              >
                {table}
              </button>
            ))}
          </div>
        </div>

        {/* <div className="flex gap-4 my-4 justify-end">
          <button className="border border-black text-black py-2 px-4 rounded">
            Cancel
          </button>
          <button className="bg-black text-white py-2 px-4 rounded">
            Confirm Table
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TableSelection;
