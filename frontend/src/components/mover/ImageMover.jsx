import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageMover = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/promotion/promotion-list/all-promotions"
        );
        console.log("API Response:", response); // Log the whole response

        if (Array.isArray(response.data)) {
          setPromotions(response.data);
        } else {
          throw new Error("Unexpected response format");
        }
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching promotions:",
          error.response ? error.response.data : error.message
        );
        setError("Error fetching promotions");
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[550px] bg-gray-100">
        {/* White spinner */}
        <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
        {/* Loading text */}
        <p className="mt-4 text-black">Loading Promotions...</p>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[450px] bg-black flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
      {/* Slider background pattern */}
      <div className="h-[700px] w-[400px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 z-[-9]"></div>
      {/* Slider section */}
      <div className="container relative z-10 sm:pb-0">
        <Slider {...settings}>
          {promotions.map((promotion) => (
            <div key={promotion._id}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Text content section */}
                <div className="relative z-10 flex flex-col justify-center gap-4 pt-12 text-center sm:pt-0 sm:text-left sm:order-1">
                  <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-4xl">
                    {promotion.title}
                  </h1>
                  <p className="text-sm text-white">{promotion.description}</p>
                </div>

                {/* Image section with updated styles */}
                <div className="flex items-center justify-end order-1 sm:order-2">
                  <div className="relative z-10 w-full h-full">
                    <img
                      src={promotion.image}
                      alt={promotion.title}
                      className="object-cover w-full h-full" // Ensure image fills the right side
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageMover;
