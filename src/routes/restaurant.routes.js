const express = require("express");
const restaurantController = require("../controllers/restaurant.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("", auth, restaurantController.getRestaurant);
router.get("/user/:restaurantId", restaurantController.getRestaurantByUserId);
router.patch("/", auth, restaurantController.updateRestaurant);

module.exports = router;
