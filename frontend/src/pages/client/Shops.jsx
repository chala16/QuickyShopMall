import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router";

const Shops = () => {
  const navigate=useNavigate()
  const [shops, setShops] = useState([]);

  const fetchItems = () => {
      fetch("http://localhost:3000/home/all-owners", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setShops(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching items", error);
          toast.error("Failed to fetch items");
        });
  };

  const handleCardClick = (shopId) => {
    navigate(`/client/dashboard/view-items/${shopId}`);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="mt-6 ml-10 text-2xl font-bold">Shops</h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {shops.length > 0 ? (
          shops.map((shop) => (
            <div
              key={shop._id}
              className="relative overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
              onClick={() => handleCardClick(shop._id)}
            >
              <img
                src={shop.shopLogo}
                alt={shop.shopName}
                className="object-contain h-28"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold">{shop.shopName}</h3>
                <p className="px-4 mb-2 font-bold text-white bg-red-400 w-fit rounded-xl">Floor No : {shop.shopFloorNo}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No shops available
          </p>
        )}
      </div>
    </div>
  );
};

export default Shops;
