import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/home/Navbar/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/sale.png";
const ViewDiscountItems = () => {
  const [discountedItems, setDiscountedItems] = useState([]);
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
          setDiscountedItems(res.data);
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

  // If loading is true, show a loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  const handleUpdate = (id, itemId) => {
    console.log("Update discount item with id:", id);
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
  // Function to generate the report
  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Add header with logo and shop name
    const logoPath = logo; // Adjust based on where your logo is stored
    const shopName = "QuickyShop";

    const img = new Image();
    img.src = logoPath;

    img.onload = () => {
      doc.addImage(img, "PNG", 130, 4, 60, 40); // Logo on the right side
      doc.setFontSize(24); // Bigger font size for emphasis
        doc.setFont("times", "bold"); // Use a specific font, bold style
        doc.text(shopName, 10, 20); // Add the shop name
        doc.setFont("times", "normal"); // Reset to normal for other text

      const startY = 50; // Adjust this value to push the table further down

      // Add a line separator
      doc.setLineWidth(0.5);
      doc.line(10, startY - 5, 200, startY - 5); // Draws a line above the header

      // Add a section title for the report
      doc.setFontSize(18);
      doc.setFont(undefined, "bold"); // Set font to bold
      doc.text("Discount Report", 10, 55); // Title for the report
      doc.setFont(undefined, "normal"); // Reset font to normal

      // Prepare table headers and data
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

      // Add the table
      doc.autoTable({
        head: headers,
        body: data,
        startY: startY + 10, // Starts the table further down after the title
        styles: {
          cellPadding: 4,
          fontSize: 10,
        },
        headStyles: {
          fillColor: [22, 160, 133],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        theme: "grid", // Optional: you can choose the table theme
      });

      // Save the PDF
      doc.save("Discounted_Items_Report.pdf");
    };

    img.onerror = () => {
      console.error("Logo image not found or failed to load.");
      toast.error("Failed to load logo for report.");
    };
  };

  return (
    <div>
      <Navbar />
      <div
        style={{ margin: "20px", display: "flex", justifyContent: "flex-end" }}
      >
        <button
          onClick={generatePDFReport}
          className="py-2 px-4 rounded-lg text-sm font-medium bg-green-500 text-white"
        >
          Generate PDF Report
        </button>
      </div>
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{ fontSize: "2rem", marginTop: "30px", marginLeft: "20px" }}
      >
        Discounted Items <br />
      </h1>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Email
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Item Name
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Start Date
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                End Date
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Discount Percentage
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Discount Price
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Availability
              </th>
              <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {discountedItems.map((discount) => (
              <tr key={discount._id}>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                  {discount.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                  {discount.itemName}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                  {new Date(discount.startDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                  {new Date(discount.endDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                  {discount.discountPercentage}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                  {discount.discountedPrice}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">
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
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(discount._id, discount.itemId);
                    }}
                    className="py-1 px-4 rounded-lg text-sm font-medium bg-blue-500 mx-2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(discount._id);
                    }}
                    className="py-1 px-4 rounded-lg text-sm font-medium bg-red-500 text-white"
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
