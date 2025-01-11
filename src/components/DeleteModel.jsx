const DeleteModel = ({ isOpen, onClose, submit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
      <div className="border border-gray-300 shadow-lg py-[40px] px-10 rounded-md bg-white h-full md:h-auto overflow-y-auto">
        <div className="">
          <h2 className="sub-header">Are You Sure Want to Delete</h2>
          <div className="hidden md:flex justify-center gap-5 mt-10">
            <button
              onClick={onClose}
              className="border border-primary w-32 rounded-md px-4 py-2 text-primary hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="border border-red-500 font-bold w-32 rounded-md px-4 py-2 text-white bg-red-500 hover:bg-primary hover:text-white active:scale-105"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
