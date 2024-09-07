const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const userRouter = require("./src/routes/user");
const requireAuth = require("./src/middleware/requireAuth");
const inventoryRouter = require("./src/routes/inventoryRoute");
const wishlistRouter = require("./src/routes/wishlistRoute");
const homeRouter = require("./src/routes/homeRoute");
const ReviewRouter = require("./src/routes/review");

const discountRoutes = require("./src/routes/discountRoutes");
const promotionRoutes = require("./src/routes/promotionRoutes");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use("/icons", express.static("./Icon-svgs"));

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("MongoDB Connection Success!");
    app.listen(PORT, () => {
      console.log(`Server is up and running on Port Number: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/inventory", requireAuth, inventoryRouter);
app.use("/home", homeRouter);
app.use("/user", userRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/discounts", requireAuth, discountRoutes);
app.use("/api/discount-items", discountRoutes);
app.use("/api/promotions", requireAuth, promotionRoutes);
app.use("/api/promotion/promotion-list", promotionRoutes);
app.use("/api/reviews", ReviewRouter);


