const express = require("express");
const authRoutes = require("./auth.routes");
const restaurantRoutes = require("./restaurant.routes");
const categoryRoutes = require("./category.routes");
const itemRoutes = require("./item.routes");
const uploadRoutes = require("./upload.routes");
const analyticsRoutes = require('./analytics.routes');
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/restaurant", restaurantRoutes);        
router.use("/categories", categoryRoutes);
router.use("/items", itemRoutes);
router.use("/upload", uploadRoutes);
router.use('/api/analytics', analyticsRoutes);
module.exports = router;
