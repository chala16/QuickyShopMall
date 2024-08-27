import { useState } from "react";
import axios from "axios";

const ReviewForm = ({ productId, userId }) => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/reviews/submit", {
        productId,
        userId,
        rating,
        text,
      });
      // handle success, e.g., show a message or update the review list
    } catch (error) {
      console.error(error);
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
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
