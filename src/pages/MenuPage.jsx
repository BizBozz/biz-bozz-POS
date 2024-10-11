import { useEffect, useState } from "react";
import CategoryModal from "../components/Menu/CategoryModel";
import MenuList from "../components/Menu/MenuList";
import getMenu from "../api/Menu/getMenu";

export const categorys = [
  "Chinese",
  "Thai",
  "Myanmar",
  "Western",
  "Snack",
  "Drinks",
];

function MenuPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryss, setCategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [id, setId] = useState("");

  const getAllCategory = async () => {
    const res = await getMenu();
    // console.log(res.data.categories[0]._id);
    setCategorys(res.data.categories[0].categories);
    setId(res.data.categories[0]._id);
  };

  useEffect(() => {
    getAllCategory();
  }, [isModalOpen]);

  if (categoryss.length === 0) {
    return (
      <div className="flex w-full h-screen justify-center items-center overflow-y-auto">
        <div className="text-center">
          <p className="font-mediun text-3xl">No Menu at the Moment!</p>
          <p className="font-medium text-3xl">Set Up your Shop Menu</p>
          <button
            className=" mt-5 bg-primary text-xl text-black py-2 px-10 rounded-md
                     transition duration-200 hover:text-primary hover:bg-black hover:border hover:border-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create Menu Category
          </button>
        </div>
        <div className="">
          <CategoryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-5 relative">
        <div className="flex gap-5">
          <div className="flex flex-wrap gap-5 me-[200px]">
            {categoryss.map((category, index) => (
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
            <div className="flex items-center gap-2 cursor-pointer">
              <button
                className="bg-black text-white px-4 py-2 rounded-md transition duration-200 border border-black hover:bg-black hover:text-white focus:outline-none focus:scale-105"
                onClick={() => setIsModalOpen(true)}
              >
                <p className="font-bold">+</p>
              </button>
            </div>
          </div>
        </div>
        <MenuList category={selectedCategory} />
        <div className="absolute top-0 right-0 m-2">
          <button className="bg-black w-48 text-white px-4 py-2 rounded-md transition duration-200 border border-black hover:bg-black hover:text-white focus:outline-none focus:scale-105">
            <p className="font-bold">Add Menu</p>
          </button>
        </div>
        <CategoryModal
          isOpen={isModalOpen}
          id={id}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}

export default MenuPage;
