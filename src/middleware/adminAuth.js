const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // Adjust the path based on your project structure
require("dotenv").config();

const adminAuth = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        const user = await User.findById(decoded.id); // Fetch user from DB

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied: Admins only" });
        }

        req.user = user; // Attach user object to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
};

module.exports = adminAuth;
