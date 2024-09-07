import { useState, useEffect } from "react";
import axios from "axios";
import RatingStars from 'react-rating-stars-component';


const ReviewList = ({ productId, reviewsUpdated }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/reviews/product/${productId}`);
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
  }, [productId, reviewsUpdated]); // Add reviewsUpdated to dependency array

  const handleHelpful = async (reviewId, helpful) => {
    try {
      await axios.post(`http://localhost:3000/api/reviews/helpful/${reviewId}`, { helpful });
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
            <p className="text-gray-500 text-sm">{review.email}</p> {/* Display email */}
            {/* Display the formatted review date */}
            <p className="text-gray-400 text-xs mt-0">
            {new Date(review.date).toLocaleDateString("en-CA")}
            </p>
            <p className="text-gray-800 mt-4">{review.text}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="flex items-center">
                {/* Show the star rating inside span */}
                <RatingStars
                  value={review.rating}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  edit={false} // Make it read-only
                />
              </span>  
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
