import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import DiscountImageCard from "../../components/discount/DiscountImageCard";
import Navbar from "../../components/home/Navbar/Navbar";
import axios from "axios";

const AddDiscount = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [startDate] = useState(new Date().toISOString().split("T")[0]); // Automatically set to current date
  const [endDate, setEndDate] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0); // Initialize as 0
  const [discountedPrice, setDiscountedPrice] = useState(0); // Initialize as 0
  const [discountAvailable, setDiscountAvailable] = useState(true);
  const { user } = useAuthContext();

  // Fetch item details
  useEffect(() => {
    if (user && id) {
      fetch(`http://localhost:3000/inventory/get-item/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch item details");
        });
    }
  }, [id, user]);

  // Calculate discounted price when discountPercentage or data.price changes
  useEffect(() => {
    if (data && data.price && discountPercentage >= 0) {
      const calculatedDiscountedPrice = (
        (data.price * discountPercentage) / 100
      ).toFixed(2); // Keeping two decimal places
      setDiscountedPrice(calculatedDiscountedPrice);
    }
  }, [discountPercentage, data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!endDate || new Date(endDate) <= new Date(startDate)) {
      toast.error("End date must be after the start date");
      return;
    }
  
    if (discountPercentage <= 0 || discountPercentage > 100) {
      toast.error("Discount percentage must be between 1 and 100");
      return;
    }
  
    if (!discountedPrice || discountedPrice <= 0) {
      toast.error("Discounted price must be greater than 0");
      return;
    }
    
    const discountDetails = {
      email: user.email,
      itemId: id,
      itemName: data.name,
      startDate,
      endDate,
      discountPercentage,
      discountedPrice,
      discountAvailable,
    };
    console.log(discountDetails);
    axios
      .post("http://localhost:3000/api/discounts", discountDetails, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Discount added successfully", response);
        toast.success("Discount added successfully");
      })
      .catch((error) => {
        console.error("Error adding discount", error);
        toast.error("Failed to add discount");
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-start justify-between px-28">
        {/* Form Container */}


        <div className="w-full max-w-md mt-12 ml-4">
        <h1 className="text-3xl font-bold font-[poppins] text-center text-black sm:text-3xl">
            Add Discount
          </h1>
          <form className="p-4 mb-0 space-y-4 rounded-lg shadow-lg signUp sm:p-6 lg:p-8" onSubmit={handleSubmit} noValidate>

            {/* Form fields */}
            <div className="mb-5">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Date
              </label>
              <input
                type="date"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={startDate}
                readOnly
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <input
                type="date"
                id="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split("T")[0]} // Prevent past dates
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="discount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Discount Percentage
              </label>
              <input
                type="number"
                id="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                min="0" // Minimum 0%
                max="100" // Maximum 100%
                placeholder="Discount percentage"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Discounted Price
              </label>
              <input
                type="number"
                id="discountedPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={discountedPrice}
                readOnly // Make the field read-only
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="discount-available"
                className="flex items-center text-sm font-medium text-gray-900 dark:text-white"
              >
                <input
                  type="checkbox"
                  id="discount-available"
                  checked={discountAvailable}
                  onChange={(e) => setDiscountAvailable(e.target.checked)}
                  className="mr-2"
                />
                Available
              </label>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Image Card Container */}
        <div className="w-full max-w-xs mt-16 mr-20 shadow-xl">
          <DiscountImageCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default AddDiscount;
