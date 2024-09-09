const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true,
  },
  itemName: {
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
  discountedPrice: {
      type: Number,
      required: true,
  },
  discountAvailable: {
    type: Boolean,
    required: true,
  }
},{timestamps:true});

module.exports=mongoose.model('Discounts',discountSchema)

