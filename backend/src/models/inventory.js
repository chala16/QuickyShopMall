const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required:true
  },
  user_id: {
    type: String,
    required: [true, "User ID is required"],
  },
},{timestamps:true});

const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;
