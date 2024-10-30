import PropTypes from "prop-types";

const MenuCard = ({ menu, sentItem }) => {
  const handleMenuSelect = (item) => {
    const receiptItem = {
      dishName: item.dishName,
      price: item.price,
      quantity: 1,
    };
    sentItem(receiptItem);
  };
  return (
    <div className="max-w-sm bg-white border border-black rounded-lg shadow-lg overflow-hidden">
      <div className="p-1 rounded-t-lg">
        <div className="">
          <img
            className="w-48 h-32 object-cover"
            src={menu.dishImage}
            alt="Food"
          />
        </div>
      </div>
      <div className="p-1 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {menu.dishName}{" "}
        </h2>
      </div>
      <div className="border-t border-gray-300">
        <button
          className="w-full text-indigo-700 font-semibold py-2 hover:bg-black hover:text-white focus:scale-105 transition duration-200"
          onClick={() => handleMenuSelect(menu)}
        >
          +
        </button>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    dishImage: PropTypes.string.isRequired,
    dishName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuCard;
