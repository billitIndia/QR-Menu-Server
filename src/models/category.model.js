const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to auto-increment sortOrder
categorySchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const lastCategory = await this.constructor.findOne(
        { restaurantId: this.restaurantId },
        { sortOrder: 1 },
        { sort: { sortOrder: -1 } }
      );

      this.sortOrder = lastCategory ? lastCategory.sortOrder + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
