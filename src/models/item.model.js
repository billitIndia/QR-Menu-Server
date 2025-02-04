const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    serviceSize: {
      type: String,
      default: "1",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    isVeg: {
      type: Boolean,
      default: false,
      required: true,
    },
    availableTiming: {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
    },
    isRestaurantSpecial: {
      type: Boolean,
      default: false,
    },
    discountPrice: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
