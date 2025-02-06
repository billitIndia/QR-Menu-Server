const axios = require("axios");
const AppError = require("../utils/AppError");
const Restaurant = require("../models/restaurant.model");
const { GOOGLE_OAUTH_URL } = require("../config/environment");

exports.verifyGoogleIdToken = async (idToken) => {
  try {
    const response = await axios.get(GOOGLE_OAUTH_URL, {
      params: { id_token: idToken },
    });

    const { email, name, picture } = response.data;

    if (!email || !name) {
      throw new AppError(
        "Invalid token: Missing required user information.",
        401
      );
    }

    return { email, name, picture };
  } catch (error) {
    console.error("Google ID Token validation failed:", error.message);
    throw new Error("Invalid Google ID token.");
  }
};

exports.findOrCreateRestaurant = async (userInfo) => {
  const { email, name, picture } = userInfo;

  let restaurant = await Restaurant.findOne({ email });

  if (!restaurant) {
    restaurant = new Restaurant({
      name,
      email,
      logo: picture,
    });
    await restaurant.save();
  }

  return restaurant;
};

exports.getRestaurant = async (id) => {
  try {
    const restaurant = await Restaurant.findById(id).select("-password");
    if (!restaurant || !restaurant?.isActive)
      throw new AppError("Restaurant not found or not active", 401);
    return restaurant;
  } catch (error) {
    throw error;
  }
};

exports.updateRestaurantDetails = async (restaurantId, updateData) => {
  try {

    console.log(updateData);
    
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      throw new AppError("Restaurant not found", 404);
    }

    return restaurant;
  } catch (error) {
    throw error;
  }
};
