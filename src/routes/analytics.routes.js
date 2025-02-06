// routes/analytics.routes.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const auth = require('../middleware/auth'); // Your auth middleware for restaurant owners

// Get analytics data (protected route for restaurant owners)
router.get('/restaurant/:restaurantId', auth, analyticsController.getAnalytics);

module.exports = router;