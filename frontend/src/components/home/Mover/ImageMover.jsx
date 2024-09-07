// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ImageMover = () => {
//   const [promotions, setPromotions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPromotions = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await axios.get('http://localhost:3000/api/promotion/promotion-list/all-promotions');
//         console.log('API Response:', response);  // Log the whole response

//         if (Array.isArray(response.data)) {
//           setPromotions(response.data);
//         } else {
//           throw new Error('Unexpected response format');
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching promotions:', error.response ? error.response.data : error.message);
//         setError('Error fetching promotions');
//         setLoading(false);
//       }
//     };

//     fetchPromotions();
//   }, []);

//   const settings = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 800,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     cssEase: 'ease-in-out',
//     pauseOnHover: false,
//     pauseOnFocus: true,
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div
//       className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
//     >
//       {/* Slider background pattern */}
//       <div
//         className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 z-[-9]"
//       ></div>
//       {/* Slider section */}
//       <div className="container pb-8 sm:pb-0 relative z-10">
//         <Slider {...settings}>
//           {promotions.map((promotion) => (
//             <div key={promotion._id}>
//               <div className="grid grid-cols-1 sm:grid-cols-2">
//                 {/* text content section */}
//                 <div className="relative z-10 flex flex-col justify-center gap-4 pt-12 text-center sm:pt-0 sm:text-left sm:order-1">
//                   <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
//                     {promotion.title}
//                   </h1>
//                   <p className="text-sm">
//                     {promotion.description}
//                   </p>
//                   <div>
//                     <button
//                       className="bg-gradient-to-r
//                               from-image-slider to-image-slider-secondary hover:scale-105
//                               duration-200 text-white py-2 px-4 rounded-full"
//                     >
//                       Order Now
//                     </button>
//                   </div>
//                 </div>
//                 {/* Image section */}
//                 <div className="order-1 sm:order-2">
//                   <div className="relative z-10">
//                     <img
//                       src={promotion.image}  
//                       alt={promotion.title}
//                       className="w-[400px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default ImageMover;
