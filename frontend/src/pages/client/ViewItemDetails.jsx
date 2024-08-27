import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/home/Navbar/Navbar";

const ViewItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/home/get-item/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="mb-6 ml-20 text-2xl font-bold">{item.name}</h1>
        <div className="flex flex-col md:flex-row">
          <img
            src={item.image}
            alt={item.name}
            className="object-contain mb-4 h-96 w-full max-w-[200px] md:max-w-[35%]"
          />
          <div className="flex-1 md:ml-8">
            <p className="mb-2 font-bold text-red-500">Price: Rs. {item.price}</p>
            <p className="mb-2 text-sm text-gray-600">Category: {item.category}</p>
            <p className="text-sm text-gray-500">Description: {item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItemDetails;
