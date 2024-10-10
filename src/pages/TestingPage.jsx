import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTable,
  addItemToReceipt,
  removeItemFromReceipt,
} from "./../redux/receiptSlice"; // Import actions from the slice

const TestingPage = () => {
  const dispatch = useDispatch();

  // Selectors
  const selectedTable = useSelector((state) => state.receipts.selectedTable);
  const receipts = useSelector((state) => state.receipts.receipts);

  const tables = [1, 2, 3, 4, 5];
  const menuItems = [
    { name: "Fried Chicken", price: 12000 },
    { name: "Orange Chicken", price: 12000 },
  ];

  const handleTableSelect = (table) => {
    dispatch(selectTable(table));
  };

  const handleMenuSelect = (item) => {
    if (selectedTable !== null) {
      dispatch(addItemToReceipt({ table: selectedTable, item }));
    }
  };

  const handleRemoveItem = (itemName) => {
    if (selectedTable !== null) {
      dispatch(removeItemFromReceipt({ table: selectedTable, itemName }));
    }
  };

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

  const { counts, total } = calculateTotalAndCounts();

  return (
    <div className="flex">
      <div className="menu">
        <h2>Menu Testing</h2>
        {menuItems.map((item) => (
          <div key={item.name} className="menu-item">
            <span>{item.name}</span>
            <button onClick={() => handleMenuSelect(item)}>+</button>
          </div>
        ))}
      </div>
      <div className="tables">
        {tables.map((table) => (
          <button key={table} onClick={() => handleTableSelect(table)}>
            Table {table}
          </button>
        ))}
      </div>
      <div className="receipt">
        <h2>Receipt</h2>
        {Object.keys(counts).map((itemName) => (
          <div key={itemName}>
            {itemName} - {counts[itemName]} pcs -{" "}
            {counts[itemName] *
              menuItems.find((item) => item.name === itemName).price}{" "}
            MMK
            <button onClick={() => handleRemoveItem(itemName)}>-</button>
          </div>
        ))}
        <div>Total: {total} MMK</div>
      </div>
    </div>
  );
};

export default TestingPage;
