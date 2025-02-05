const jwt = require("jsonwebtoken");
const config = require("../config/environment");
const Restaurant = require("../models/restaurant.model"); // Assuming the schema is in models/restaurant.js

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;

    // Fetch the restaurant from the database

    const restaurant = await Restaurant.findById(req.user.id);

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Check if the restaurant is active
    if (!restaurant.isActive) {
      return res
        .status(403)
        .json({ message: "Account is inactive. Please contact support." });
    }

    // Check subscription status
    // if (
    //   !restaurant.subscription.isSubscribed ||
    //   restaurant.subscription.status !== "active"
    // ) {
    //   return res.status(403).json({
    //     message:
    //       "Subscription is inactive or expired. Please renew your subscription.",
    //   });
    // }

    // All checks passed
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};
