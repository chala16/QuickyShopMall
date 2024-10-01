const mongoose = require("mongoose");
const Discount = require("../models/discountModel.js");

// Get all discounts
const getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find({}).sort({ createdAt: -1 });
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get discounts by email
const getDiscountsByEmail = async (req, res) => {
  const { email } = req.params; // Get email from query parameters
  if (!email) {
    return res.status(400).send("Email query parameter is required");
  }

  try {
    // Find discounts by email
    const discounts = await Discount.find({ email: email });

    if (!discounts || discounts.length === 0) {
      return res.status(404).send("No discounts found for this email");
    }

    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single discount
const getDiscount = async (req, res) => {
  
  const { id } = req.params;  // use req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No discount with that id");
  }

  try {
    const discount = await Discount.findById(id);  // use Discount model

    if (!discount) {
      return res.status(404).send("No discount with that id");
    }
    res.status(200).json(discount);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a discount
const createDiscount = async (req, res) => {
  const { email, itemId, itemName, startDate, endDate, discountPercentage, discountedPrice, discountAvailable } = req.body;

  try {

    const existingDiscount = await Discount.findOne({ email, itemId });
    if (existingDiscount) {
      return res.status(400).json({ message: "Discount already exists for this item." });
    }

    const discount = await Discount.create({
      email,
      itemId,
      itemName,
      startDate,
      endDate,
      discountPercentage,
      discountedPrice,
      discountAvailable
    });
    res.status(200).json(discount);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a discount
const deleteDiscount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No discount with that id");
  }

  try {
    const discount = await Discount.findByIdAndDelete(id);  

    if (!discount) {
      return res.status(404).send("No discount with that id");
    }

    res.status(200).json({ message: "Discount deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a discount
const updateDiscount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No discount with that id");
  }

  try {
    const discount = await Discount.findByIdAndUpdate(
      id,  // use id directly
      {
        ...req.body,
      },
      { new: true }  // This option returns the updated document
    );

    if (!discount) {
      return res.status(404).send("No discount with that id");
    }

    res.status(200).json(discount);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getDiscounts,
  getDiscount,
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getDiscountsByEmail
};
