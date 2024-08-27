const express = require('express');

// Import the controllers
const {
  getDiscounts,
  getDiscount,
  createDiscount,
  deleteDiscount,
  updateDiscount,
} = require('../controller/discountController');

const router = express.Router();


// GET all discounts
router.get('/', getDiscounts);

// GET a single discount
router.get('/:id', getDiscount);

// POST a new discount
router.post('/',createDiscount);

// DELETE a new blog
router.delete('/:id', deleteDiscount);

// UPDATE a discount
router.patch('/:id', updateDiscount);

module.exports = router;
