import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/home/Navbar/Navbar";

const DiscountDashboard = () => {
  const [items, setItems] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const fetchItems = () => {
    user &&
      fetch("http://localhost:3000/inventory/owner-items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching items", error);
          toast.error("Failed to fetch items");
        });
  };

  useEffect(() => {
    fetchItems();
  }, [user]);


  const handleAddDiscount = (itemId) => {
    navigate(`/shopOwner/discounts/add-discount/${itemId}`);
  };

  const handleViewDiscount = () => {
    navigate(`/shopOwner/discounts/view-discount-items`);
  };


  return (
    <div>
      <Navbar />

      <div className="p-8">
      <h1
              className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
              style={{ fontSize: "2rem", marginTop: "20px"}}
            >
              Discount Manage
            </h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewDiscount();
          }}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View Discount Items
        </button>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="relative overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
                // onClick={() => handleCardClick(item._id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-contain pt-8 m-4 h-52 w-80"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
                  <p className="mb-2 font-bold text-red-500">
                    Rs. {item.price}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">{item.category}</p>
                  <p
                    className="overflow-hidden text-sm text-gray-500"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="absolute flex space-x-2 top-4 right-4">
                  <button
                    className="px-2 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddDiscount(item._id);
                    }}
                  >
                    Add Discount
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No items available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountDashboard;
