import { useState, useEffect } from "react";
import axios from "axios";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/product/${productId}`);
        const data = response.data;

        // Ensure the response data is an array
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("API response is not an array:", data);
          setReviews([]); // Default to an empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]); // Default to an empty array in case of error
      }
    };

    fetchReviews();
  }, [productId]);

  const handleHelpful = async (reviewId, helpful) => {
    try {
      await axios.post(`/api/reviews/helpful/${reviewId}`, { helpful });
      // Optional: re-fetch reviews or update state to reflect changes
    } catch (error) {
      console.error("Error marking review as helpful/not helpful:", error);
    }
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <p className="text-gray-500, mt-5">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="p-4 bg-white rounded shadow">
            <p className="text-gray-800">{review.text}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-yellow-500">{`Rating: ${review.rating}`}</span>
              <div>
                <button
                  onClick={() => handleHelpful(review._id, true)}
                  className="text-green-500 hover:text-green-600"
                >
                  Helpful ({review.helpfulCount})
                </button>
                <button
                  onClick={() => handleHelpful(review._id, false)}
                  className="text-red-500 hover:text-red-600 ml-4"
                >
                  Not Helpful ({review.notHelpfulCount})
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
