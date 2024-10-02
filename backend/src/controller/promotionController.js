const mongoose = require("mongoose");
const Promotion = require("../models/promotionModel.js");

// Get all promotions
const getPromotions = async (req, res) => {
    try {
      const promotions = await Promotion.find({}).sort({ createdAt: -1 });
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

// Get a single promotion
const getPromotion = async (req, res) => {
  
    const { id } = req.params;  // Corrected to use req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No promotion with that id");
    }
  
    try {
      const promotions = await Promotion.findById(id);  
  
      if (!promotions) {
        return res.status(404).send("No promotion with that id");
      }
      res.status(200).json(promotions);  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getPromotionsByEmail = async (req, res) => {
    const { email } = req.params; // Get email from query parameters
    if (!email) {
      return res.status(400).send("Email query parameter is required");
    }
  
    try {
      // Find promotion by email
      const promotions = await Promotion.find({ email: email });
  
      if (!promotions || promotions.length === 0) {
        return res.status(404).send("No promotions found for this email");
      }
  
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Create a promotion
const createPromotion = async (req, res) => {
  const { email, title, description, image } = req.body;

  try {
    // const existingPromotion = await Promotion.findOne({ email });
    // if (existingPromotion) {
    //   return res.status(400).json({ message: "Promotion already exists for this item." });
    // }

    const promotions = await Promotion.create({
      email,
      title,
      description,
      image // Assuming this is Base64 data
    });

    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  // Delete a promotion
  const deletePromotion = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No discount with that id");
    }
  
    try {
      const promotion = await Promotion.findByIdAndDelete(id);  
  
      if (!promotion) {
        return res.status(404).send("No promotion with that id");
      }
  
      res.status(200).json({ message: "Promotion deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update a promotion
  const updatePromotion = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No promotion with that id");
    }
  
    try {
      const promotion = await Promotion.findByIdAndUpdate(
        id,  // Corrected to use id directly
        {
          ...req.body,
        },
        { new: true }  // This option returns the updated document
      );
  
      if (!promotion) {
        return res.status(404).send("No promotion with that id");
      }
  
      res.status(200).json(promotion);  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getPromotions,
    getPromotion,
    createPromotion,
    deletePromotion,
    updatePromotion,
    getPromotionsByEmail
};