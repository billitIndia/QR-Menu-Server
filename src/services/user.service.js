const User = require("../models/user.model");

exports.adminLogin = async (email, password) => {
    const user = await User.findOne({ email, password});
    return user;
};
