const express = require('express');

// Import the controllers
const {
  getDiscounts,
  getDiscount,
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getDiscountsByEmail
} = require('../controller/discountController');

const router = express.Router();


// GET all discounts
router.get('/all-discounts', getDiscounts);
// GET discounts by email
router.get('/:email', getDiscountsByEmail);
// GET a single discount
router.get('/get-discount/:id', getDiscount);

// POST a new discount
router.post('/',createDiscount);

// DELETE a new blog
router.delete('/:id', deleteDiscount);

// UPDATE a discount
router.patch('/:id', updateDiscount);

module.exports = router;
