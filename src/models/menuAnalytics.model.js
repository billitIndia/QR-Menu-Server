// src/models/menuAnalytics.model.js
const mongoose = require('mongoose');

const menuAnalyticsSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  deviceType: {
    type: String,
    default: 'unknown'
  },
  browserInfo: {
    type: String,
    default: 'unknown'
  },
  viewedAt: {
    type: Date,
    default: Date.now
  }
});

const MenuAnalytics = mongoose.model('MenuAnalytics', menuAnalyticsSchema);

module.exports = MenuAnalytics;