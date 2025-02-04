const restaurantService = require("../services/restaurant.service");

exports.getRestaurant = async (req, res, next) => {
  try {
    const restaurantId = req.user.id;
    const restaurant = await restaurantService.getRestaurant(restaurantId);
    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    next(error);
  }
};

exports.getRestaurantByUserId = async (req, res, next) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await restaurantService.getRestaurant(restaurantId);
    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    next(error);
  }
};

exports.updateRestaurant = async (req, res, next) => {
  try {
    const restaurantId = req.user.id;
    const updateData = {
      name: req.body.name,
      logo: req.body.logo,
      coverImage: req.body.coverImage,
      phone_number: req.body.phone_number,
      wifi_name: req.body.wifi_name,
      wifi_password: req.body.wifi_password,
      instagram_handle: req.body.instagram_handle,
      instagram_url: req.body.instagram_url,
    };

    const updatedRestaurant = await restaurantService.updateRestaurantDetails(
      restaurantId,
      updateData
    );

    res.status(200).json({
      success: true,
      data: {
        restaurant: updatedRestaurant,
      },
    });
  } catch (error) {
    next(error);
  }
};
