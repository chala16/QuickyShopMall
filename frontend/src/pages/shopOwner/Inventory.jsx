import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/home/Navbar/Navbar";

const DeleteItem = () => {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingImages, setLoadingImages] = useState({});
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const fetchItems = async () => {
    if (!user) return;
    
    setLoadingItems(true);
    try {
      const res = await fetch("http://localhost:3000/inventory/owner-items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch items");

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching items", error);
      toast.error("Failed to fetch items");
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/inventory/delete-item/${itemId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to delete item");

        fetchItems(); // Refresh the list after deletion
        toast.success("Item deleted successfully");
      } catch (error) {
        console.error("Error deleting item", error);
        toast.error("Failed to delete item");
      }
    }
  };

  const handleCardClick = (itemId) => {
    navigate(`/shopOwner/dashboard/view-item/${itemId}`);
  };

  const handleEditClick = (itemId) => {
    navigate(`/shopOwner/dashboard/update-item/${itemId}`);
  };

  const handleImageLoad = (itemId) => {
    setLoadingImages((prev) => ({ ...prev, [itemId]: false }));
  };

  const handleImageError = (itemId) => {
    setLoadingImages((prev) => ({ ...prev, [itemId]: false }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Manage Items</h1>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {loadingItems ? (
            <p className="text-center text-gray-500 col-span-full">
              Loading items...
            </p>
          ) : (
            items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item._id}
                  className="relative overflow-hidden bg-white shadow-md cursor-pointer rounded-2xl"
                  onClick={() => handleCardClick(item._id)}
                >
                  {/* Image container */}
                  <div className="relative h-52 w-80">
                    {loadingImages[item._id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Spinner */}
                        <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.name}
                      className="object-contain pt-8 m-4 h-52 w-80"
                      onLoad={() => handleImageLoad(item._id)}
                      onError={() => handleImageError(item._id)}
                      style={{
                        display: loadingImages[item._id] ? "none" : "block",
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
                    <p className="mb-2 font-bold text-red-500">
                      Rs. {item.price}
                    </p>
                    <p className="mb-2 text-sm text-gray-600">{item.category}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>

                  <div className="absolute flex space-x-2 top-4 right-4">
                    <button
                      className="px-2 py-1 text-sm text-white bg-red-500 rounded shadow-2xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="px-2 py-1 text-sm text-white bg-blue-600 rounded shadow-2xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item._id);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No items found.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
