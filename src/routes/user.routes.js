const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/admin/login", userController.adminLogin);

module.exports = router;
