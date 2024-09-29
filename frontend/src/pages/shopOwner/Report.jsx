import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/sale.png";

const Report = () => {
  const { user } = useAuthContext();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Function to fetch discounted items
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

  const handleView = (itemId) => {
    navigate(`/shopOwner/dashboard/view-item/${itemId}`);
  };

  const handleEditClick = (itemId) => {
    navigate(`/shopOwner/dashboard/update-item/${itemId}`);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/inventory/delete-item/${itemId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete item");
        }

        fetchItems();
        toast.success("Item deleted successfully");
      } catch (error) {
        console.error("Error deleting item", error);
        toast.error("Failed to delete item");
      }
    }
  };

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
      doc.text("Inventory Item Report", 10, 55); // Title for the report
      doc.setFont(undefined, "normal"); // Reset font to normal

      // Prepare table headers and data
      const headers = [
        [
          {
            content: "Item Name",
            styles: { halign: "center", fontStyle: "bold" },
          },
          {
            content: "Item Quantity",
            styles: { halign: "center", fontStyle: "bold" },
          },
          {
            content: "Item Price",
            styles: { halign: "center", fontStyle: "bold" },
          },
          {
            content: "Category Type",
            styles: { halign: "center", fontStyle: "bold" },
          }
        ],
      ];

      const data = items.map((item) => [
        item.name,
        item.quantity,
        item.price,
        item.category,
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
      doc.save("Inventory_Items_Report.pdf");
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
        <button onClick={generatePDFReport} className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg">
          Generate PDF Report
        </button>
      </div>
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{ fontSize: "2rem", marginTop: "30px", marginLeft: "20px" }}
      >
        All Inventory Items <br />
      </h1>
      <div className="mx-4 mt-8 overflow-hidden rounded-lg shadow-lg md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Item Name
              </th>
              <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Item Quantity
              </th>
              <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Item Price
              </th>
              <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Category Type
              </th>
              <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-center text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2 text-sm border-b border-gray-200">
                  {item.name}
                </td>
                <td className="px-4 py-2 text-sm border-b border-gray-200">
                  {item.quantity}
                </td>
                <td className="px-4 py-2 text-sm border-b border-gray-200">
                  {item.price}
                </td>
                <td className="px-4 py-2 text-sm border-b border-gray-200">
                  {item.category}
                </td>
                
                <td className="px-4 py-2 border-b border-gray-200">
                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(item._id);
                    }}
                    className="px-4 py-1 mx-2 text-sm font-medium text-white bg-green-500 rounded-lg"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(item._id);
                    }}
                    className="px-4 py-1 mx-2 text-sm font-medium text-white bg-blue-500 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
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
      </div>
    </div>
  );
};

export default Report;
