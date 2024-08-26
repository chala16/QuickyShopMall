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
        ref: "inventory",
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  }]
})

module.exports = mongoose.model('Wishlist', wishlistSchema)