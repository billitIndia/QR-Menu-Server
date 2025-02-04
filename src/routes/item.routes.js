const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const itemController = require("../controllers/item.controller");

// Routes for Customers
router.get("/user/:restaurantId", itemController.getItemsForCustomers); // Fetch items for a specific restaurant for customers

// Routes for Restaurant Owners
router.use(auth);
router.get("/owner", itemController.getItemsForOwner);
router.post("/", itemController.createItem); // Create new item
router.put("/:itemId", itemController.editItem); // Edit an existing item
router.delete("/:itemId", itemController.deleteItem); // Delete an item (mark as inactive)
router.patch("/:itemId/availability", itemController.toggleAvailability); // Toggle item availability

module.exports = router;
