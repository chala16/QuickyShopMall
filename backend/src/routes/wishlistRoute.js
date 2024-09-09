const express = require('express')
const requireAuth = require("../middleware/requireAuth")

// Import the controllers
const { addItemsToWishlist, getItemsFromWishlist, deleteItemsFromWishlist } = require('../controller/wishlistController')

const router = express.Router()

// POST request
router.post('/add', requireAuth, addItemsToWishlist)

// GET request
router.get('/read', requireAuth, getItemsFromWishlist)

// DELETE request
router.delete('/delete-item/:itemId', requireAuth, deleteItemsFromWishlist)

module.exports = router