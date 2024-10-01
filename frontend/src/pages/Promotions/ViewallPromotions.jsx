import React from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ViewallPromotions = () => {
  const [promotionItems, setpromotionItems] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    if (user && user.token) {
      axios
        .get(`http://localhost:3000/api/promotions/${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.length === 0) {
            setpromotionItems([]); // Set items to empty if no discounts are found
          } else {
            setpromotionItems(res.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching items", error);
          if (error.response && error.response.status === 404) {
            // Handle 404 error
            setLoading(false);
          } else {
            // Handle other errors
            toast.error("Failed to fetch items");
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleUpdate = (id) => {
    console.log("Update discount item with id:", id);
    navigate(`/shopOwner/promotion/update-promotion/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:3000/api/promotions/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setpromotionItems(promotionItems.filter((item) => item._id !== id));
          toast.success("Item deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting item", error);
          toast.error("Failed to delete item");
        });
    }
  };

  return (
    <div>
      <Navbar />
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{ fontSize: "2rem", marginTop: "40px", marginBottom: "40px", marginLeft: "20px" }}
      >
        Manage &amp; Promotions.
      </h1>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
      {promotionItems.length === 0 ? (
          <p className="py-4 text-center">No items available.</p> // Message when no items are available
        ) : (
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Title
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Description
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Image
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {promotionItems.map((promo) => (
              <tr key={promo._id}>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                  {promo.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                  {promo.description}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                <img
                    src={promo.image}
                    alt={promo.title}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(promo._id);
                    }}
                    className="py-1 px-4 rounded-lg text-xs font-medium bg-blue-500 mx-2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(promo._id);
                    }}
                    className="py-1 px-4 rounded-lg text-xs font-medium bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
};

export default ViewallPromotions;
