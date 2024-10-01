import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import DiscountImageCard from "../../components/discount/DiscountImageCard";
import Navbar from "../../components/home/Navbar/Navbar";
import axios from "axios";

const UpdateDiscount = () => {
  const { id, itemId } = useParams();
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [discountAvailable, setDiscountAvailable] = useState(true);
  const { user } = useAuthContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (user && id) {
      fetch(`http://localhost:3000/api/discounts/get-discount/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setStartDate(formatDate(data.startDate) || "");
          setEndDate(formatDate(data.endDate) || "");
          setDiscountPercentage(data.discountPercentage || "");
          setDiscountedPrice(data.discountedPrice || "");
          setDiscountAvailable(data.discountAvailable || true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch item details");
        });
    }
  }, [id, user]);

  useEffect(() => {
    if (data && data.discountedPrice && discountPercentage >= 0) {
      // Step 1: Calculate the original price using the old discount percentage and old discounted price
      const originalPrice = (data.discountedPrice / (data.discountPercentage / 100)).toFixed(2);
  
      // Step 2: Calculate the new discounted price using the new discount percentage
      const calculatedDiscountedPrice = (originalPrice * (discountPercentage / 100)).toFixed(2);
  
      setDiscountedPrice(calculatedDiscountedPrice);
    }
  }, [discountPercentage, data]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

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
      itemId: itemId,
      itemName: data.name,
      startDate,
      endDate,
      discountPercentage,
      discountedPrice,
      discountAvailable,
    };

    axios
      .patch(`http://localhost:3000/api/discounts/${id}`, discountDetails, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        toast.success("Discount updated successfully");
      })
      .catch((error) => {
        console.error("Error updating discount", error);
        toast.error("Failed to update discount");
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <section className="bg-white dark:bg-gray-900 mt-28">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1
              className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
              style={{ fontSize: "3rem" }}
            >
              <img
                src="https://www.pngall.com/wp-content/uploads/8/Campaign-PNG-Clipart.png"
                alt="hero"
                style={{
                  marginTop: "-100px",
                  marginLeft: "-75px",
                  width: "600px",
                  height: "400px",
                }}
              />{" "}
            </h1>
          </div>

          <div
            className="hidden lg:mt-0 lg:col-span-5 lg:flex"
            style={{
              marginTop: "-30px",
            }}
          >
            <form
              className="max-w-md mx-auto"
              style={{ width: "100%" }}
              onSubmit={handleSubmit}
              noValidate
            >
              <h1
                className="max-w-1xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
                style={{ fontSize: "2rem" }}
              >
                Update Discount
              </h1>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="start-date"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={startDate}
                  // onChange={(e) => setStartDate(e.target.value)}
                  // min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  readOnly
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="end-date"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} // End date should not be before the start date
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="discount-percentage"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Discount Percentage
                </label>
                <input
                  type="number"
                  id="discount-percentage"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  min="0" // Minimum 0%
                  max="100" // Maximum 100%
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="discounted-price"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Discounted Price
                </label>
                <input
                  type="number"
                  id="discounted-price"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={discountedPrice}
                  // onChange={(e) => setDiscountedPrice(e.target.value)}
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="w-full max-w-md mt-20 lg:mt-0 lg:col-span-7">
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateDiscount;
