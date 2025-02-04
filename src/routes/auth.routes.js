const express = require("express");
const authController = require("../controllers/auth.controller.js");
const router = express.Router();

router.post("/google", authController.googleAuth);

module.exports = router;
