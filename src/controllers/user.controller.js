const userService = require("../services/user.service");

exports.adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.adminLogin(email, password);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
};  