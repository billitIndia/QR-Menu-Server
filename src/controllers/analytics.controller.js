// src/controllers/analytics.controller.js
const MenuAnalytics = require('../models/menuAnalytics.model');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

const logMenuView = async (restaurantId, deviceInfo) => {
  try {
    const menuView = await MenuAnalytics.create({
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
      deviceType: deviceInfo?.type || 'unknown',
      browserInfo: deviceInfo?.browser || 'unknown',
      viewedAt: new Date()
    });

    logger.info(`Logged menu view for restaurant: ${restaurantId}`);
    return menuView;
  } catch (error) {
    logger.error(`Error logging menu view: ${error.message}`);
    throw error;
  }
};

const getAnalytics = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { startDate, endDate } = req.query;

    const analytics = await MenuAnalytics.aggregate([
      {
        $match: {
          restaurantId: new mongoose.Types.ObjectId(restaurantId),
          viewedAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$viewedAt" } },
            deviceType: "$deviceType"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.date": 1 }
      }
    ]);

    res.json(analytics);
  } catch (error) {
    logger.error(`Error fetching analytics: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  logMenuView,
  getAnalytics
};