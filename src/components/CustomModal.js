import React from "react";

const CustomModal = ({ isModalOpen, toggleModal, children }) => {
  return (
    <div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="bg-white rounded-lg shadow">
              <div className="px-3 flex justify-between items-center w-full">
                <h2 className="">
                  <span></span> Reasion
                </h2>
                {/* Close button */}
                <button
                  onClick={toggleModal}
                  type="button"
                  className="bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  X{/* <span className="sr-only">Close</span> */}
                </button>
              </div>
              {/* Modal content */}
              <div className="p-4 md:p-5">{children}</div>

              <div className="py-4 md:p-5 text-center">
                <button
                  onClick={toggleModal}
                  className="py-2 px-3 text-xs font-medium bg-blue-500 border-blue-500 rounded border text-white shadow"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomModal;
