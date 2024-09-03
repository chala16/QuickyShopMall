const express = require("express");

const { signupUser, loginUser ,searchOwners} = require("../controller/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/shopOwners", searchOwners);

module.exports = router;
