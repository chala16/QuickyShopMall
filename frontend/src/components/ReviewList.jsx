import { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/product/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleHelpful = async (reviewId, helpful) => {
    try {
      await axios.post(`/api/reviews/helpful/${reviewId}`, { helpful });
      // update the review list after marking helpful/not helpful
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
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
      ))}
    </div>
  );
};

export default ReviewList;
