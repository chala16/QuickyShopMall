import React, { useEffect, useState } from "react";
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
  
  useEffect(() => {
    fetchReviews();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
        All Reviews
      </h1>
      <div className="mx-4 mt-8 overflow-hidden rounded-lg shadow-lg md:mx-10">
        {itemReviews.map((itemReview) => (
          <div key={itemReview.item.id} className="mb-6 p-4 border rounded-lg bg-white shadow">
            <h2 className="text-xl font-bold">{itemReview.item.name}</h2>
            <p className="text-gray-600">Price: ${itemReview.item.price}</p>
            <h3 className="mt-4 text-lg font-semibold">Reviews:</h3>
            <ul className="list-disc pl-5">
              {itemReview.reviews.length > 0 ? (
                itemReview.reviews.map((review, index) => (
                  <li key={index} className="mt-2">
                    <p className="font-semibold">{review.email}</p>
                    <p>Rating: {review.rating}</p>
                    <p>{review.text}</p>
                    <p className="text-gray-500">{new Date(review.date).toLocaleDateString("en-CA")}</p>
                  </li>
                ))
              ) : (
                <li>No reviews available for this item.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
