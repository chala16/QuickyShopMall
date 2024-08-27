const Wishlist = require("../models/Wishlist");
const Item = require("../models/inventory");

const addItemsToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { userId },
      {
        $push: {
          items: {
            itemId: item._id,
            shopId: item.user_id,
          },
        },
      },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ message: "Item added to wishlist", updatedWishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemsFromWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ userId })
      .populate({
        path: "items.itemId",
        select: "name price inStock image",
      })
      .populate({
        path: "items.shopId",
        select: "shopName shopFloorNo",
      });

    if (!wishlist || wishlist.items.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no items in your wishlist." });
    }

    const items = wishlist.items
      .map((item) => ({
        name: item.itemId.name,
        price: item.itemId.price,
        inStock: item.itemId.inStock,
        image: item.itemId.image,
        shopName: item.shopId.shopName,
        shopFloorNo: item.shopId.shopFloorNo,
      }))
      .sort((a, b) => a.shopFloorNo - b.shopFloorNo);

    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addItemsToWishlist,
  getItemsFromWishlist,
};
