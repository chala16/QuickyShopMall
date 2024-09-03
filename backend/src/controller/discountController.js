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

// Get a single discount
const getDiscount = async (req, res) => {
  const { id } = req.params;  // Corrected to use req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No discount with that id");
  }

  try {
    const discount = await Discount.findById(id);  // Corrected to use Discount model

    if (!discount) {
      return res.status(404).send("No discount with that id");
    }
    res.status(200).json(discount);  // Corrected to use discount
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a discount
const createDiscount = async (req, res) => {
  const { email, itemId, startDate, endDate, discountPercentage } = req.body;

  try {
    const discount = await Discount.create({
      email,
      itemId,
      startDate,
      endDate,
      discountPercentage,
    });
    res.status(200).json(discount);  // Corrected to use discount
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
    const discount = await Discount.findByIdAndDelete(id);  // Corrected to use Discount model

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
      id,  // Corrected to use id directly
      {
        ...req.body,
      },
      { new: true }  // This option returns the updated document
    );

    if (!discount) {
      return res.status(404).send("No discount with that id");
    }

    res.status(200).json(discount);  // Corrected to use discount
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Correct the export statement
module.exports = {
  getDiscounts,
  getDiscount,
  createDiscount,
  deleteDiscount,
  updateDiscount,
};
