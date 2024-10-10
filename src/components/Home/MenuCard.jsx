import { useDispatch, useSelector } from "react-redux";
import { addItemToReceipt } from "./../../redux/receiptSlice";
import { toast } from "sonner";

const MenuCard = ({ menu }) => {
  const dispatch = useDispatch();
  const selectedTable = useSelector((state) => state.receipts.selectedTable);
  const handleMenuSelect = (item) => {
    if (selectedTable !== null) {
      dispatch(addItemToReceipt({ table: selectedTable, item }));
    } else {
      toast.warning("Please Select Table");
    }
  };
  return (
    <div className="max-w-sm bg-white border border-black rounded-lg shadow-lg overflow-hidden">
      <div className="p-1 rounded-t-lg">
        <div className="">
          <img
            className="w-48 h-32 object-cover"
            src="https://via.placeholder.com/150"
            alt="Food"
          />
        </div>
      </div>
      <div className="p-1 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{menu.name} </h2>
      </div>
      <div className="border-t border-gray-300">
        <button
          className="w-full text-indigo-700 font-semibold py-2"
          onClick={() => handleMenuSelect(menu)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
