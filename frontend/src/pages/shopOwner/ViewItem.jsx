import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/home/Navbar/Navbar";

const ViewItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && id) {
      fetch(`http://localhost:3000/inventory/get-item/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setItem(data);
        })
        .catch((error) => {
          console.error("Error fetching item", error);
          toast.error("Failed to fetch item details");
        });
    }
  }, [id, user]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold">{item.name}</h1>
        <div className="flex flex-col md:flex-row">
          <img
            src={item.image}
            alt={item.name}
            className="object-contain pt-8 m-4 h-80 w-96"
          />
          <div className="flex-1 md:ml-8">
            <p className="mb-2 text-2xl font-bold text-red-500">Price: Rs. {item.price}</p>
            <p className="mb-2 text-xl font-bold text-gray-600">Category: {item.category}</p>
            <p className="text-gray-500 text-md">Description: {item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
