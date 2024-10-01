import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eyeImg from "../../images/eye.svg";
import HomeDescription from "./HomeDescription";
import AddWishlistButton from "../wishlist/AddWishlistButton";

const HomeContainer = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [items, setItems] = useState([]);
  const [discountItems, setDiscountItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchShops = () => {
    fetch("http://localhost:3000/home/all-owners", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setShops(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching shops", error);
        toast.error("Failed to fetch shops");
      });
  };

  const fetchItems = async () => {
    try {
      const [itemsResponse, discountsResponse] = await Promise.all([
        fetch("http://localhost:3000/home/all-items").then((res) => {
          if (!res.ok) throw new Error("Failed to fetch items");
          return res.json();
        }),
        fetch("http://localhost:3000/api/discount-items/all-discounts").then(
          (res) => {
            if (!res.ok) throw new Error("Failed to fetch discounts");
            return res.json();
          }
        ),
      ]);

      const validItems = Array.isArray(itemsResponse) ? itemsResponse : [];
      const validDiscounts = Array.isArray(discountsResponse)
        ? discountsResponse
        : [];

      const itemsWithDiscounts = validItems
        .map((item) => {
          const discount = validDiscounts.find(
            (discount) =>
              discount.itemId === item._id &&
              discount.discountAvailable === true
          );

          if (discount) {
            return {
              ...item,
              discountAmount: item.price - discount.discountedPrice,
              discountPercentage: discount.discountPercentage,
            };
          }
          return item;
        })
        .filter((item) => item.discountAmount);

      setItems(validItems);
      setDiscountItems(itemsWithDiscounts);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching items or discounts", error);
      toast.error("Failed to fetch items or discounts");
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    fetchShops();
    fetchItems();
  }, []);

  const handleCardClick = (shopId) => {
    navigate(`/client/dashboard/view-items/${shopId}`);
  };

  const handleViewShops = () => {
    navigate(`/client/dashboard/shops`);
  };

  const handleHomeCardClick = (itemId, item) => {
    navigate(`/client/dashboard/view-item/${itemId}`,{state:item});
    
  };

  return (
    <div className="mb-12">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          {/* Custom spinner */}
          <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Trending shops */}
          <div className="flex justify-between mt-10 mb-10 ml-20 mr-20">
            <p className="text-2xl font-bold ">Trending Shops</p>
            <button onClick={() => handleViewShops()} className="pl-2 pr-2 font-bold text-white bg-blue-600 text-md rounded-xl hover:bg-blue-800">
              View more
            </button>
          </div>
          <div className="ml-8 mr-8">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="w-full h-96 mySwiper"
            >
              {shops.map((shop) => (
                <SwiperSlide
                  className="mb-4 border-2 border-gray-200 shadow-xl rounded-xl"
                  key={shop._id}
                >
                  <div
                    className="flex flex-col justify-between h-full m-2"
                    onClick={() => handleCardClick(shop._id)}
                  >
                    <div>
                      <img
                        className="w-64 h-16 mx-auto"
                        src={shop.shopLogo}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center m-4 text-justify">
                      <p>{shop.shopDescription}</p>
                    </div>
                    <div className="flex justify-center mt-auto mb-8">
                      <button
                        onClick={() => handleCardClick(shop._id)}
                        className="px-8 font-bold text-white bg-blue-500 text-md rounded-xl hover:bg-blue-700"
                      >
                        Visit Store
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-16 mb-8">
            <HomeDescription />
          </div>

          {/* Discount items */}
          <div>
            <div className="flex justify-between mt-20 mb-16 ml-20 mr-20">
              <p className="text-2xl font-bold ">Discount items</p>
              <button className="pl-2 pr-2 font-bold text-white bg-blue-600 text-md rounded-xl">
                View more
              </button>
            </div>

            <div className="ml-8 mr-8 ">
              <Swiper
                slidesPerView={5}
                spaceBetween={10}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination]}
                className="w-full h-full mySwiper"
              >
                {discountItems.map((item) => (
                  <SwiperSlide
                    className="mx-8 mb-8 shadow-xl rounded-xl"
                    key={item._id}
                  >
                    <div className="card min-w-[300px]">
                      <img
                        className="object-contain w-full h-40"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="flex flex-col gap-3 p-5">
                        <div className="flex items-center gap-2">
                          <span className="badge">{item.category}</span>
                        </div>

                        <h2 className="product-title" title={item.name}>
                          {item.name}
                        </h2>

                        <div>
                          <span className="text-xl font-bold">
                            Rs. {item.discountAmount}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm line-through opacity-50">
                              Rs. {item.price}
                            </span>
                            <span className="discount-percent">
                              Save {item.discountPercentage}%
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-8 mt-5">
                          <AddWishlistButton itemId={item._id} />

                          <button
                            className="button-icon"
                            onClick={() => handleHomeCardClick(item._id, item)}
                          >
                            <img
                              className="opacity-50"
                              src={eyeImg}
                              alt="View"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeContainer;
