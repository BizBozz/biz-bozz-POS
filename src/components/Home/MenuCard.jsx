import { useDispatch, useSelector } from "react-redux";
import {
  addItemToReceipt,
  incrementQuantity,
  decrementQuantity,
} from "./../../redux/receiptSlice";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { CirclePlus, CircleMinus } from "lucide-react";
import defaultImage from "./../../assets/defaultMenu.jpg";

const MenuCard = ({ menu }) => {
  const dispatch = useDispatch();
  const selectedTable = useSelector((state) => state.receipts.selectedTable);
  const receipts = useSelector((state) => state.receipts.receipts);

  const currentItem =
    selectedTable &&
    receipts[selectedTable]?.items.find(
      (item) => item.dishName === menu.dishName
    );
  const quantity = currentItem?.quantity || 0;

  const handleIncrement = () => {
    if (selectedTable !== null) {
      if (quantity === 0) {
        dispatch(addItemToReceipt({ table: selectedTable, item: menu }));
      } else {
        dispatch(
          incrementQuantity({ table: selectedTable, itemName: menu.dishName })
        );
      }
    } else {
      toast.warning("Please Select Table");
    }
  };

  const handleDecrement = () => {
    if (selectedTable !== null) {
      dispatch(
        decrementQuantity({ table: selectedTable, itemName: menu.dishName })
      );
    }
  };

  return (
    <div className="sm:w-[200px] overflow-hidden border border-gray-200 rounded-lg shadow-md">
      <div className="hidden md:block">
        <img
          className="w-full h-48 sm:h-32 object-cover"
          src={menu.dishImage || defaultImage}
          alt="Food"
        />
      </div>

      <div className="flex h-[80px] gap-5 justify-between items-center mt-2 mx-2 ">
        <div className="font-raleway ">
          <h2 className="font-semibold text-gray-800 multi-line-truncate">
            {menu.dishName}{" "}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{menu.price} MMK</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="bg-secondary text-primary px-2 py-3 active:scale-105 active:bg-primary active:text-white rounded-lg"
            onClick={handleDecrement}
          >
            <CircleMinus size={17} />
          </button>
          <span className="font-semibold min-w-[20px] text-center">
            {quantity}
          </span>
          <button
            className="bg-secondary text-primary px-2 py-3 active:scale-105 active:bg-primary active:text-white rounded-lg"
            onClick={handleIncrement}
          >
            <CirclePlus size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    dishImage: PropTypes.string.isRequired,
    dishName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default MenuCard;
