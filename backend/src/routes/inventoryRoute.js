const router = require("express").Router();
let Inventory = require("../models/inventory");
const requireAuth = require("../middleware/requireAuth")

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