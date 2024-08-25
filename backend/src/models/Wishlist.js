const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  items: [{
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventories",
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
  }]
})

module.exports = mongoose.model('Wishlist', wishlistSchema)