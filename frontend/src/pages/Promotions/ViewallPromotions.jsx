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
          setpromotionItems(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching items", error);
          toast.error("Failed to fetch items");
        });
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

  return (
    <div>
      <Navbar />
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{ fontSize: "3rem", marginTop: "80px", marginBottom: "40px", marginLeft: "20px" }}
      >
        Manage &amp; Promotions.
      </h1>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Title
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Description
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Image
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {promotionItems.map((promo) => (
              <tr key={promo._id}>
                <td className="py-4 px-6 border-b border-gray-200">
                  {promo.title}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {promo.description}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {promo.image}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(promo._id);
                    }}
                    className="py-2.5 px-6 rounded-lg text-sm font-medium bg-blue-500 mx-2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(promo._id);
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

export default ViewallPromotions;
