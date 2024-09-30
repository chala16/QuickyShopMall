import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "../../components/home/Navbar/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";

const Reviews = () => {
  const { user } = useAuthContext();
  const [itemReviews, setItemReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch reviews
  const fetchReviews = () => {
    if (user) {
      fetch("http://localhost:3000/inventory/shop-reviews", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          console.log("Response status:", res.status); // Log response status
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          console.log("Fetched data:", data); // Log the fetched data
          setItemReviews(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching reviews", error);
          toast.error("Failed to fetch reviews");
          setLoading(false);
        });
    } else {
      setLoading(false); // Handle case where user is not authenticated
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const shopName = "QuickyShop";
  
    // Add header with shop name
    doc.setFontSize(24);
    doc.setFont("times", "bold");
    doc.text(shopName, 10, 20); // Add the shop name
    doc.setFont("times", "normal");
  
    const startY = 50;
  
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(10, startY - 5, 200, startY - 5);
  
    // Add a section title for the report
    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.text("Reviews Report", 10, 55);
    doc.setFont(undefined, "normal");
  
    // Prepare table headers and data
    const headers = [
      [
        {
          content: "Item Name",
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: "Category",
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: "Review Author",
          styles: { halign: "center", fontStyle: "bold" },
        },
        { content: "Rating", styles: { halign: "center", fontStyle: "bold" } },
        {
          content: "Review Text",
          styles: { halign: "center", fontStyle: "bold" },
        },
        { content: "Date", styles: { halign: "center", fontStyle: "bold" } },
      ],
    ];
  
    const data = [];
  
    itemReviews.forEach((itemReview) => {
      itemReview.reviews.forEach((review, index) => {
        data.push([
          index === 0 ? itemReview.item.name : "", // Show item name only once
          index === 0 ? itemReview.item.category : "", // Show category only once
          review.email,
          review.rating,
          review.text,
          new Date(review.date).toLocaleDateString("en-CA"),
        ]);
      });
    });
  
    // Add the table
    doc.autoTable({
      head: headers,
      body: data,
      startY: startY + 10,
      styles: {
        cellPadding: 4,
        fontSize: 10,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      theme: "grid",
    });
  
    // Save the PDF
    doc.save("Reviews_Report.pdf");
  };
  
  useEffect(() => {
    fetchReviews();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div
        style={{ margin: "20px", display: "flex", justifyContent: "flex-end" }}
      >
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
        All Reviews <br />
      </h1>
      <div className="mx-4 mt-8 overflow-hidden rounded-lg shadow-lg md:mx-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-large text-green-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-large text-green-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-large text-green-500 uppercase tracking-wider">
                Review Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-large text-green-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-large text-green-500 uppercase tracking-wider">
                Review Text
              </th>
              <th className="px-6 py-3 text-left text-xs font-large text-green-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {itemReviews.length > 0 ? (
              itemReviews.map((itemReview) => {
                const hasReviews = itemReview.reviews.length > 0;

                return (
                  <React.Fragment key={itemReview.item._id}>
                    <tr className="hover:bg-gray-100 transition duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {itemReview.item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {itemReview.item.category}
                      </td>

                      {hasReviews ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {itemReview.reviews[0].email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {itemReview.reviews[0].rating}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {itemReview.reviews[0].text}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(
                              itemReview.reviews[0].date
                            ).toLocaleDateString("en-CA")}
                          </td>
                        </>
                      ) : (
                        <td
                          colSpan={4}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                        >
                          No reviews available
                        </td>
                      )}
                    </tr>
                    {hasReviews &&
                      itemReview.reviews.slice(1).map((review) => (
                        <tr key={review._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {review.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {review.rating}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {review.text}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString("en-CA")}
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-sm text-gray-500 text-center"
                >
                  No reviews available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
