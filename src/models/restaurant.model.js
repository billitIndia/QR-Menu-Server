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
    subscription: {
      isSubscribed: {
        type: Boolean,
        default: false,
      },
      planType: {
        type: String,
        enum: ["1-month", "6-month", "12-month"],
        required: false,
      },
      planAmount: {
        type: Number,
        required: false,
      },
      razorpayCustomerId: {
        type: String,
        required: false,
      },
      razorpaySubscriptionId: {
        type: String,
        required: false,
      },
      razorpayPaymentId: {
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
