import React, { useState } from "react";

const CategoryModal = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCreate = () => {
    // Handle the create action here
    console.log("Category Created:", categoryName);
    onClose(); // Close the modal after creating
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Create Menu Category</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 flex-grow"
            placeholder="Western"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="border border-gray-300 rounded-md px-4 py-2 mr-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="bg-black text-white rounded-md px-4 py-2 hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
