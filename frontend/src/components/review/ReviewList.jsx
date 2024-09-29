import { useState, useEffect } from "react";
import axios from "axios";
import RatingStars from "react-rating-stars-component";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";

const ReviewList = ({ productId, shopId, reviewsUpdated }) => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuthContext(); // Get user info from context
  const [editingReview, setEditingReview] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0); // Track updated rating

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reviews/shop/${shopId}/product/${productId}`
        );
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
  }, [shopId,productId, reviewsUpdated]); // Add reviewsUpdated to dependency array

  const handleHelpful = async (reviewId, helpful) => {
    try {
      await axios.post(
        `http://localhost:3000/api/reviews/helpful/${reviewId}`,
        { helpful }
      );
      // Optional: re-fetch reviews or update state to reflect changes
    } catch (error) {
      console.error("Error marking review as helpful/not helpful:", error);
    }
  };

  const handleUpdate = async (reviewId) => {
    if (!updatedText || updatedText.trim() === "") {
      toast.error("Please provide review text.");
      return;
    }

    try {
      const reviewToUpdate = reviews.find((review) => review._id === reviewId);

      if (reviewToUpdate) {
        await axios.put(
          `http://localhost:3000/api/reviews/update/${reviewId}`,
          {
            email: user?.email,
            text: updatedText,
            rating: updatedRating || reviewToUpdate.rating, // Update rating if modified
          }
        );

        setEditingReview(null);
        setUpdatedText("");
        setUpdatedRating(0);

        // Re-fetch or update reviews to reflect the change
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId
              ? {
                  ...review,
                  text: updatedText,
                  rating: updatedRating || review.rating,
                }
              : review
          )
        );

        toast.success("Review updated successfully!", {
          position: "top-right",
          autoClose: 5000, // Duration for the toast to be visible
        });
      } else {
        console.error("Review not found for update");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(
          `http://localhost:3000/api/reviews/delete/${reviewId}`,
          {
            data: { email: user?.email },
          }
        );
        setReviews(reviews.filter((review) => review._id !== reviewId)); // Remove review from UI

        toast.success("Review deleted successfully!", {
          position: "top-right",
          autoClose: 5000, // Duration for the toast to be visible
        });
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <p className="text-gray-500 mt-5">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="p-4 bg-white rounded shadow">
            <p className="text-gray-500 text-sm">{review.email}</p>
            <p className="text-gray-400 text-xs mt-0">
              {new Date(review.date).toLocaleDateString("en-CA")}
            </p>
            {editingReview === review._id ? (
              <>
                <textarea
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                  className="mt-2 p-2 border rounded w-full"
                  placeholder="Edit your review"
                />
                <RatingStars
                  value={updatedRating}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  onChange={(newRating) => setUpdatedRating(newRating)} // Allow rating update
                />
                <button
                  onClick={() => handleUpdate(review._id)}
                  className="text-blue-500 hover:text-blue-600 mt-2"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingReview(null)}
                  className="text-gray-500 hover:text-gray-600 mt-2 ml-4"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-800 mt-4">{review.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="flex items-center">
                    <RatingStars
                      value={review.rating}
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </span>
                  <div>
                    {review.email === user?.email && (
                      <>
                        <button
                          onClick={() => {
                            setEditingReview(review._id);
                            setUpdatedText(review.text);
                            setUpdatedRating(review.rating); // Pre-fill rating when editing
                          }}
                          className="bg-blue-500 text-white hover:bg-blue-600 ml-4 py-1 px-3 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="bg-red-500 text-white hover:bg-red-600 ml-4 py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
