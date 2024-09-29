import React, { useState } from "react";
import Modal from "react-modal";

const floorImages = {
  1: "https://firebasestorage.googleapis.com/v0/b/doc-app-c9683.appspot.com/o/QuickyShop%2FFloors%2Ffloor1-min.png?alt=media&token=e56c6a1e-e1df-4572-b45f-7b9aebe62641",
  2: "https://firebasestorage.googleapis.com/v0/b/doc-app-c9683.appspot.com/o/QuickyShop%2FFloors%2Ffloor2-min.png?alt=media&token=71f2b30a-0823-48fc-9255-1238f43aa5df",
  3: "https://firebasestorage.googleapis.com/v0/b/doc-app-c9683.appspot.com/o/QuickyShop%2FFloors%2Ffloor3-min.png?alt=media&token=4625b40a-9eca-499e-aa39-eb7b7075c945",
  4: "https://firebasestorage.googleapis.com/v0/b/doc-app-c9683.appspot.com/o/QuickyShop%2FFloors%2Ffloor4-min.png?alt=media&token=1ca05a6f-031f-4fb0-b9db-9e4b25d5b7c8",
  5: "https://firebasestorage.googleapis.com/v0/b/doc-app-c9683.appspot.com/o/QuickyShop%2FFloors%2Ffloor5-min.png?alt=media&token=e3281487-ec30-424c-b7eb-2900138aafa0"
};

const ItemBox = ({ item, handleDelete }) => {
  const isInStock = item.inStock > 0;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (floor) => {
    setCurrentImage(floorImages[floor]); // Set the image based on the floor number
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="bg-100 p-6 mb-3 w-full max-w-xl flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img src={item.image} alt="item-image" className="w-36 h-28 object-contain rounded" />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-gray-600"><b>Price:</b> Rs.{item.price.toFixed(2)}</p>
        <p className="text-gray-600">
          <b>Available: </b> 
          <span className={isInStock ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
            {isInStock ? "Yes" : "Out of Stock"}
          </span>
        </p>
        <p className="text-gray-600"><b>Shop:</b> {item.shopName}</p>
        <p className="text-gray-600"><b>Floor:</b> {item.shopFloorNo}</p>
        <button
          onClick={() => handleDelete(item.itemId)}
          className="py-1 px-2 bg-red-500 text-white hover:bg-red-700 rounded-md"
        >
          Remove
        </button>
        <button
          onClick={() => openModal(item.shopFloorNo)}
          className="ml-2 py-1 px-2 bg-blue-500 text-white hover:bg-blue-700 rounded-md"
        >
          Show Floor ➡️
        </button>
      </div>

      {/* Modal for showing the floor image */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false}>
        <div className="flex flex-col items-center">
          <img src={currentImage} alt="Floor" className="max-w-full h-auto" />
          <button onClick={closeModal} className="mt-4 bg-red-500 text-white rounded-md py-1 px-4">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ItemBox;