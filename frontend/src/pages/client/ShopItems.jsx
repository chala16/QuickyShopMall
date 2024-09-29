import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../components/home/Navbar/Navbar";
import eyeImg from "../../images/eye.svg";
import AddWishlistButton from "../../components/wishlist/AddWishlistButton";

const ShopItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [discountItems, setDiscountItems] = useState([]);
  const { id } = useParams();

  const fetchItems = async () => {
    try {
      const [itemsResponse, discountsResponse] = await Promise.all([
        fetch(`http://localhost:3000/home/owner-items/${id}`).then((res) => {
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

      setDiscountItems(itemsWithDiscounts);

      const itemsWithoutDiscounts = validItems
        .filter((item) => {
          const discount = validDiscounts.find(
            (discount) =>
              discount.itemId === item._id &&
              discount.discountAvailable === true
          );
          return !discount;
        })
        .map((item) => ({
          ...item,
          discountAmount: item.price,
          discountPercentage: 0,
        }));

      setItems(itemsWithoutDiscounts);

      console.log("Items", validItems);
      console.log("Discounts", validDiscounts);
      console.log("Items with discounts", itemsWithDiscounts);
    } catch (error) {
      console.error("Error fetching items or discounts", error);
      toast.error("Failed to fetch items or discounts");
    }
  };

  const handleCardClick = (itemId, discountItems) => {
    const selectedItem = [...discountItems, ...items].find(item => item._id === itemId);
    navigate(`/client/dashboard/view-item/${itemId}`, { state: selectedItem });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Items</h1>
        <div className="grid grid-cols-5 gap-6 lg:grid-cols-4">
          {[...discountItems, ...items].length > 0 ? (
            [...discountItems, ...items].map((item) => (
              <div key={item._id} className="card min-w-[300px] flex flex-col">
                <img
                  className="object-contain pt-8 m-4 h-52 w-80"
                  src={item.image}
                  alt={item.name}
                />
                <div className="flex flex-col justify-between flex-grow p-5">
                  <div>
                    <div className="flex items-center mb-4">
                      <span className="badge">{item.category}</span>
                    </div>

                    <h2 className="product-title" title={item.name}>
                      {item.name}
                    </h2>

                    <div>
                      <span className="text-xl font-bold">
                        Rs.{" "}
                        {item.discountAmount ? item.discountAmount : item.price}
                      </span>
                      {item.discountPercentage > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm line-through opacity-50">
                            Rs. {item.price}
                          </span>
                          <span className="discount-percent">
                            Save {item.discountPercentage}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-5">
                    <AddWishlistButton itemId={item._id} />
                    <button
                      className="mx-4 button-icon"
                      onClick={() => handleCardClick(item._id,discountItems)}
                    >
                      <img className="opacity-50" src={eyeImg} alt="View" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No items available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopItems;
