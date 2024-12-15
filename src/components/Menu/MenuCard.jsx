import PropTypes from "prop-types";
import EditMenuModel from "./EditMenuModel";
import { useEffect, useState } from "react";
import { Edit3Icon } from "lucide-react";
const MenuCard = ({ menu, refreshMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = () => {
    refreshMenu();
  };

  useEffect(() => {
    handleAction();
  }, [isModalOpen]);
  // console.log(menu);
  return (
    <div className="max-w-sm bg-white shadow-lg overflow-hidden">
      <div>
        <img
          className="w-full h-48 md:h-32 object-cover"
          src={menu.dishImage}
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
        <button
          className="bg-secondary text-primary px-2 py-3 active:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit3Icon size={17} />
        </button>
      </div>

      <EditMenuModel
        isOpen={isModalOpen}
        menu={menu}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    dishImage: PropTypes.string.isRequired,
    dishName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  refreshMenu: PropTypes.func.isRequired,
};

export default MenuCard;
