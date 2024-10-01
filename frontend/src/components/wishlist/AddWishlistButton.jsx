import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddWishlistButton = ({ itemId }) => {
  const [isInWishlist, setIsInWishlist] = useState(false) // State to track if item is in the wishlist
  
  const token = localStorage.getItem('token') // Get token from local storage

  useEffect(() => {
    const checkItemInWishlist = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/wishlist/read`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`, // Attach token for authentication
            'Content-Type': 'application/json'
          },
        })
        const data = await response.json()

        if (response.ok && data.items) {
          const itemExists = data.items.some((item) => item.itemId === itemId) // Check if item exists in the wishlist
          setIsInWishlist(itemExists) // Update state based on existence
        }
      } catch (error) {
        console.error("Error checking if item is in wishlist", error);
      }
    }
    checkItemInWishlist()
  }, [itemId, token]) // Dependency array to re-run effect when itemId or token changes

  const handleToggleWishlist = async () => {
    const user = localStorage.getItem('user') // Get user from local storage

    if (!user) {
      toast.error("Please log in to add items to your wishlist");
      return
    }

    try {
      const url = isInWishlist
       ? `http://localhost:3000/api/wishlist/delete-item/${itemId}`
       : `http://localhost:3000/api/wishlist/add`

       const method = isInWishlist ? "DELETE" : "POST"

       const response = await fetch(url, {
         method,
         headers: {
          authorization: `Bearer ${token}`, // Attach token for authentication
           "Content-Type": "application/json",
         },
         body: isInWishlist ? null : JSON.stringify({ itemId })
       })

       if (response.ok) {
        if (isInWishlist) {
          toast.success("Item removed from wishlist!", {
            position: "bottom-right"
          })
        } else {
          toast.success("Item added to wishlist!", {
            position: "bottom-right"
          })
        }
        setIsInWishlist(!isInWishlist)
       } else {
        toast.error("Failed to update wishlist!")
       }
    } catch (error) {
      console.error("Error toggling wishlist", error)
      toast.error("An error occurred")
    }
  }

  return (
    <button
      onClick={handleToggleWishlist}
      className={`px-6 py-2 text-black font-bold rounded-lg hover:bg-yellow-300 md:px-8 md:py-3 ${
        isInWishlist ? "bg-yellow-50" : "bg-yellow-200"
      }`}
    >
      {isInWishlist ? "Already Added" : "Add to Wishlist"}
    </button>
  );
};

export default AddWishlistButton;
