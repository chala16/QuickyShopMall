const express = require('express');
const Review = require('../models/Review');
const User = require('../models/User');

const router = express.Router();

// Submit a review
router.post('/submit', async (req, res) => {
  try {
    const review = new Review({
      productId: req.body.productId,
      shopId: req.body.shopId,  
      email: req.body.email,
      rating: req.body.rating,
      text: req.body.text
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get reviews for a product
router.get('/shop/:shopId/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId,  shopId: req.params.shopId  });
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Update a review
router.put('/update/:reviewId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (review.email === req.body.email) {
      review.rating = req.body.rating;
      review.text = req.body.text;
      await review.save();
      res.json(review);
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a review
router.delete('/delete/:reviewId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (review.email === req.body.email) {
      await review.deleteOne();
      res.json({ message: 'Review deleted' });
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark review as helpful or not helpful
router.post('/helpful/:reviewId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (req.body.helpful) {
      review.helpfulCount += 1;
    } else {
      review.notHelpfulCount += 1;
    }
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
