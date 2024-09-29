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
const faqRouter = require("./src/routes/faqRoute")

const discountRoutes = require("./src/routes/discountRoutes");
const promotionRoutes = require("./src/routes/promotionRoutes");
const PORT = process.env.PORT || 3000;
const schedule = require("node-schedule");  // Import node-schedule
const Discount = require("./src/models/discountModel"); // Import your Discount model

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

const checkAndDeleteExpiredDiscounts = async () => {
  const currentDate = new Date();  // Get the current date
  console.log("Current Date:", currentDate);
  
  try {
    // Delete all discounts where the endDate is less than the current date
    const result = await Discount.deleteMany({ endDate: { $lt: currentDate } });
    console.log(`${result.deletedCount} expired discounts deleted.`);
  } catch (error) {
    console.error("Error deleting expired discounts:", error);
  }
};

mongoose
  .connect(URL)
  .then(() => {
    console.log("MongoDB Connection Success!");
    app.listen(PORT, () => {
      console.log(`Server is up and running on Port Number: ${PORT}`);

      // Immediately check and delete expired discounts
      checkAndDeleteExpiredDiscounts();

      // Schedule the job to delete expired discounts daily at midnight
      schedule.scheduleJob("0 0 * * *", async () => {
        console.log("Running scheduled task to delete expired discounts...");
        
        const currentDate = new Date();  // Get the current date
        console.log("Current Date:", currentDate);
        try {
          // Delete all discounts where the endDate is less than the current date
          const result = await Discount.deleteMany({ endDate: { $lt: currentDate } });
          console.log(`${result.deletedCount} expired discounts deleted.`);
        } catch (error) {
          console.error("Error deleting expired discounts:", error);
        }
      });

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
app.use("/api/faq", faqRouter)


