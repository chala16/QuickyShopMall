const FAQ = require("../models/FAQ");

// Create a new FAQ
const createFAQ = async (req, res) => {
  try {
    const { shopId, question, answer } = req.body;
    const faq = new FAQ({ shopId, question, answer });
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Error creating FAQ", error });
  }
};

// Get all FAQs for a specific shop
const getFAQsByShop = async (req, res) => {
  try {
    const faqs = await FAQ.find({ shopId: req.params.shopId });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs", error });
  }
};

// Update an FAQ
const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Error updating FAQ", error });
  }
};

// Delete an FAQ
const deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ", error });
  }
};

module.exports = { createFAQ, getFAQsByShop, updateFAQ, deleteFAQ };
