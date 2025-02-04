const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;