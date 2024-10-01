import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/home/Navbar/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../images/logoquickyshop.png";

const ViewDiscountItems = () => {
  const [discountedItems, setDiscountedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { user } = useAuthContext();
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
          if (res.data.length === 0) {
            setDiscountedItems([]); // Set items to empty if no discounts are found
          } else {
            setDiscountedItems(res.data);
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
    } else {
      setLoading(false); // If no user is found, stop loading
    }
  }, [user]);

  // Filter the discounted items based on the search query (by item name or date)
  const filteredItems = discountedItems.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      item.itemName.toLowerCase().includes(lowerCaseQuery) ||
      new Date(item.startDate).toLocaleDateString().includes(lowerCaseQuery) ||
      new Date(item.endDate).toLocaleDateString().includes(lowerCaseQuery)
    );
  });

  // If loading is true, show a loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  const handleUpdate = (id, itemId) => {
    navigate(`/shopOwner/discounts/update-discount-item/${id}/${itemId}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:3000/api/discounts/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setDiscountedItems(discountedItems.filter((item) => item._id !== id));
          toast.success("Item deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting item", error);
          toast.error("Failed to delete item");
        });
    }
  };

  // Function to generate the report
  const generatePDFReport = () => {
    const doc = new jsPDF();
    const logoPath = logo;
    const shopName = "QuickyShop";

    const img = new Image();
    img.src = logoPath;

    img.onload = () => {
      doc.addImage(img, "PNG", 160, 4, 40, 30);
      doc.setFontSize(24);
      doc.setFont("times", "bold");
      doc.text(shopName, 10, 20);
      doc.setFont("times", "normal");

      const startY = 50;
      doc.setLineWidth(0.5);
      doc.line(10, startY - 5, 200, startY - 5);

      doc.setFontSize(18);
      doc.setFont(undefined, "bold");
      doc.text("Discount Report", 10, 55);
      doc.setFont(undefined, "normal");

      const headers = [
        [
          {
            content: "Item Name",
            styles: { halign: "center", fontStyle: "bold" },
          },
          {
            content: "Start Date",
            styles: { halign: "center", fontStyle: "bold" },
          },
          {
            content: "End Date",
            styles: { halign: "center", fontStyle: "bold" },
          },
          {
            content: "Discount Percentage (%)",
            styles: { halign: "center", fontStyle: "bold" },
          },
          {
            content: "Discount Price",
            styles: { halign: "center", fontStyle: "bold" },
          },
          {
            content: "Availability",
            styles: { halign: "center", fontStyle: "bold" },
          },
        ],
      ];

      const data = discountedItems.map((discount) => [
        discount.itemName,
        new Date(discount.startDate).toLocaleDateString(),
        new Date(discount.endDate).toLocaleDateString(),
        discount.discountPercentage,
        discount.discountedPrice,
        discount.discountAvailable ? "Active" : "Inactive",
      ]);

      doc.autoTable({
        head: headers,
        body: data,
        startY: startY + 10,
        styles: { cellPadding: 4, fontSize: 10 },
        headStyles: {
          fillColor: [22, 160, 133],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        theme: "grid",
      });

      doc.save("Discounted_Items_Report.pdf");
    };

    img.onerror = () => {
      toast.error("Failed to load logo for report.");
    };
  };

  return (
    <div>
      <Navbar />
      <div
        style={{ margin: "20px", display: "flex", justifyContent: "flex-end" }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by item name or date"
          className="px-4 py-2 border rounded-md"
          style={{ width: "20%", marginRight: "20px" }}
        />

        <button
          onClick={generatePDFReport}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg"
        >
          Generate PDF Report
        </button>
      </div>

      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{ fontSize: "2rem", marginTop: "30px", marginLeft: "20px" }}
      >
        Discounted Items
      </h1>
      <div className="mx-4 overflow-hidden rounded-lg shadow-lg md:mx-10">
        {filteredItems.length === 0 ? (
          <p className="py-4 text-center">No items available.</p>
        ) : (
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-200">
                {/* <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Email
                </th> */}
                <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Item Name
                </th>
                <th className="w-1/4 px-16 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Start Date
                </th>
                <th className="w-1/4 py-2 text-sm font-bold text-left text-gray-600 uppercase px-14">
                  End Date
                </th>
                <th className="w-1/4 px-1 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Discount Percentage
                </th>
                <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Discount Price
                </th>
                <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Availability
                </th>
                <th className="w-1/4 px-8 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredItems.map((discount) => (
                <tr key={discount._id}>
                  {/* <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {discount.email}
                  </td> */}
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {discount.itemName}
                  </td>
                  <td className="px-16 py-2 text-sm border-b border-gray-200">
                    {new Date(discount.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 text-sm border-b border-gray-200 px-14">
                    {new Date(discount.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-16 py-2 text-sm border-b border-gray-200">
                    {discount.discountPercentage}%
                  </td>
                  <td className="py-2 text-sm border-b border-gray-200 px-14">
                    {discount.discountedPrice}
                  </td>
                  <td className="px-8 py-2 text-sm border-b border-gray-200">
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
                  <td className="px-1 py-2 border-b border-gray-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate(discount._id, discount.itemId);
                      }}
                      className="px-4 py-1 mx-2 text-sm font-medium text-white bg-blue-500 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(discount._id);
                      }}
                      className="px-4 py-1 text-sm font-medium text-white bg-red-500 rounded-lg"
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

export default ViewDiscountItems;
