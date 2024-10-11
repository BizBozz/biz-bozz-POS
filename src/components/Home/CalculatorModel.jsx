import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeTable } from "./../../redux/receiptSlice";
import { toast } from "sonner";

const CalculatorModal = ({ totalPrice, table, onClose }) => {
  const dispatch = useDispatch();
  const [paidPrice, setPaidPrice] = useState(totalPrice);
  const [extraChange, setExtraChange] = useState(0);

  const removeSelectedTable = (table) => {
    dispatch(removeTable(table));
  };

  const handleCalculate = () => {
    const change = parseFloat(paidPrice) - totalPrice;
    setExtraChange(change >= 0 ? change : 0);
  };

  useEffect(() => {
    handleCalculate();
  }, [paidPrice]);

  const confirmPayment = () => {
    if (parseFloat(paidPrice) >= totalPrice) {
      removeSelectedTable(table);
      onClose();
      toast.success("Payment Successful");
    } else {
      toast.error("Pleae Checkout Again");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end items-start bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] mt-10 me-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Calculator</h2>
          <button className="text-gray-500" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-2 px-4">
            <label className="font-medium">Total Price</label>
            <span>{totalPrice.toLocaleString()} MMK</span>
          </div>
          <div className="flex justify-between items-center mb-2 border border-black rounded-md px-4 py-2">
            <label className="font-medium">Paid Price</label>
            <div>
              <input
                type="number"
                value={paidPrice}
                onChange={(e) => setPaidPrice(e.target.value)}
                placeholder="Enter paid price"
                className="py-1 text-right"
              />
              <span> MMK</span>
            </div>
          </div>
          <div className="flex justify-between mb-2 px-4">
            <label className="font-medium">Extra Change</label>
            <span>{extraChange.toLocaleString()} MMK</span>
          </div>
        </div>
        <div className="flex justify-between gap-5 mt-10">
          <button
            className="border text-xl font-bold border-black w-full text-gray-700 rounded py-2 px-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-black text-xl font-bold w-full text-white rounded py-2 px-4"
            onClick={confirmPayment}
          >
            ConFirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorModal;
