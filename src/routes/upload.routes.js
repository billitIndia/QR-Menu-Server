const express = require("express");
const uploadController = require("../controllers/upload.controller");
const router = express.Router();

router.post("/image", uploadController.uploadImage);

module.exports = router;
