import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";

const ReviewForm = ({ shopId, productId, onReviewSubmitted}) => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");
  const {user} = useAuthContext();   // Retrieve user context

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You need to log in to submit a review.");
      return;
    }


    if (!rating || rating <= 0) {
      toast.error("Please provide a rating.");
      return;
    }

    if (!text || text.trim() === "") {
      toast.error("Please fill in the review text.");
      return;
    }

    console.log( "user email:",user.email , "Product ID:", productId, "rating:", rating, "text:", text); 
    try {
      await axios.post("http://localhost:3000/api/reviews/submit", {
        shopId: shopId,  // Ensure shopId is passed
        productId,
        email:user.email,
        rating,
        text,
      });

      // Show success message
      toast.success("Review added successfully!", {
        position: "top-right",
        autoClose: 5000, // Duration for the toast to be visible
      });

      // Clear the form fields
      setRating(1);
      setText("");
      
      if (onReviewSubmitted) {
        onReviewSubmitted(); // Notify parent component to refresh reviews
      }
      
    } catch (error) {
      // Show error message
      toast.error("Error submitting review. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
      });
      console.error("Error details:", error.response || error.message || error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded">
      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Rating
        </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          min="1"
          max="5"
        />
      </div>
      <div>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700"
        >
          Review
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
