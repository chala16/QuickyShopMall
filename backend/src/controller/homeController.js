const User = require("../models/User");
let Inventory = require("../models/inventory");

const searchOwners = async (req, res) => {
  try {
    const users = await User.find({ userType: "shopOwner" });
    res.send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

const allItems = async (req, res) => {
  try {
    const items = await Inventory.find({});
    res.send(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

const getItemsByOwnerId = async (req, res) => {
  try {
    const user_id = req.params.id;
    const items = await Inventory.find({ user_id: user_id });
    res.send(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

const getItemByItemId = async (req, res) => {
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
};

module.exports = {
  searchOwners,
  allItems,
  getItemsByOwnerId,
  getItemByItemId,
};
