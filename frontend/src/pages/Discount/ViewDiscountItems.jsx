import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const ViewDiscountItems = () => {
  const [discountedItems, setDiscountedItems] = useState([]);
  const { user } = useAuthContext(); // Assuming this provides the user object with token
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Function to fetch discounted items
  const fetchItems = () => {
    if (user && user.token) {
      
      axios
        .get(`http://localhost:3000/api/discounts/${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })

        .then((res) => {
          setDiscountedItems(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching items", error);
          toast.error("Failed to fetch items");
        });
    }
  };

  // Trigger fetching of items when the user is available
  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  // If loading is true, show a loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  const handleUpdate = (id) => {
    navigate(`/shopOwner/discounts/update-discount-item/${id}`);
  };

  return (
    <div>
      <h1 className="mt-10">Discounted Items</h1>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Email
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                ItemId
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Start Date
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                End Date
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Discount Percentage
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Discount Price
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Availability
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {discountedItems.map((discount) => (
              <tr key={discount.id}>
                <td className="py-4 px-6 border-b border-gray-200">
                  {discount.email}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {discount.itemId}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {discount.startDate}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {discount.endDate}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {discount.discountPercentage}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {discount.discountedPrice}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <span
                    className={`py-1 px-2 rounded-full text-xs ${
                      discount.discountAvailable
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {discount.discountAvailable ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(discount.id);
                    }}
                    className="py-2.5 px-6 rounded-lg text-sm font-medium bg-blue-500 mx-2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(discount.id);
                    }}
                    className="py-2.5 px-6 rounded-lg text-sm font-medium bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDiscountItems;
