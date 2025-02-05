const itemService = require("../services/item.service");

// Fetch items for customers (filtered by restaurant, timing, availability, and active status)
exports.getItemsForCustomers = async (req, res) => {
  const { restaurantId } = req.params;
  const { page = 1, limit = 10 } = req.query; // Pagination: default to page 1, limit 10

  try {
    // Get the items from the service
    const items = await itemService.getItemsForCustomers(
      restaurantId,
      page,
      limit
    );
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getItemsForOwner = async (req, res) => {
  const restaurantId = req.user.id;
  const { page = 1, limit = 10 } = req.query; // Pagination: default to page 1, limit 10

  try {
    // Get the items from the service
    const items = await itemService.getItemsForOwner(restaurantId, page, limit);
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const newItem = await itemService.createItem({
      ...req.body,
      restaurantId: req.user.id,
    });
    return res
      .status(201)
      .json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Edit an existing item
exports.editItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const updatedItem = await itemService.editItem(itemId, req.body);
    return res
      .status(200)
      .json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete an item (mark as inactive)
exports.deleteItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const deletedItem = await itemService.deleteItem(itemId);
    return res
      .status(200)
      .json({ message: "Item marked as inactive", item: deletedItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Toggle availability of an item
exports.toggleAvailability = async (req, res) => {
  const { itemId } = req.params;
  const { isAvailable } = req.body; // should be true/false
  try {
    const updatedItem = await itemService.toggleAvailability(
      itemId,
      isAvailable
    );
    return res
      .status(200)
      .json({ message: "Item availability updated", item: updatedItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
