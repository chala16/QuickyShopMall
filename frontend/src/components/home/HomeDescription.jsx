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
        <h1 className="mb-4 text-4xl font-bold text-purple-600">Why</h1>
        <h1 className="mb-4 text-4xl font-bold text-purple-600">You Should Choose </h1>
        <h1 className="mb-4 text-4xl font-bold text-yellow-300">QuickShop</h1>
        <p className="mb-4 font-bold leading-relaxed text-justify text-gray-400">
          Imagine a shopping mall where your experience is not just about
          finding what you need but doing so effortlessly and quickly.
          Introducing the next-generation shopping experience, where technology
          meets convenience. Our mall is equipped with a cutting-edge 2D shop
          map that allows you to navigate through stores like never before. No
          more wandering aimlessly-just glance at the map on your device to find
          the quickest route to your desired shop.
        </p>
        <p className="mb-4 font-bold leading-relaxed text-justify text-gray-400">
          But that's not all. Our innovative wishlist system goes a step further
          by organizing your shopping items by floor. As you add items to your
          wishlist, they are automatically sorted by their location in the mall,
          allowing you to make your way from floor to floor with ease. Whether
          you're searching for the latest fashion, tech gadgets, or gourmet
          delights, our system ensures you spend less time searching and more
          time enjoying.
        </p>
        <p className="font-bold leading-relaxed text-justify text-gray-400">
          This seamless integration of technology into your shopping experience
          not only saves time but also enhances your overall visit, making
          shopping less of a chore and more of a pleasure. Welcome to a mall
          designed for the modern shopper-efficient, intuitive, and above all,
          enjoyable.
        </p>
      </div>

      <div className="flex-1 p-4 mt-28 ">
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
