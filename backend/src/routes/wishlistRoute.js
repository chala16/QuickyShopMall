const express = require('express')
const requireAuth = require("../middleware/requireAuth")

// Import the controllers
const { addItemsToWishlist, getItemsFromWishlist } = require('../controller/wishlistController')

const router = express.Router()

// POST request
router.post('/add', requireAuth, addItemsToWishlist)

// GET request
router.get('/read', requireAuth, getItemsFromWishlist)

module.exports = router