const router = require("express").Router();
let Inventory = require("../models/inventory");
const requireAuth = require("../middleware/requireAuth")
const Review = require("./../models/Review");
const FAQ = require("../models/FAQ");


router.route("/add-item").post(requireAuth,async (req, res) => {
    try {
      if (
        !req.body.name ||
        !req.body.category ||
        !req.body.description ||
        !req.body.price ||
        !req.body.quantity||
        !req.body.image
      ) {
        return res.status(400).send({
          message:
            "Send all required fields",
        });
      }
      const newItem = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        inStock: req.body.inStock,
        discount: req.body.discount,
        image:req.body.image,
        user_id:req.user._id
      };
      
      const item = await Inventory.create(newItem);
  
      return res.status(201).send(item);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
  router.route("/all-items").get(async (req, res) => {
    try {
      const items = await Inventory.find({});
      res.send(items);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
    
  });


  router.route("/search-items").get(async (req, res) => {
    const { query } = req.query; 
  
    try {
      const user_id = req.user._id; 
      
      const items = await Inventory.find({
        $and: [
          { user_id: user_id },
          {
            $or: [
              { name: { $regex: query, $options: "i" } },
              { category: { $regex: query, $options: "i" } }
            ]
          }
        ]
      });
  
      res.status(200).json(items);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });

  router.route("/owner-items").get(async (req, res) => {
    try {
      const user_id = req.user._id;
      const items = await Inventory.find({ user_id: user_id });
      res.send(items);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });

//get reviews by shopOwner
  router.route("/shop-reviews").get(async (req, res) => {
    try {
      const shopId = req.user._id; 
      const items = await Inventory.find({ user_id: shopId });
      const reviews = await Review.find({ shopId: shopId }).populate("productId");
  

      
    const itemReviews = items.map(item => {
      // Filter reviews for the current item
      const itemSpecificReviews = reviews.filter(review => review.productId._id.equals(item._id));
      
      // Format the reviews for the current item
      return {
        item: {
          id: item._id,
          name: item.name,
          category:item.category
        },
        reviews: itemSpecificReviews.map(review => ({
          email: review.email,
          date: review.date,
          rating: review.rating,
          text: review.text
        }))
      };
    });
    res.send(itemReviews);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
  


// Get all FAQs for the logged-in shop owner
router.route("/get-faqs").get(requireAuth, async (req, res) => {
  try {
    // Get the shopId from the logged-in user (shop owner)
    const shopId = req.user._id;

    // Find FAQs by the shopId
    const faqs = await FAQ.find({ shopId });

    // If no FAQs are found, return a 404 status
    if (!faqs || faqs.length === 0) {
      return res.status(404).json({
        message: "No FAQs found for this shop.",
      });
    }

    // Send the FAQs if found
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching FAQs",
      error: error.message,
    });
  }
});


  // Create a new FAQ
router.route("/create-faq").post(requireAuth, async (req, res) => {
  try {
    // Get the shopId from the logged-in user (shop owner)
    const shopId = req.user._id;
    const { question, answer } = req.body;

    // Check for required fields
    if (!question || !answer) {
      return res.status(400).json({
        message: "Please provide all required fields: question and answer.",
      });
    }


    // Create a new FAQ entry
    const faq = new FAQ({ shopId, question, answer });

    // Save the FAQ entry to the database
    await faq.save();

    // Return a success response
    return res.status(201).json(faq);
  } catch (error) {
    console.error("Error creating FAQ:", error.message);

    // Return a failure response
    return res.status(500).json({
      message: "Error creating FAQ",
      error: error.message,
    });
  }
});


  router.route("/items/:id").get(async (req, res) => {
    try {
      const user_id = req.params.id;
      const items = await Inventory.find({ user_id: user_id });
      res.send(items);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });

  
  router.route("/update-item/:id").patch(async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Update the inStock to false if the item quantity is zero
      if (updateData.quantity !== undefined) {
        if (updateData.quantity == 0) {
          updateData.inStock = false;
        } else {
          updateData.inStock = true;
        }
      }
  
      const result = await Inventory.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!result) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  
  router.route("/delete-item/:id").delete(async (req, res) => {
    try {
      const { id } = req.params;
  
      await Inventory.findByIdAndDelete(id)
        .then(() => {
          return res
            .setMaxListeners(200)
            .send({ message: "Item successfully deleted" });
        })
        .catch(() => {
          return res.status(404).json({ message: "Item not found" });
        });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  router.route("/get-item/:id").get(async (req, res) => {
    try {
      const { id } = req.params;
  
      await Inventory.findById(id)
        .then((item) => {
          return res.status(200).json(item);
        })
        .catch(() => {
          return res.status(404).json({ message: "Item not found" });
        });
    } catch (err) {
      console.timeLog(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
  
  module.exports = router;