const User = require("../models/User");
const Wishlist = require("../models/Wishlist");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    const userType = user.userType;

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const user = await User.signup(email, password, userType);

    const token = createToken(user._id);

    // Create a Wishlist document associated with the user
    await Wishlist.create({ userId: user._id, items: [] });

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchOwners = async (req, res) => {
  try {
    const users = await User.find({userType:"shopOwner"});
    res.send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
  
};

module.exports = { signupUser, loginUser, searchOwners };
