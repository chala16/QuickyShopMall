const express = require('express');

// Import the controllers
const {
  getPromotions,
  getPromotion,
  createPromotion,
  deletePromotion,
  updatePromotion,
  getPromotionsByEmail
} = require('../controller/promotionController');

const router = express.Router();

// GET all promotions
router.get('/all-promotions', getPromotions);

// GET a single promotion
router.get('/get-promotion/:id', getPromotion);

// GET discounts by email
router.get('/:email', getPromotionsByEmail);

// POST a new promotion
router.post('/', createPromotion);

// DELETE a promotion
router.delete('/:id', deletePromotion);

// Update a promotion
router.patch('/:id', updatePromotion);

module.exports = router;
