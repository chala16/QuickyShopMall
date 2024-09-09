import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/home/Navbar/Navbar";
import AddWishlistButton from "../../components/wishlist/AddWishlistButton";
import ReviewForm from "../../components/review/ReviewForm";
import ReviewList from "../../components/review/ReviewList";
import { useAuthContext } from "../../hooks/useAuthContext"; // Import your auth context hook
import { useLocation } from 'react-router-dom';

const ViewItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { user } = useAuthContext(); // Get user info from context
  const [reviewsUpdated, setReviewsUpdated] = useState(false); // State to trigger review list refresh
  const location = useLocation();
  const { discountPrice } = location.state || {};
  
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/home/get-item/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setItem(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching item", error);
          toast.error("Failed to fetch item details");
        });
    }
  }, [id]);

  useEffect(() => {
    // Fetch reviews whenever reviewsUpdated state changes
    if (reviewsUpdated) {
      setReviewsUpdated(false); // Reset reviewsUpdated state
    }
  }, [reviewsUpdated]);

  const handleReviewSubmitted = () => {
    setReviewsUpdated(true); // Trigger review list refresh
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="mb-6 ml-20 text-2xl font-bold">{item.name}</h1>
        <div className="flex flex-col md:flex-row">
          <img
            src={item.image}
            alt={item.name}
            className="object-contain mb-4 h-96 w-full max-w-[200px] md:max-w-[35%]"
          />



          
          <div className="flex-1 md:ml-8">
            <p className="mb-2 font-bold text-red-500">Price: Rs. {discountPrice}</p>
            <p className="mb-2 text-sm text-gray-600">Category: {item.category}</p>
            <p className="text-sm text-gray-500">Description: {item.description}</p>

            <AddWishlistButton itemId={id}/>

           <div>
            <h1 className="text-s font-bold mb-4 mt-10">We'd Love Your Feedback – Share with Your Fellow Customers</h1>
            <ReviewForm productId={id} onReviewSubmitted={handleReviewSubmitted}/>{" "}
           </div>
            
          </div>
        </div>
        
            

            <h1 className="text-s font-bold mb-4 mt-10">Voices of Our Shoppers</h1>
            <ReviewList productId={id} reviewsUpdated={reviewsUpdated}/>
      </div>
    </div>
  );
};

export default ViewItemDetails;
