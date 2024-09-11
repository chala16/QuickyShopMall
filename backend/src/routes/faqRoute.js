const express = require("express");
const {
  createFAQ,
  getFAQsByShop,
  updateFAQ,
  deleteFAQ,
} = require("../controller/faqController");

const router = express.Router();

router.post("/faqs", createFAQ);
router.get("/faqs/:shopId", getFAQsByShop);
router.put("/faqs/:id", updateFAQ);
router.delete("/faqs/:id", deleteFAQ);

module.exports = router;
