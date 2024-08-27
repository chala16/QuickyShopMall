import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid,Pagination } from "swiper/modules";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeContainer = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [items,setItems]=useState([])

  const fetchShops = () => {
    fetch("http://localhost:3000/home/all-owners", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setShops(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching items", error);
        toast.error("Failed to fetch items");
      });
  };

  const fetchItems = () => {
    fetch("http://localhost:3000/home/all-items", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching items", error);
        toast.error("Failed to fetch items");
      });
  };

  const handleCardClick = (shopId) => {
    navigate(`/client/dashboard/view-items/${shopId}`);
  };

  const handleViewMoreClick = () => {
    navigate(`/client/dashboard/shops`);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="mb-12">
      {/*Trending shops*/}
      <div className="flex justify-between mt-10 mb-10 ml-20 mr-20">
        <p className="text-2xl font-bold ">Trending Shops</p>
        <button
          onClick={() => handleViewMoreClick()}
          className="pl-2 pr-2 font-bold text-white bg-blue-600 text-md rounded-xl"
        >
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
              className="border-2 border-black shadow-xl rounded-xl"
              key={shop._id}
            >
              <div className="m-2" onClick={() => handleCardClick(shop._id)}>
                <div>
                  <img className="w-64 h-16" src={shop.shopLogo} alt="" />
                </div>
                <div className="flex justify-center m-4 text-justify">
                  <p>{shop.shopDescription}</p>
                </div>
                <button className="px-8 font-bold text-white bg-blue-600 ml-11 text-md rounded-xl">
                  Visit Store
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/*Discount items*/}
      <div>
        <div className="flex justify-between mt-10 mb-10 ml-20 mr-20">
          <p className="text-2xl font-bold ">Discount items</p>
          <button
            onClick={() => handleViewMoreClick()}
            className="pl-2 pr-2 font-bold text-white bg-blue-600 text-md rounded-xl"
          >
            View more
          </button>
        </div>

        <div>
        <Swiper
        slidesPerView={3}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="mySwiper"
      >
       {items.map((item) => (
            <SwiperSlide
              key={item._id}
            >
              <div>
                <div>
                  <img className="h-60" src={item.image} alt="" />
                </div>
                <div className="justify-center m-4 text-justify ">
                  <p>{item.name}</p>
                </div>
                <button className="px-8 font-bold text-white bg-blue-600 ml-11 text-md rounded-xl">
                  Show details
                </button>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
