const Item = require("../models/item.model");
const moment = require("moment-timezone");

// Fetch items for customers, filtered by restaurant, timing, availability, and active status, with pagination
exports.getItemsForCustomers = async (restaurantId, page = 1, limit = 1000) => {
  const currentTime = moment().tz("Asia/Kolkata").format("HH:mm");

  const itemsQuery = {
    restaurantId,
    // availableTiming: {
    //   $gte: currentTime,
    //   $lte: currentTime,
    // },
    isAvailable: true,
    isActive: true,
  };

  // Pagination setup
  const skip = (page - 1) * limit;
  const items = await Item.find(itemsQuery)
    .sort({ isRestaurantSpecial: -1 }) // Restaurant special items first
    .skip(skip)
    .limit(Number(limit));

  const totalItems = await Item.countDocuments(itemsQuery); // Total number of items for pagination

  return {
    items,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    },
  };
};

exports.getItemsForOwner = async (restaurantId, page = 1, limit = 1000) => {
  const itemsQuery = {
    restaurantId,
    isActive: true,
  };

  // Pagination setup
  const skip = (page - 1) * limit;
  const items = await Item.find(itemsQuery)
    .populate("categoryId")
    .sort({ isRestaurantSpecial: -1 }) // Restaurant special items first
    .skip(skip)
    .limit(Number(limit));

  const totalItems = await Item.countDocuments(itemsQuery); // Total number of items for pagination

  return {
    items,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    },
  };
};

// Create a new item
exports.createItem = async (itemData) => {
  const newItem = new Item(itemData);
  return await newItem.save();
};

// Edit an existing item
exports.editItem = async (itemId, itemData) => {
  return await Item.findByIdAndUpdate(itemId, itemData, { new: true });
};

// Delete an item (mark as inactive)
exports.deleteItem = async (itemId) => {
  return await Item.findByIdAndUpdate(
    itemId,
    { isActive: false },
    { new: true }
  );
};

// Toggle availability of an item
exports.toggleAvailability = async (itemId, isAvailable) => {
  return await Item.findByIdAndUpdate(itemId, { isAvailable }, { new: true });
};
