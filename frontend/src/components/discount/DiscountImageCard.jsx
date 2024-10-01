import React from "react";

const DiscountImageCard = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-xs">
      <a href="#">
        <img className="rounded-t-lg" src={data.image} alt="" />
      </a>
      <div className="p-4">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rs {data.price}
          </h5>
          <h3 style={{ color: "#3b82f6", fontSize: "18px", fontWeight: "500" }}>
            {data.name}
          </h3>
          <h3 style={{ color: "#705227", fontSize: "18px", fontWeight: "500" }}>
            {data.category}
          </h3>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default DiscountImageCard;
