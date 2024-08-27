const express = require('express')

// Import the controllers
const { searchOwners,allItems,getItemsByOwnerId,getItemByItemId  } = require('../controller/homeController')

const router = express.Router()

router.get('/all-owners', searchOwners)
router.get('/all-items', allItems)
router.get('/owner-items/:id', getItemsByOwnerId)
router.get('/get-item/:id', getItemByItemId)

module.exports = router