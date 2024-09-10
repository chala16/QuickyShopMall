import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "./Banner.css";
import item1 from "../../images/item1.jpg";
import item2 from "../../images/item2.jpg";
import item3 from "../../images/item3.jpg";
import item4 from "../../images/item4.jpg";
import item5 from "../../images/item5.jpg";
import item6 from "../../images/item6.jpg";

const HomeDescription = () => {
  return (
    <div className="flex p-10 bg-black banner">
      <div className="flex-1 p-6 ml-16 rounded-lg shadow-lg">
        <h1 className="mb-4 font-bold text-purple-600 text-8xl">Why</h1>
        <h1 className="mb-4 text-4xl font-bold text-purple-600">
          You Should Choose{" "}
        </h1>
        <h1 className="mb-16 text-6xl font-bold text-yellow-300">QuickShop</h1>
        <div>
          <p className="mb-4 font-bold leading-relaxed text-justify text-gray-400">
            <p className="text-xl italic text-blue-300">Smart Navigation </p>Use a 2D map on your device for quick, accurate
            store navigation.
          </p>
          <p className="mb-4 font-bold leading-relaxed text-justify text-gray-400">
          <p className="text-xl italic text-blue-300">Wishlist Organization</p>Items are automatically sorted by floor for
            efficient shopping.
          </p>
          <p className="mb-4 font-bold leading-relaxed text-justify text-gray-400">
          <p className="text-xl italic text-blue-300">Floor-Based Efficiency</p>Move easily between floors with items
            grouped by location.
          </p>
          <p className="mb-4 font-bold leading-relaxed text-justify text-gray-400">
          <p className="text-xl italic text-blue-300">Time-Saving Technology</p>Spend less time searching for items.
          </p>
          <p className="mb-4 font-bold leading-relaxed text-justify text-gray-400">
          <p className="text-xl italic text-blue-300">Enhanced Experience</p>Enjoy a effortless, and pleasurable
            shopping experience.
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 mt-40 ">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative">
              <h3 className="absolute mt-8 ml-2 slide-header">Costumes</h3>
              <img src={item1} alt="Item 1" className="w-full h-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <h3 className="absolute mt-2 ml-2 slide-header">Sounds</h3>
              <img src={item2} alt="Item 2" className="w-full h-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <h3 className="absolute mt-4 ml-2 slide-header">Electronics</h3>
              <img src={item3} alt="Item 3" className="w-full h-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <h3 className="absolute mt-2 ml-2 text-white slide-header">
                Laptops
              </h3>
              <img src={item4} alt="Item 4" className="w-full h-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <h3 className="absolute mt-10 ml-4 text-black slide-header">
                Lights
              </h3>
              <img src={item5} alt="Item 5" className="w-full h-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <h3 className="absolute slide-header">Cosmetics</h3>
              <img src={item6} alt="Item 6" className="w-full h-full" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeDescription;
