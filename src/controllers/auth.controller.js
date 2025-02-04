const restaurantService = require("../services/restaurant.service");
const config = require("../config/environment");
const jwt = require("jsonwebtoken");

exports.googleAuth = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    // const userInfo = await restaurantService.verifyGoogleIdToken(idToken);
    const restaurant = await restaurantService.findOrCreateRestaurant({
      email: "2004aadith@gmail.com",
      name: "aadith",
      picture: "image",
    });

    const token = jwt.sign(
      {
        id: restaurant._id,
        email: restaurant.email,
      },
      config.JWT_SECRET,
      { expiresIn: "9999 years" }
    );

    res.status(200).json({
      success: true,
      token,
      restaurant: {
        id: restaurant._id,
        name: restaurant.name,
        email: restaurant.email,
        logo: restaurant?.logo,
      },
    });
  } catch (error) {
    next(error);
  }
};
