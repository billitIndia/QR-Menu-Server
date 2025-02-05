const Category = require("../models/category.model");

// Create a new category
exports.createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

// Get all active categories for a restaurant
exports.getAllCategories = async (restaurantId) => {
  return await Category.find({ restaurantId, isActive: true }).sort({
    sortOrder: 1,
  });
};

// Get a category by ID
exports.getCategoryById = async (id) => {
  return await Category.findOne({ _id: id, isActive: true });
};

// Update a category
exports.updateCategory = async (id, updateData) => {
  return await Category.findOneAndUpdate(
    { _id: id, isActive: true },
    updateData,
    { new: true }
  );
};

// Soft delete a category
exports.softDeleteCategory = async (id) => {
  return await Category.findOneAndUpdate(
    { _id: id, isActive: true },
    { isActive: false },
    { new: true }
  );
};
