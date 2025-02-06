const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    restaurant_type: {
      type: [String],
      enum: ["Chinese", "Arabic", "Indian", "North Indian", "South Indian", "Italian", "Mexican", "Thai", "Japanese", "French", "Mediterranean", "Korean", "Vietnamese", "Greek", "Turkish"],
    },
    phone_number: { type: String, default: null },
    wifi_name: { type: String, default: null },
    wifi_password: { type: String, default: null },
    instagram_handle: { type: String, default: null },
    instagram_url: { type: String, default: null },
    password: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    gst_percentage: {
      type: Number,
      default: 0,
    },
    subscription: {
      isSubscribed: {
        type: Boolean,
        default: false,
      },
      plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true,
    },
      planAmount: {
        type: Number,
        required: false,
      },
      paytmPaymentId: {
        type: String,
        required: false,
      },
      startDate: {
        type: Date,
        required: false,
      },
      endDate: {
        type: Date,
        required: false,
      },
      nextBillingDate: {
        type: Date,
        required: false,
      },
      status: {
        type: String,
        enum: ["active", "inactive", "canceled", "expired"],
        default: "inactive",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
