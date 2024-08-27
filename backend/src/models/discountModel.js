const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  discountPercentage: {
      type: Number,
      required: true,
  },
},{timestamps:true});

module.exports=mongoose.model('Discounts',discountSchema)

