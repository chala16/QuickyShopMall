import React from "react";
import { toast } from "react-toastify";

const AddWishlistButton = ({ itemId }) => {

  const handleAddToWishlist = async () => {

    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!user) {
      toast.error("Please log in to add items to your wishlist");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        toast.success("Item added to wishlist!", {
            position: "bottom-right"
        });
      } else {
        console.log("There something wrong while adding item!");
        toast.error("Failed to add item to wishlist");
      }
    } catch (error) {
      console.error("Error adding item to wishlist", error);
      toast.error("An error occurred");
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      className="px-6 py-2 mt-6 text-black font-bold bg-yellow-200 rounded-lg hover:bg-yellow-300 md:px-8 md:py-3"
    >
      Add to Wishlist
    </button>
  );
};

export default AddWishlistButton;
