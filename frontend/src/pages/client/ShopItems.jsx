import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../components/home/Navbar/Navbar";

const ShopItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { id } = useParams();

  const fetchItems = () => {
    fetch(`http://localhost:3000/home/owner-items/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

  const handleCardClick = (itemId) => {
    navigate(`/client/dashboard/view-item/${itemId}`);
  };

  useEffect(() => {
    fetchItems();
  }, []);
  
  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Items</h1>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="relative overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
                onClick={() => handleCardClick(item._id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
                  <p className="mb-2 font-bold text-red-500">
                    Rs. {item.price}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">{item.category}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
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

export default ShopItems;
