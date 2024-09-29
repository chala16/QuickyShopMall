import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/home/Navbar/Navbar";
import AddWishlistButton from "../../components/wishlist/AddWishlistButton";
import ReviewForm from "../../components/review/ReviewForm";
import ReviewList from "../../components/review/ReviewList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocation } from "react-router-dom";

const ViewItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { user } = useAuthContext();
  const [reviewsUpdated, setReviewsUpdated] = useState(false);
  const location = useLocation();


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
    if (reviewsUpdated) {
      setReviewsUpdated(false);
    }
  }, [reviewsUpdated]);



  const handleReviewSubmitted = () => {
    setReviewsUpdated(true);
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  // Check if discount information is passed via location state
  const discountAvailable = location.state?.discountPercentage > 0;
  const discountedPrice = location.state?.discountAmount || item.price;
  const discountPercentage = location.state?.discountPercentage || 0;

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
            <div className="w-48 bg-green-600 rounded-xl">
              <p className="mb-2 font-bold text-center text-white">
                Price: Rs. {discountAvailable ? discountedPrice : item.price}
              </p>
            </div>
            {discountAvailable && (
              <p className="font-bold text-green-600 text-md">
                Discount: {discountPercentage}% off (
                <span className="text-red-500">
                  <del>Original Price: Rs. {item.price}</del>
                </span>
                )
              </p>
            )}
            <p className="mb-2 text-sm text-gray-600">
              Category: {item.category}
            </p>
            <p className="mb-6 text-sm text-gray-500">
              Description: {item.description}
            </p>

            <AddWishlistButton itemId={id} />

            <h1 className="mt-10 mb-4 font-bold text-s">
              We'd Love Your Feedback – Share with Your Fellow Customers!
            </h1>
            <ReviewForm
              productId={id}
              shopId={item.user_id}
              onReviewSubmitted={handleReviewSubmitted}
            />
          </div>
        </div>
        <h1 className="mt-10 mb-4 font-bold text-s">Voices of Our Shoppers</h1>
        <ReviewList productId={id} shopId={item.user_id}reviewsUpdated={reviewsUpdated} />
      </div>
    </div>
  );
};

export default ViewItemDetails;
